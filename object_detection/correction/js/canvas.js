var canvas = $("canvas")[0];
var canvasImg;

var drawn = 0;

/*****************************************************************************
 * http://stackoverflow.com/questions/17226133/drawing-a-rectangle-on-canvas *
 ****************************************************************************/
var context, startX, endX, startY, endY;
var mouseIsDown = 0;

function init(imgObj) {
  canvasImg = imgObj;

  $("canvas").mousedown(mouseDown);
  $("canvas").mousemove(mouseXY);
  $("canvas").mouseup(mouseUp);
}

function mouseUp(eve) {
  if (mouseIsDown != 0) {
    mouseIsDown = 0;
    var pos = getMousePos(canvas, eve);
    endX = pos.x;
    endY = pos.y;
    drawSquare();
    drawn = 1;
  }
}

function mouseDown(eve) {
  if (drawn)
    return;

  mouseIsDown = 1;
  var pos = getMousePos(canvas, eve);
  startX = endX = pos.x;
  startY = endY = pos.y;
  drawSquare();
}

function mouseXY(eve) {
  if (mouseIsDown != 0) {
    var pos = getMousePos(canvas, eve);
    endX = pos.x;
    endY = pos.y;

    drawSquare();
  }
}

function drawSquare() {
  var w = endX - startX;
  var h = endY - startY;
  var offsetX = (w < 0) ? w : 0;
  var offsetY = (h < 0) ? h : 0;
  var width = Math.abs(w);
  var height = Math.abs(h);

  context.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.rect(startX + offsetX, startY + offsetY, width, height);
  context.lineWidth = 2.5;
  context.strokeStyle = "lime";
  context.stroke();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
/*****************************************************************************/

function loadImage(labels) {
  $("img").attr("src", "../../samples/" + currentImg + ".jpg");
  $("img").css("display", "block"); // workaround for getting image dimensions

  context = canvas.getContext("2d");
  var imgObj = new Image();
  imgObj.onload = function() {
    var width = $("img").width();
    var height = $("img").height();

    canvas.width = width;
    canvas.height = height;

    context.drawImage(imgObj, 0, 0, width, height);
    $("img").css("display", "none"); // workaround for getting image dimensions

    if (labels) {
      startX = currentLabels.bbox.startX;
      startY = currentLabels.bbox.startY;
      endX = currentLabels.bbox.endX;
      endY = currentLabels.bbox.endY;

      if (startX) {
        drawSquare();
        drawn = 1;
      }
    }
  }
  imgObj.src = currentImgSrc;

  init(imgObj);
}

function resetPoints() {
  startX = 0;
  endX = 0;
  startY = 0;
  endY = 0;
}

$("#resetBox").click(function() {
  context.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);
  drawn = 0;
  resetPoints();
});