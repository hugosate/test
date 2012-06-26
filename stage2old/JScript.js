canvas_width = 500;
canvas_height = 500;
//sizeMin = 500;

sourceX = 500;
sourceY = 500;
sourceMax = 0;

var wallwidth_nor = 3; // 正常线宽
var wallwidth_thick = 5; //加粗线宽
var wallcolor_nor = "red";  //正常线段颜色
var wallcolor_thick = "green"; //加粗线段颜色
var wallcolor_select = "blue"; //选择后线段颜色
var pointcolor = "black";

sourceWalls = new Array();

walls = new Array();
wall_choice = -1;
wall_click = -1;
wall_draw = -1;

point_click = -1;

regulateX1 = 10;
regulateY1 = 7;

x0 = 0;
y0 = 0;

x1 = 0;
y1 = 0;
x2 = 0;
y2 = 0;

x3 = 0;
y3 = 0;

//flex = 0;

status = 0;

drawMode = 0;


xmlpath = "lines1.xml";
savepath = "result.xml";

function init() {


    $.post("phpreadxml.php", { xmlpath: xmlpath }, function (xml) {

        load_XMLdata(xml);



        c = document.getElementById("addWalls");

        img = new Image();
        img.src = "http://110.64.72.20:8081/myImage.jpg";


        img.onload = function () {

            sourceX = img.width;
            sourceY = img.height;

            if (sourceX > sourceY) {
                sourceMax = 0;
            }
            else {
                sourceMax = 1;
            }

            var cxt = c.getContext("2d");

            drawMap1(img, cxt);


            scaleWall(sourceWalls, walls, sourceMax);

            drawWalls(cxt, walls);

            draw_all_walls();


        }
    }); 

}

function load_XMLdata(xml) {
    
    var arrayX = xml.getElementsByTagName("x"); //X坐标数组

    var arrayY = xml.getElementsByTagName("y"); //Y坐标数组
    


    if (arrayX.length != arrayY.length || arrayX.length < 0)
        return false;
    var arrayN = arrayX.length / 2;  //数组长度
    
    for (var i = 0; i < arrayN; i++) {
        x1 = arrayX[i * 2].firstChild.nodeValue;
        y1 = arrayY[i * 2].firstChild.nodeValue;
        x2 = arrayX[i * 2 + 1].firstChild.nodeValue;
        y2 = arrayY[i * 2 + 1].firstChild.nodeValue;
        window.sourceWalls[i] = new Array(x1, y1, x2, y2);
    }

    arrayX.length = 0;
    arrayY.length = 0;
    
    return true;

}

function drawMap1(image, context) {
    context.clearRect(0, 0, canvas_width, canvas_height);
    if (sourceMax == 0) {
        context.drawImage(image, 0, 0, sourceX, sourceY, 0, canvas_height / 2 - canvas_width * sourceY / sourceX / 2, canvas_width, canvas_width * sourceY / sourceX);
    }
    else {
        context.drawImage(image, 0, 0, sourceX, sourceY, canvas_width / 2 - canvas_height * sourceX / sourceY / 2, 0, canvas_height * sourceX / sourceY, canvas_height);
    }
}


function scaleWall(sourceArray, wallArray, SourceMax) {
    var i = 0;
    if (sourceMax == 0) {
        var k = canvas_width / sourceX;
        for (i = 0; i < sourceArray.length; i++) {
            var x1 = sourceArray[i][0] * k;
            var y1 = sourceArray[i][1] * k + canvas_height / 2 - k * sourceY / 2;
            var x2 = sourceArray[i][2] * k;
            var y2 = sourceArray[i][3] * k + canvas_height / 2 - k * sourceY / 2;
            wallArray[i] = new Array(x1, y1, x2, y2);
        }
    }
    else {
        var k = canvas_height / sourceY;
        for (i = 0; i < sourceArray.length; i++) {
            var x1 = sourceArray[i][0] * k + canvas_width / 2 - k * sourceX / 2;
            var y1 = sourceArray[i][1] * k;
            var x2 = sourceArray[i][2] * k + canvas_width / 2 - k * sourceX / 2;
            var y2 = sourceArray[i][3] * k;
            wallArray[i] = new Array(x1, y1, x2, y2);
        }
    }
}

function scaleWall2(sourceArray, wallArray, SourceMax) {
    var i = 0;
    var n = 0;

    if (sourceMax == 0) {
        var k = canvas_width / sourceX;
        for (i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i][0] == 0 && sourceArray[i][1] == 0 && sourceArray[i][2] == 0 && sourceArray[i][3] == 0) {
                continue;
            }
            var x1 = parseInt(sourceArray[i][0] / k);
            var y1 = parseInt(sourceArray[i][1] / k - canvas_height / 2 / k + sourceY / 2);
            var x2 = parseInt(sourceArray[i][2] / k);
            var y2 = parseInt(sourceArray[i][3] / k - canvas_height / 2 / k + sourceY / 2);
            wallArray[n] = new Array(x1, y1, x2, y2);
            n++;
        }
    }
    else {
        var k = canvas_height / sourceY;
        for (i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i][0] == 0 && sourceArray[i][1] == 0 && sourceArray[i][2] == 0 && sourceArray[i][3] == 0) {
                continue;
            }
            var x1 = parseInt(sourceArray[i][0] / k - canvas_width / 2 / k + sourceX / 2);
            var y1 = parseInt(sourceArray[i][1] / k);
            var x2 = parseInt(sourceArray[i][2] / k - canvas_width / 2 / k + sourceX / 2);
            var y2 = parseInt(sourceArray[i][3] / k);
            wallArray[n] = new Array(x1, y1, x2, y2);
            n++;
        }
    }
    alert("scale");
    
}

function drawWalls(context, wallArray) {

    context.lineWidth = wallwidth_nor;
    context.strokeStyle = wallcolor_nor;
    
    for (var i = 0; i < wallArray.length; i++) {
        context.beginPath();
        context.moveTo(wallArray[i][0], wallArray[i][1]);
        context.lineTo(wallArray[i][2], wallArray[i][3]);
        context.closePath();
        context.stroke();
    }

    if (wall_choice != -1) {
        context.lineWidth = wallwidth_thick; //加粗
        context.strokeStyle = wallcolor_thick;
        x1 = walls[wall_choice][0];
        y1 = walls[wall_choice][1];
        x2 = walls[wall_choice][2];
        y2 = walls[wall_choice][3];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
    }

    if (wall_click != -1) {
        context.lineWidth = wallwidth_thick; //加粗
        context.strokeStyle = wallcolor_select;
        x1 = walls[wall_click][0];
        y1 = walls[wall_click][1];
        x2 = walls[wall_click][2];
        y2 = walls[wall_click][3];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();

        //if (status == 3) {
            if (point_click == 0) {
                context.fillStyle = pointcolor;
                context.beginPath();
                context.arc(x1, y1, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            }

            if (point_click == 2) {
                context.fillStyle = pointcolor;
                context.beginPath();
                context.arc(x2, y2, 5, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            }
        //}

    }
    
}

function down1(event) {
    if (drawMode == 0) {
        switch (status) {
            case 0: break;
            case 1:
            case 2:
                if (wall_click == wall_choice) {
                    window.x3 = event.clientX - regulateX1;
                    window.y3 = event.clientY - regulateY1;
                    status = 5;
                    return;
                }
                wall_click = wall_choice;
                var cxt = c.getContext("2d");
                drawMap1(img, cxt);
                drawWalls(cxt, walls);

                //                            //联动
                //                            c2 = document.getElementById("deleteWalls");
                //                            var cxt2 = c2.getContext("2d");
                //                            wallSelect2(cxt2, wall_click);
                //                            //end of 联动

                if (wall_choice == -1) {
                    status = 0;
                    //                                    //联动
                    //                                    c2 = document.getElementById("deleteWalls");
                    //                                    var cxt2 = c2.getContext("2d");
                    //                                    window.state2 = 0;
                    //                                    //window.wall_i = -1;
                    //                                    draw_all_walls();
                    //                                    //end of 联动

                }
                else {
                    status = 2;
                }
                break;

            case 3:
                window.x3 = event.clientX - regulateX1;
                window.y3 = event.clientY - regulateY1;
                wall_choice = wall_click;
                status = 4;
                break;

        }
    } //drawMode为0
    else {
        window.x0 = event.clientX - regulateX1;
        window.y0 = event.clientY - regulateY1;
        switch (status) {
            case 0:
                var i = 0;
                //搜索可用数组项
                for (i = 0; i < walls.length; i++) {
                    x1 = walls[i][0];
                    y1 = walls[i][1];
                    x2 = walls[i][2];
                    y2 = walls[i][3];
                    if (x1 == 0 && y1 == 0 && x2 == 0 && y2 == 0) {
                        wall_draw = i;
                        break;
                    }
                }

                if (wall_draw == -1) {
                    wall_draw = walls.length;
                    walls[wall_draw] = new Array(x0, y0, x0, y0);
                }
                else {
                    walls[wall_draw][0] = x0;
                    walls[wall_draw][1] = y0;
                    walls[wall_draw][2] = x0+1;
                    walls[wall_draw][3] = y0+1;
                }
                status = 1;
                break;
            case 1:

                
                wall_draw = -1;
                status = 0;

                var cxt = c.getContext("2d");
                drawMap1(img, cxt);
                drawWalls(cxt, walls);

                c2 = document.getElementById("deleteWalls");
                var cxt2 = c2.getContext("2d");
                draw_all_walls();

                break;
        }
    }
    $('span').html("staus:" + window.status + "  ,state2:" + window.state2);
}

function up1(event) {
    switch (status) {
        case 4:
            status = 3;
            break;
        case 5:
            status = 2;
            break;
    }
}

function on_point_determination(x1, y1, x2, y2) {
    if (x1 - x2 < 5 && x1 - x2 > -5 && y1 - y2 < 5 && y1 - y2 > -5) {
        return true;
    }
    else {
        return false;
    }
}

function move1(event) {
    $('span').html("staus:" + window.status + "  ,state2:" + window.state2);
//    if (event.clientX - regulateX < 5 || event.clientX - regulateX > sizex - 5 || event.clientY - regulateY < 5 || event.clientY - regulateY > sizey - 5) {
//        window.status = 2;
//        return;
    //    }
    c = document.getElementById("addWalls");
    var cxt = c.getContext("2d");
    window.x0 = event.clientX - regulateX1;
    window.y0 = event.clientY - regulateY1;
    var i = 0;

    if (drawMode == 0) {
        switch (status) {
            case 0:
            case 1:
            case 2:
            case 3:
                if (status == 2 || status == 3) {
                    if (on_point_determination(x0, y0, walls[wall_click][0], walls[wall_click][1])) {
                        status = 3;
                        point_click = 0;
                        drawMap1(img, cxt);
                        drawWalls(cxt, walls);
                        return;
                    } //捕捉前端点
                    
                    if (on_point_determination(x0, y0, walls[wall_click][2], walls[wall_click][3])) {
                        status = 3;
                        point_click = 2;
                        drawMap1(img, cxt);
                        drawWalls(cxt, walls);
                        return;
                    } //捕捉后端点
                    
                    point_click = -1;
                    status = 2;

                }

                for (i = 0; i < walls.length; i++) {
                    x1 = walls[i][0];
                    y1 = walls[i][1];
                    x2 = walls[i][2];
                    y2 = walls[i][3];
                    if (on_wall_determination(x0, y0, x1, y1, x2, y2)) {
                        break;
                    }
                }

//                if (i == wall_click) {
//                    drawMap1(img, cxt);
//                    drawWalls(cxt, walls);
//                    return;
//                }

                if (i != walls.length) {
                    wall_choice = i;
                    drawMap1(img, cxt);
                    drawWalls(cxt, walls);

                    //                                    //联动
                    //                                    c2 = document.getElementById("deleteWalls");
                    //                                    var cxt2 = c2.getContext("2d");
                    //                                    wallCatch2(cxt2, wall_choice);
                    //                                    //end of 联动

                    if (status == 0)
                        status = 1;
                }
                else {
                    wall_choice = -1;
                    drawMap1(img, cxt);
                    drawWalls(cxt, walls);

                    //                                    //联动
                    //                                    c2 = document.getElementById("deleteWalls");
                    //                                    var cxt2 = c2.getContext("2d");

                    //                                    draw_all_walls();
                    //                                    //end of 联动

                    if (status == 1)
                        status = 0;
                }
                break;
            case 4:
                if (walls[wall_click][1] == walls[wall_click][3]) {
                    walls[wall_click][point_click] += x0 - x3;
                    x3 = walls[wall_click][point_click];
                }
                if (walls[wall_click][0] == walls[wall_click][2]) {
                    walls[wall_click][point_click + 1] += y0 - y3;
                    y3 = walls[wall_click][point_click + 1];
                }
                drawMap1(img, cxt);
                drawWalls(cxt, walls);

                c2 = document.getElementById("deleteWalls");
                var cxt2 = c2.getContext("2d");
                draw_all_walls();

                break;

            case 5:
                if (walls[wall_click][1] == walls[wall_click][3]) {
                    walls[wall_click][1] += y0 - y3;
                    walls[wall_click][3] += y0 - y3;
                    y3 = walls[wall_click][1];
                }
                if (walls[wall_click][0] == walls[wall_click][2]) {
                    walls[wall_click][0] += x0 - x3;
                    walls[wall_click][2] += x0 - x3;
                    x3 = walls[wall_click][0];
                }
                drawMap1(img, cxt);
                drawWalls(cxt, walls);

                c2 = document.getElementById("deleteWalls");
                var cxt2 = c2.getContext("2d");
                draw_all_walls();

                break;

        }
    } //drawMode为0
    else {
        switch (status) {
            case 0: break;
            case 1:
                walls[wall_draw][2] = x0;
                walls[wall_draw][3] = y0;

                x1 = walls[wall_draw][0];
                y1 = walls[wall_draw][1];
                x2 = walls[wall_draw][2];
                y2 = walls[wall_draw][3];

                //                var k = (y2 - y1) * 1.0 / (x2 - x1); //斜率k
                //                if (k > 11.43 || k < -11.43) {
                //                    walls[wall_draw][2] = x1;
                //                }

                //                if (k < 0.087 && k > -0.087) {
                //                    walls[wall_draw][3] = y1;
                //                }

                var k = 15;
                if (x2 - x1 > -k && x2 - x1 < k) {
                    walls[wall_draw][2] = x1;
                }
                if (x1 - x2 > -k && x1 - x2 < k) {
                    walls[wall_draw][2] = x1;
                }

                if (y1 - y2 > -k && y1 - y2 < k) {
                    walls[wall_draw][3] = y1;
                }

                if (y2 - y1 > -k && y2 - y1 < k) {
                    walls[wall_draw][3] = y1;
                }

                var cxt = c.getContext("2d");
                drawMap1(img, cxt);
                drawWalls(cxt, walls);
                break;
        }
    }
    $('span').html("staus:" + window.status + "  ,state2:" + window.state2);
    //$('span').html("(" + x1 + ", " + y1 + "), (" + x2 + ", " + y2 + "), X0:" + x0 + ", Y0:" + y0);
}

//function on_wall_determination(x, y, x1, y1, x2, y2) {
//    if ((x < x1 - 10 && x < x2 - 10) || (x > x1 + 10 && x > x2 + 10) || (y < y1 - 10 && y < y2 - 10) || (y > y1 + 10 && y > y2 + 10))
//    { error = 1; return false; }
//    else if (!((x1 == x2) || (y1 == y2))) {
//        var k = (y2 - y1) * 1.0 / (x2 - x1); //斜率k
//        var b = y1 - k * x1; //b
//        if (y < k * x + b + 10 && y > k * x + b - 10)
//            return true;
//        else return false;
//    }
//    else {
//        return true;
//    }
//}


function draw_mode() {
   
    if (drawMode == 0) {
        drawMode = 1;
    }
    else {
        drawMode = 0;
    }

    status = 0;
    wall_click = -1;
    wall_choice = -1;
    wall_draw = -1;

    var cxt = c.getContext("2d");
    drawMap1(img, cxt);
    drawWalls(cxt, walls);
   // return true;
}

function save_wall() {
    resultWalls = new Array();
    scaleWall2(walls, resultWalls, sourceMax);
    $.post("xmlsave.php", { array: resultWalls, savepath: savepath }, function (data) {
        alert(data);
    });
}