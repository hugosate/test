
var regulateX = 510; //画布左上角X坐标
var regulateY = 10;//画布左上角Y坐标

//var canvas_width = 500;//画布宽度
//var canvas_height = 500;//画布高度
var canvas_width2 = 400;
var canvas_height2 =400;

//var wallwidth_nor = 3; // 正常线宽
//var wallwidth_thick = 5; //加粗线宽
//var wallcolor_nor = "black";  //正常线段颜色
//var wallcolor_thick = "green";//加粗线段颜色
//var wallcolor_select = "red";//选择后线段颜色

var state2=0;//鼠标状态，0表示没点击移动状态，1表示点击线段状态

//var sourceWalls = new  Array();
//var source_n =sourceWalls.length; 

//var n = 3;
//var max_n = 10;
//var walls = new Array(max_n);   //点对数组
//	walls[0] = new Array(100,100,200,150);
//	walls[1] = new Array(200,200,200,300);
//	walls[2] = new Array(100,400,200,400);
 
var wall_i=-1;//加粗的线段编号        
var wall_select_i=-1;//点击选择的线段编号   -1表示没有选择线段

var error1=0;//错误检测

//鼠标移动到直线上时该线段加粗
function move_on_wall(e) {
    $('span').html("staus:" + window.status + "  ,state2:" + window.state2);
//    $('span').html("staus:" + window.status + "  ,state2:" + window.state2);
	switch(state2){
	case 0:
	case 1:
	    var c = document.getElementById("deleteWalls");
	    var cxt = c.getContext("2d");
	    for (var i = 0; i < walls.length; i++) {
	        var x1 = walls[i][0];
	        var y1 = walls[i][1];
	        var x2 = walls[i][2];
	        var y2 = walls[i][3];
	        if (on_wall_determination(e.clientX - regulateX, e.clientY - regulateY, x1, y1, x2, y2)) {
	            if (i != wall_i) {

	                draw_all_walls();
	            }
	            wall_i = i;
	            cxt.lineWidth = wallwidth_thick; //加粗
	            cxt.strokeStyle = wallcolor_thick;
	            cxt.beginPath();
	            cxt.moveTo(x1, y1);
	            cxt.lineTo(x2, y2);
	            cxt.closePath();
	            cxt.stroke();

	            //            //联动1
	            //			window.wall_choice = i;
	            //			window.status = 1;
	            //			$('span').html("staus!1");
	            //			c1 = document.getElementById("addWalls");
	            //			var cxt1 = c1.getContext("2d");
	            //			drawMap1(img, cxt1);
	            //			drawWalls(cxt1, walls);
	            //            //end of 联动1

	            if (state2 == 1) {
	                cxt.lineWidth = wallwidth_thick;
	                cxt.strokeStyle = wallcolor_select;
	                cxt.beginPath();
	                cxt.moveTo(walls[wall_select_i][0], walls[wall_select_i][1]);
	                cxt.lineTo(walls[wall_select_i][2], walls[wall_select_i][3]);
	                cxt.closePath();
	                cxt.stroke();

	                //				//联动2
	                //				window.wall_choice = wall_select_i;
	                //				//window.status = 2;
	                //				c1 = document.getElementById("addWalls");
	                //				var cxt1 = c1.getContext("2d");
	                //				drawMap1(img, cxt1);
	                //				drawWalls(cxt1, walls);
	                //				//end of 联动2

	            }
	            //			document.getElementById("text_out").innerHTML=e.clientX+', '+e.clientY;
	            return true;
	        }
	    }
	    wall_i = -1;
	    cxt.clearRect(0, 0, canvas_width, canvas_height);
	    draw_all_walls();

	    //		//联动4
	    //		window.wall_choice = -1;
	    //		window.status = 0;
	    //		c1 = document.getElementById("addWalls");
	    //		var cxt1 = c1.getContext("2d");
	    //		drawMap1(img, cxt1);
	    //		drawWalls(cxt1, walls);
	    //		//end of 联动4

	    if (state2 == 1) {
	        cxt.lineWidth = wallwidth_thick;
	        cxt.strokeStyle = wallcolor_select;
	        cxt.beginPath();
	        cxt.moveTo(walls[wall_select_i][0], walls[wall_select_i][1]);
	        cxt.lineTo(walls[wall_select_i][2], walls[wall_select_i][3]);
	        cxt.closePath();
	        cxt.stroke();

	        //				//联动3
	        //				window.wall_choice = wall_select_i;
	        //				window.status = 1;
	        //				$('span').html("staus!2");
	        //				c1 = document.getElementById("addWalls");
	        //				var cxt1 = c1.getContext("2d");
	        //				drawMap1(img, cxt1);
	        //				drawWalls(cxt1, walls);
	        //				//end of 联动3

	    }
	    document.getElementById("text_out").innerHTML = e.clientX + ', ' + e.clientY;



	    return true; break;
	default:
	    alert("Error of moving on walls!");
	    return false;
	}


}
//判定是否在直线上,(x,y)为判定点，(x1,y1)(x2,y2)为已知线段端点
function on_wall_determination(x, y, x1, y1, x2, y2) {
    
	if((x<x1-10 &&x<x2-10) || (x>x1+10&&x>x2+10) ||(y<y1-10&&y<y2-10) ||(y>y1+10&&y>y2+10))
	{error=1;return false;}
	else if(!((x1==x2)||(y1==y2))){
		var k=(y2-y1)*1.0/(x2-x1);//斜率k
		var b = y1 - k * x1; //b
		if (k < 1.0 && k > -1.0) {
		    if (y < k * x + b + 10 && y > k * x + b - 10)
		        return true;
		    else return false;
		}
		else {
		    if (x < 1.0/k * y - b/k + 10.0 && x > 1.0/k * y - b/k - 10.0)
		        return true;
		    else return false;
        }
	}
	else{ 
		return true;
	}
}
//删除直线
function delete_wall() {
    
	switch(state2){
		case 0: 
			return false
			break;
		case 1:
		    var c = document.getElementById("deleteWalls");
			var cxt = c.getContext("2d");
			if(wall_select_i<=-1) return false;
			else {
				for(var i=0;i<4;i++){
				walls[wall_select_i][i] = 0;
			}
			cxt.clearRect(0,0,canvas_width,canvas_height);
			wall_select_i=-1;
			state2=0;
			draw_all_walls();

			c1 = document.getElementById("addWalls");
			var cxt1 = c1.getContext("2d");
			drawMap1(img, cxt1);
			drawWalls(cxt1, walls);

			return true;
			}
			break;
		default:
			alert("Error of deleting wall!");
			return false;
	}
}
//画出所有墙体
function draw_all_walls(){
    var c = document.getElementById("deleteWalls");
    var cxt = c.getContext('2d');
    cxt.clearRect(0, 0, canvas_width, canvas_height);
	cxt.lineWidth = wallwidth_nor;
	cxt.strokeStyle = wallcolor_nor;
	for(var i = 0;i<walls.length; i++){
		cxt.beginPath();
		cxt.moveTo(walls[i][0],walls[i][1]);
		cxt.lineTo(walls[i][2],walls[i][3]);
		cxt.closePath();
		cxt.stroke();
    }

//if (wall_i != -1) {
//    var x1 = walls[wall_i][0];
//    var y1 = walls[wall_i][1];
//    var x2 = walls[wall_i][2];
//    var y2 = walls[wall_i][3];

//    cxt.lineWidth = wallwidth_thick; //加粗
//    cxt.strokeStyle = wallcolor_thick;
//    cxt.beginPath();
//    cxt.moveTo(x1, y1);
//    cxt.lineTo(x2, y2);
//    cxt.closePath();
//    cxt.stroke();
//}
//if (wall_select_i != -1) {
//    var x1 = walls[wall_select_i][0];
//    var y1 = walls[wall_select_i][1];
//    var x2 = walls[wall_select_i][2];
//    var y2 = walls[wall_select_i][3];

//    cxt.lineWidth = wallwidth_thick; //加粗
//    cxt.strokeStyle = wallcolor_select;
//    cxt.beginPath();
//    cxt.moveTo(x1, y1);
//    cxt.lineTo(x2, y2);
//    cxt.closePath();
//    cxt.stroke();
//}

}

function click_on_wall(e){
	switch (state2){
		case 0:
		case 1:
		    var c = document.getElementById("deleteWalls");
		    var cxt = c.getContext("2d");
		    for (var i = 0; i < walls.length; i++) {
		        var x1 = walls[i][0];
		        var y1 = walls[i][1];
		        var x2 = walls[i][2];
		        var y2 = walls[i][3];
		        if (on_wall_determination(e.clientX - regulateX, e.clientY - regulateY, x1, y1, x2, y2)) {
		            if (wall_select_i != i && wall_select_i != -1) {
		                cxt.clearRect(0, 0, canvas_width, canvas_height);
		                draw_all_walls();


		            }
		            cxt.lineWidth = wallwidth_thick; //加粗
		            cxt.strokeStyle = wallcolor_select;
		            cxt.beginPath();
		            cxt.moveTo(x1, y1);
		            cxt.lineTo(x2, y2);
		            cxt.closePath();
		            cxt.stroke();

		            //                    //联动
		            //		            window.wall_click = i;

		            //		            window.status = 2;
		            //		            
		            //		            c1 = document.getElementById("addWalls");
		            //		            var cxt1 = c1.getContext("2d");
		            //		            drawMap1(img, cxt1);
		            //		            drawWalls(cxt1, walls);
		            //                    //end of 联动

		            //变色
		            wall_select_i = i;
		            state2 = 1;
		            document.getElementById("text_out").innerHTML = e.clientX + ', ' + e.clientY;
		            return true;

		        }
		    }
		    wall_select_i = -1;
		    state2 = 0;
		    cxt.clearRect(0, 0, canvas_width, canvas_height);
		    draw_all_walls();

		    //		    //联动
		    //		    window.wall_click = -1;
		    //		    window.status = 0;
		    //		    c1 = document.getElementById("addWalls");
		    //		    var cxt1 = c1.getContext("2d");
		    //		    drawMap1(img, cxt1);
		    //		    drawWalls(cxt1, walls);
		    //		    //end of 联动

		    return false; 
            break;
		default:
		alert("Error of clicking on walls");
}
//if (wall_select_i != -1) {
//    window.status = 2;
//    window.wall_click = wall_select_i;
//    c1 = document.getElementById("addWalls");
//    var cxt1 = c1.getContext("2d");
//    drawMap1(img, cxt1);
//    drawWalls(cxt1, walls);
//}
//else {
//    window.wall_click = -1;
//    window.status = 0;
//    c1 = document.getElementById("addWalls");
//    var cxt1 = c1.getContext("2d");
//    drawMap1(img, cxt1);
//    drawWalls(cxt1, walls);
//}
}

function modify_canvas_size(x,y){
	if(x<=0 ||y<=0){
		canvas_width=x;
		canvas_height= y;
		return true;
	}
	else return false;
}

function wallCatch2(context, i) {
    window.wall_i = i;

    draw_all_walls();
    var x1 = walls[i][0];
    var y1 = walls[i][1];
    var x2 = walls[i][2];
    var y2 = walls[i][3];

    context.lineWidth = wallwidth_thick; //加粗
    context.strokeStyle = wallcolor_thick;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
}

function wallSelect2(context, i) {
    window.wall_select_i = i;
    window.state2 = 1;

    draw_all_walls();
    var x1 = walls[i][0];
    var y1 = walls[i][1];
    var x2 = walls[i][2];
    var y2 = walls[i][3];

    context.lineWidth = wallwidth_thick; //加粗
    context.strokeStyle = wallcolor_select;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();

}

/*function load_XMLdata(xml){
	var arrayX = xml.getElementByTagName("x");//X坐标数组
	var arrayY = xml.getElementByTagName("y");//Y坐标数组
	if (arrayX.length!= arrayY.length || arrayX.length<0)
		return false;
	var arrayN = arrayX.length()/2;  //数组长度
	for ( var i=0;i<arrayN; i++){
		sourceWalls[i][0]=arrayX[i*2].firstChild.nodeValue;
		sourceWalls[i][1]=arrayY[i*2].firstChild.nodeValue;
		sourceWalls[i][2]=arrayX[i*2+1].firstChild.nodeValue;
		sourceWalls[i][3]=arrayX[i*2+1].firstChild.nodeValue;	
	}
	arrayX.length = 0;
	arrayY.length = 0;
	return true;
}*/