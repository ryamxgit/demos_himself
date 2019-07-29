
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
		this.width_per_rectangle = boundingRect.width / num_rectangles_wide;
		this.height_per_rectangle = boundingRect.height / num_rectangles_tall;
		for (var i = 0; i <= num_rectangles_wide; i++) {
			var xPos = boundingRect.left + i * this.width_per_rectangle;
			var topPoint = new paper.Point(xPos, boundingRect.top);
			var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
			var aLine = new paper.Path.Line(topPoint, bottomPoint);
			aLine.strokeColor = 'black';
		}
		for (var i = 0; i <= num_rectangles_tall; i++) {
			var yPos = boundingRect.top + i * this.height_per_rectangle;
			var leftPoint = new paper.Point(boundingRect.left, yPos);
			var rightPoint = new paper.Point(boundingRect.right, yPos);
			var aLine = new paper.Path.Line(leftPoint, rightPoint);
			aLine.strokeColor = 'black';
		}
	};
	this.drawNumberTexts = function(num, posx, posy) {
		var locX = (posx - 1)*this.width_per_rectangle + (this.width_per_rectangle / 2);
		var locY = (posy - 1)*this.height_per_rectangle + (this.height_per_rectangle / 2);
		var text = new PointText({content: num, fontSize: 12, justification: 'center', point: newPint(locX, locY)});
	};
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var su = new Sudoku();

	su.drawGridLines(9, 9, paper.view.bounds);
	paper.view.draw();
	
	su.drawNumberTexts(1,3,4);
}