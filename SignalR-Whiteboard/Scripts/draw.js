/// <reference path="jquery-1.6.4.js" />

$(document).ready(function () {
    draw.init();
});

var draw = {
    'isDrawing': false,
    'canvasId': '#draw',
    'colour': 'red',
    'lineWidth': 1
};

draw.init = function () {
    draw.canvas = $(draw.canvasId)[0];
    draw.context = draw.canvas.getContext("2d");

    $(draw.canvas).mousedown(function (e) { draw.startDraw(e); });
    $(draw.canvas).mousemove(function (e) { draw.draw(e); });
    $(draw.canvas).mouseup(function (e) { draw.endDraw(e); });
    $("body").mouseup(function (e) { draw.endDraw(e); });
};

draw.translateEvent = function (e) {
    var val = {
        'x': e.pageX - $(draw.canvas).offset().left,
        'y': e.pageY - $(draw.canvas).offset().top
    };

    return val;
};

draw.startDraw = function (e) {
    var ev = draw.translateEvent(e);

    draw.isDrawing = true;
    draw.prevLoc = ev;
};

draw.draw = function (e) {
    var ev = draw.translateEvent(e);

    if (draw.isDrawing) {
        draw.drawPen(draw.prevLoc, ev, draw.colour, draw.lineWidth);

        if (draw.onDraw) {
            draw.onDraw(draw.prevLoc, ev, draw.colour, draw.lineWidth);
        }

        draw.prevLoc = ev;
    }
};

draw.drawPen = function (prev, current, color, width) {
    draw.context.strokeStyle = color;
    draw.context.lineWidth = width;
    draw.context.beginPath();
    draw.context.moveTo(prev.X, prev.Y);
    draw.context.lineTo(current.X, current.Y);
    draw.context.closePath();
    draw.context.stroke();
}

draw.endDraw = function (e) {
    draw.isDrawing = false;
}

draw.clear = function () {
    draw.context.clearRect(0, 0, draw.canvas.width, draw.canvas.height);
}

