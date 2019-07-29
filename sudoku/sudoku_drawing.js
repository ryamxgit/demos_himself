
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.drawGridLines = function(num_rectangles_wide, num_rectangles_tall, stroke, boundingRect) {
		this.width_per_rectangle = (boundingRect.width / num_rectangles_wide);
		this.height_per_rectangle = (boundingRect.height / num_rectangles_tall);
		for (var i = 0; i <= num_rectangles_wide; i++) {
			var xPos = boundingRect.left + i * this.width_per_rectangle;
			var topPoint = new paper.Point(xPos, boundingRect.top);
			var bottomPoint = new paper.Point(xPos, boundingRect.bottom);
			var aLine = new paper.Path.Line(topPoint, bottomPoint);
			aLine.strokeColor = 'black';
			aLine.strokeWidth = stroke;
		}
		for (var i = 0; i <= num_rectangles_tall; i++) {
			var yPos = boundingRect.top + i * this.height_per_rectangle;
			var leftPoint = new paper.Point(boundingRect.left, yPos);
			var rightPoint = new paper.Point(boundingRect.right, yPos);
			var aLine = new paper.Path.Line(leftPoint, rightPoint);
			aLine.strokeColor = 'black';
			aLine.strokeWidth = stroke;
		}
	};
	this.drawNumberTexts = function(num, posx, posy) {
		var locX = (posx - 1)*this.width_per_rectangle + (this.width_per_rectangle / 2);
		var locY = (posy - 1)*this.height_per_rectangle + (this.height_per_rectangle / 2);
		var text = new paper.PointText({content: num, fontSize: 12, justification: 'center', point: new paper.Point(locX, locY)});
	};
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var su = new Sudoku();

	su.drawGridLines(9, 9, 1, paper.view.bounds);
	su.drawGridLines(3, 3, 3, paper.view.bounds);
	
	//Box1
	su.drawNumberTexts(4,1,1);
	su.drawNumberTexts(6,2,3);
	
	//Box2
	su.drawNumberTexts(1,4,1);
	su.drawNumberTexts(3,5,1);
	su.drawNumberTexts(4,6,2);
	
	//Box3
	su.drawNumberTexts(5,8,1);
	su.drawNumberTexts(2,9,2);
	
	//Box4
	su.drawNumberTexts(5,2,4);
	su.drawNumberTexts(8,2,5);
	
	//Box5
	su.drawNumberTexts(6,4,4);
	su.drawNumberTexts(5,6,5);
	su.drawNumberTexts(2,5,6);
	
	//Box6
	su.drawNumberTexts(7,8,4);
	su.drawNumberTexts(4,7,5);
	su.drawNumberTexts(8,8,6);
	
	//Box7
	su.drawNumberTexts(3,1,7);
	su.drawNumberTexts(5,3,7);
	su.drawNumberTexts(7,1,8);
	su.drawNumberTexts(1,3,9);
	
	//Box8
	su.drawNumberTexts(8,4,7);
	su.drawNumberTexts(7,5,7);
	su.drawNumberTexts(3,4,8);
	su.drawNumberTexts(4,5,8);
	su.drawNumberTexts(5,5,9);
	
	//Box9
	su.drawNumberTexts(6,8,7);
	su.drawNumberTexts(9,9,7);
	su.drawNumberTexts(5,7,8);
	su.drawNumberTexts(3,8,9);
	
	paper.view.draw();
}
