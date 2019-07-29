
var drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
    var width_per_rectangle = boundingRect.width / num_rectangles_wide;
    var height_per_rectangle = boundingRect.height / num_rectangles_tall;
    for (var i = 0; i <= num_rectangles_wide; i++) {
        var xPos = boundingRect.left + i * width_per_rectangle;
        var topPoint = new paper.Point(xPos, boundingRect.top);
        var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
        var aLine = new paper.Path.Line(topPoint, bottomPoint);
        aLine.strokeColor = 'black';
    }
    for (var i = 0; i <= num_rectangles_tall; i++) {
        var yPos = boundingRect.top + i * height_per_rectangle;
        var leftPoint = new paper.Point(boundingRect.left, yPos);
        var rightPoint = new paper.Point(boundingRect.right, yPos);
        var aLine = new paper.Path.Line(leftPoint, rightPoint);
        aLine.strokeColor = 'black';
    }
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);

	drawGridLines(9, 9, paper.view.bounds);
	paper.view.draw();
}