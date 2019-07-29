
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.drawGridLines = function(num_rectangles_wide, num_rectangles_tall, boundingRect) {
		this.width_per_rectangle = (boundingRect.width / num_rectangles_wide) - 2;
		this.height_per_rectangle = (boundingRect.height / num_rectangles_tall) - 2;
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
		var text = new paper.PointText({content: num, fontSize: 12, justification: 'center', point: new paper.Point(locX, locY)});
	};
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var su = new Sudoku();

	su.drawGridLines(9, 9, paper.view.bounds);
	paper.view.draw();
	
	//Box1
	su.drawNumberTexts(4,1,1);
	su.drawNumberTexts(6,3,2);
	
	//Box2
	su.drawNumberTexts(1,1,4);
	su.drawNumberTexts(3,1,5);
	su.drawNumberTexts(4,2,6);
	
	//Box3
	su.drawNumberTexts(5,1,8);
	su.drawNumberTexts(2,2,9);
	
	//Box4
	su.drawNumberTexts(5,4,2);
	su.drawNumberTexts(8,5,2);
	
	//Box5
	su.drawNumberTexts(6,4,4);
	su.drawNumberTexts(5,5,6);
	su.drawNumberTexts(2,6,5);
	
	//Box6
	su.drawNumberTexts(7,4,8);
	su.drawNumberTexts(4,5,7);
	su.drawNumberTexts(8,6,9);
	
	//Box7
	su.drawNumberTexts(3,7,1);
	su.drawNumberTexts(5,7,3);
	su.drawNumberTexts(7,8,1);
	su.drawNumberTexts(1,9,3);
	
	//Box8
	su.drawNumberTexts(8,7,4);
	su.drawNumberTexts(7,7,5);
	su.drawNumberTexts(3,8,4);
	su.drawNumberTexts(4,8,5);
	su.drawNumberTexts(5,9,5);
	
	//Box9
	su.drawNumberTexts(6,7,8);
	su.drawNumberTexts(9,7,9);
	su.drawNumberTexts(5,8,7);
	su.drawNumberTexts(3,9,8);
}
