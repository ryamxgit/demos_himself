
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.currentRow = 0;
	this.boardTable = [];
	this.howManyItems = 0;
	this.errorUnresolved = false;
	
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
		this.boardTable[posx][posy] = num;
		this.howManyItems++;
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
		for (var i=1;i<10;i++) {
			this.boardTable[i] = [];
		}
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				this.boardTable[i+1][j+1] = 0;
			}
		}
		
	};
	
	this.cornerSquare = function(pos) {
		if(pos.x < 4) {
			if(pos.y < 4) {
				return {'x':1, 'y':1};
			}
			if(pos.y < 7) {
				return {'x':1, 'y':4};
			} else {
				return {'x':1, 'y':7};
			}
		}
		if(pos.x < 7) {
			if(pos.y < 4) {
				return {'x':4, 'y':1};
			}
			if(pos.y < 7) {
				return {'x':4, 'y':4};
			} else {
				return {'x':4, 'y':7};
			}
		} else {
			if(pos.y < 4) {
				return {'x':7, 'y':1};
			}
			if(pos.y < 7) {
				return {'x':7, 'y':4};
			} else {
				return {'x':7, 'y':7};
			}
		}
	};
	this.uniqRows = function(num,pos) {
		for(i=1;i<=9;i++) {
			if(this.boardTable[i][pos.y] == num)
				return false;
		}
		return true;
	};
	this.uniqCols = function(num,pos) {
		for(i=1;i<=9;i++) {
			if(this.boardTable[pos.x][i] == num)
				return false;
		}
		return true;
	};
	this.uniqSquare = function(num,pos) {
		var cornerSq = this.cornerSquare(pos);
		for(i=0;i<3;i++) {
			for(j=0;j<3;j++) {
				if(this.boardTable[cornerSq.x+i][cornerSq.y+j] == num)
					return false;
			}
		}
		return true;
	};
	this.asignUniqNumber = function(num, pos) {
		if(this.boardTable[pos.x][pos.y] == 0) {
			if(this.howManyItems > 0) {
				if(!this.uniqRows(num,pos))//same Row
					return false;
				if(!this.uniqCols(num,pos))//same Col
					return false;
				if(!this.uniqSquare(num,pos))//same Square
					return false;
			}
			this.boardTable[pos.x][pos.y] = num;
			this.howManyItems++;
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
		var rowPos = this.getRandomInt(1,10);
		return {'x':colPos, 'y':rowPos};
	};
	this.randomFilledTable = function() {
		if(this.howManyItems > 20) {
			alert('No quedan mas posiciones aleatorias');
			return;
		}
		for (var i=0; i<27;) {
			console.log('Intentando obtener numero de vez:'+i);
			var numArb = this.getRandomInt(1,10);
			var position = this.getRandPosition();
			if(this.asignUniqNumber(numArb, position)) {
				this.putNumberW(numArb, position.x, position.y);
				i++;
			}
		}
	};
	this.resolveBoard = function() {
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				if(this.boardTable[i+1][j+1] == 0) {
					ciclo = true;
					var numArb = this.getRandomInt(1,10);
					var initialNumber = numArb;
					while(ciclo) {
						position = {'x':i+1,'y':j+1};
						if(this.asignUniqNumber(numArb, position)) {
							this.putNumberW(numArb, position.x, position.y);
							ciclo = false;
						} else {
							numArb++;
							if(numArb == 10) {
								numArb = 1;
							}
							if(numArb == initialNumber) {
								this.errorUnresolved = true;
								paper.view.draw();
								alert('Lo sentimos, este Sudoku no tiene solucion');
								return false;
							}
								
						}
					}
				}
			}
		}
		paper.view.draw();
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

function addEvent(obj, type, fn) {
        if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
        else if (obj.attachEvent)
                obj.attachEvent('on' + type, function() { return fn.apply(obj, [window.event]);});
}

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var su = new Sudoku();
	
	su.drawGridLines(3, 3, 3, paper.view.bounds);
	su.drawGridLines(9, 9, 1, paper.view.bounds);
	
	su.initBoard();
	
	paper.view.draw();
	
	addEvent(document.getElementById('Init'), 'click', function() { su.randomFilledTable(); });
	addEvent(document.getElementById('Resolve'), 'click', function() { su.resolveBoard(); });
	addEvent(document.getElementById('Static'), 'click', function() { su.staticFilledTable(); });
}

