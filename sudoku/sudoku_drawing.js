
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.currentRow = 0;
	this.boardTable = [];
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
	this.putNumber = function(num, posx, posy) {
		this.boardTable[posx, posy] = num;
		var locX = (posx - 1)*this.width_per_rectangle + (this.width_per_rectangle / 2);
		var locY = (posy - 1)*this.height_per_rectangle + (this.height_per_rectangle / 2);
		var t = new paper.PointText({content: num, fontSize: 12, justification: 'center', point: new paper.Point(locX, locY)});
	};
	this.putNumberW = function(num, posx, posy) {
		var locX = (posx - 1)*this.width_per_rectangle + (this.width_per_rectangle / 2);
		var locY = (posy - 1)*this.height_per_rectangle + (this.height_per_rectangle / 2);
		var t = new paper.PointText({content: num, fontSize: 12, justification: 'center', point: new paper.Point(locX, locY)});
	};
	this.initBoard = function() {
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				this.boardTable[i+1, j+1] = 0;
			}
		}
		
	};
	this.asignVoidError = function(num, pos) {
		if(this.boardTable[pos.x,pos.y] == 0) {
			this.boardTable[pos.x,pos.y] = num;
			return true;
		} else {
			return false;
		}
	};
	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};
	this.getRandPosition = function() {
		var findVoid = false;
		var colPos = this.getRandomInt(1,10);
		while(!findVoid) {
			if(this.boardTable[colPos,this.currentRow] == 0)
				findVoid = true;
			else {
				this.currentRow++;
				if(this.currentRow == 10) {
					this.currentRow = 1;
					colPos++;
					if(colPos == 10)
						colPos = 1;
				}
			}
		}
		return {'x':colPos, 'y':this.currentRow};
	};
	this.randomFilledTable = function() {
		this.currentRow = 1;
		for (var i=0; i<9;) {
			console.log('Intentando obtener numero de vez:'+i);
			var numArb = this.getRandomInt(1,10);
			var position = this.getRandPosition();
			if(this.asignVoidError(numArb, position)) {
				this.putNumberW(numArb, position.x, position.y);
				i++;
			}
		}
	};
	this.staticFilledTable = function() {
		//Box1
		this.putNumber(4,1,1);
		this.putNumber(6,2,3);
	
		//Box2
		this.putNumber(1,4,1);
		this.putNumber(3,5,1);
		this.putNumber(4,6,2);
		
		//Box3
		this.putNumber(5,8,1);
		this.putNumber(2,9,2);
		
		//Box4
		this.putNumber(5,2,4);
		this.putNumber(8,2,5);
		
		//Box5
		this.putNumber(6,4,4);
		this.putNumber(5,6,5);
		this.putNumber(2,5,6);
		
		//Box6
		this.putNumber(7,8,4);
		this.putNumber(4,7,5);
		this.putNumber(8,8,6);
		
		//Box7
		this.putNumber(3,1,7);
		this.putNumber(5,3,7);
		this.putNumber(7,1,8);
		this.putNumber(1,3,9);
		
		//Box8
		this.putNumber(8,4,7);
		this.putNumber(7,5,7);
		this.putNumber(3,4,8);
		this.putNumber(4,5,8);
		this.putNumber(5,5,9);
		
		//Box9
		this.putNumber(6,8,7);
		this.putNumber(9,9,7);
		this.putNumber(5,7,8);
		this.putNumber(3,8,9);
	};
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var su = new Sudoku();
	
	su.drawGridLines(3, 3, 3, paper.view.bounds);
	su.drawGridLines(9, 9, 1, paper.view.bounds);
	
	su.initBoard();
	su.randomFilledTable();
	
	paper.view.draw();
}
