
var regulateX = 510; //�������Ͻ�X����
var regulateY = 10;//�������Ͻ�Y����

//var canvas_width = 500;//�������
//var canvas_height = 500;//�����߶�
var canvas_width2 = 400;
var canvas_height2 =400;

//var wallwidth_nor = 3; // �����߿�
//var wallwidth_thick = 5; //�Ӵ��߿�
//var wallcolor_nor = "black";  //�����߶���ɫ
//var wallcolor_thick = "green";//�Ӵ��߶���ɫ
//var wallcolor_select = "red";//ѡ����߶���ɫ

var state2=0;//���״̬��0��ʾû����ƶ�״̬��1��ʾ����߶�״̬

//var sourceWalls = new  Array();
//var source_n =sourceWalls.length; 

//var n = 3;
//var max_n = 10;
//var walls = new Array(max_n);   //�������
//	walls[0] = new Array(100,100,200,150);
//	walls[1] = new Array(200,200,200,300);
//	walls[2] = new Array(100,400,200,400);
 
var wall_i=-1;//�Ӵֵ��߶α��        
var wall_select_i=-1;//���ѡ����߶α��   -1��ʾû��ѡ���߶�

var error1=0;//������

//����ƶ���ֱ����ʱ���߶μӴ�
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
	            cxt.lineWidth = wallwidth_thick; //�Ӵ�
	            cxt.strokeStyle = wallcolor_thick;
	            cxt.beginPath();
	            cxt.moveTo(x1, y1);
	            cxt.lineTo(x2, y2);
	            cxt.closePath();
	            cxt.stroke();

	            //            //����1
	            //			window.wall_choice = i;
	            //			window.status = 1;
	            //			$('span').html("staus!1");
	            //			c1 = document.getElementById("addWalls");
	            //			var cxt1 = c1.getContext("2d");
	            //			drawMap1(img, cxt1);
	            //			drawWalls(cxt1, walls);
	            //            //end of ����1

	            if (state2 == 1) {
	                cxt.lineWidth = wallwidth_thick;
	                cxt.strokeStyle = wallcolor_select;
	                cxt.beginPath();
	                cxt.moveTo(walls[wall_select_i][0], walls[wall_select_i][1]);
	                cxt.lineTo(walls[wall_select_i][2], walls[wall_select_i][3]);
	                cxt.closePath();
	                cxt.stroke();

	                //				//����2
	                //				window.wall_choice = wall_select_i;
	                //				//window.status = 2;
	                //				c1 = document.getElementById("addWalls");
	                //				var cxt1 = c1.getContext("2d");
	                //				drawMap1(img, cxt1);
	                //				drawWalls(cxt1, walls);
	                //				//end of ����2

	            }
	            //			document.getElementById("text_out").innerHTML=e.clientX+', '+e.clientY;
	            return true;
	        }
	    }
	    wall_i = -1;
	    cxt.clearRect(0, 0, canvas_width, canvas_height);
	    draw_all_walls();

	    //		//����4
	    //		window.wall_choice = -1;
	    //		window.status = 0;
	    //		c1 = document.getElementById("addWalls");
	    //		var cxt1 = c1.getContext("2d");
	    //		drawMap1(img, cxt1);
	    //		drawWalls(cxt1, walls);
	    //		//end of ����4

	    if (state2 == 1) {
	        cxt.lineWidth = wallwidth_thick;
	        cxt.strokeStyle = wallcolor_select;
	        cxt.beginPath();
	        cxt.moveTo(walls[wall_select_i][0], walls[wall_select_i][1]);
	        cxt.lineTo(walls[wall_select_i][2], walls[wall_select_i][3]);
	        cxt.closePath();
	        cxt.stroke();

	        //				//����3
	        //				window.wall_choice = wall_select_i;
	        //				window.status = 1;
	        //				$('span').html("staus!2");
	        //				c1 = document.getElementById("addWalls");
	        //				var cxt1 = c1.getContext("2d");
	        //				drawMap1(img, cxt1);
	        //				drawWalls(cxt1, walls);
	        //				//end of ����3

	    }
	    document.getElementById("text_out").innerHTML = e.clientX + ', ' + e.clientY;



	    return true; break;
	default:
	    alert("Error of moving on walls!");
	    return false;
	}


}
//�ж��Ƿ���ֱ����,(x,y)Ϊ�ж��㣬(x1,y1)(x2,y2)Ϊ��֪�߶ζ˵�
function on_wall_determination(x, y, x1, y1, x2, y2) {
    
	if((x<x1-10 &&x<x2-10) || (x>x1+10&&x>x2+10) ||(y<y1-10&&y<y2-10) ||(y>y1+10&&y>y2+10))
	{error=1;return false;}
	else if(!((x1==x2)||(y1==y2))){
		var k=(y2-y1)*1.0/(x2-x1);//б��k
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
//ɾ��ֱ��
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
//��������ǽ��
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

//    cxt.lineWidth = wallwidth_thick; //�Ӵ�
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

//    cxt.lineWidth = wallwidth_thick; //�Ӵ�
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
		            cxt.lineWidth = wallwidth_thick; //�Ӵ�
		            cxt.strokeStyle = wallcolor_select;
		            cxt.beginPath();
		            cxt.moveTo(x1, y1);
		            cxt.lineTo(x2, y2);
		            cxt.closePath();
		            cxt.stroke();

		            //                    //����
		            //		            window.wall_click = i;

		            //		            window.status = 2;
		            //		            
		            //		            c1 = document.getElementById("addWalls");
		            //		            var cxt1 = c1.getContext("2d");
		            //		            drawMap1(img, cxt1);
		            //		            drawWalls(cxt1, walls);
		            //                    //end of ����

		            //��ɫ
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

		    //		    //����
		    //		    window.wall_click = -1;
		    //		    window.status = 0;
		    //		    c1 = document.getElementById("addWalls");
		    //		    var cxt1 = c1.getContext("2d");
		    //		    drawMap1(img, cxt1);
		    //		    drawWalls(cxt1, walls);
		    //		    //end of ����

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

    context.lineWidth = wallwidth_thick; //�Ӵ�
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

    context.lineWidth = wallwidth_thick; //�Ӵ�
    context.strokeStyle = wallcolor_select;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();

}

/*function load_XMLdata(xml){
	var arrayX = xml.getElementByTagName("x");//X��������
	var arrayY = xml.getElementByTagName("y");//Y��������
	if (arrayX.length!= arrayY.length || arrayX.length<0)
		return false;
	var arrayN = arrayX.length()/2;  //���鳤��
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