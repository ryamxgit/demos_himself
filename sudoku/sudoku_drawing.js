
var Sudoku = function() {
	this.width_per_rectangle = 0;
	this.height_per_rectangle = 0;
	this.currentRow = 0;
	this.boardTable = [];
	this.howManyItems = 0;
	this.errorUnresolved = false;
	this.staticFilled = false;
	this.resetButton = false;
	
	this.resetCanvas = function() {
		this.resetButton = true;
		this.resetAll();
	};
	this.resetAll = function() {
		// Canvas reset (init of every cycle)
		var bR = document.getElementById('sudokuZone');
		var square = new paper.Path.Rectangle({rectangle: paper.view.bounds, fillColor: 'white'});
		this.drawGridLines(3, 3, 3, paper.view.bounds);
		this.drawGridLines(9, 9, 1, paper.view.bounds);
		this.howManyItems = 0;
		this.initBoard();
		this.staticFilled = false;
		paper.view.draw();
		this.setMsg('Tablero reseteado');
	}
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
	this.whichBox = function(whatPoint) {
		var left = 1 + Math.floor(whatPoint.x / this.width_per_rectangle);
		var top = 1 + Math.floor(whatPoint.y / this.height_per_rectangle);
		return {'x':left, 'y': top};
	}
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
	this.testingUniqNumber = function(num, pos) {
		if(this.boardTable[pos.x][pos.y] == 0) {			
			if(!this.uniqRows(num,pos))//same Row
				return false;
			if(!this.uniqCols(num,pos))//same Col
				return false;
			if(!this.uniqSquare(num,pos))//same Square
				return false;
				
			return true;
		} else {
			return false;
		}
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
		this.setMsg('Numeros aleatorios iniciales...');
		if(this.howManyItems > 20) {
			// alert('No quedan mas posiciones aleatorias');
			return;
		}
		for (var i=0; i<27;) {
			var numArb = this.getRandomInt(1,10);
			var position = this.getRandPosition();
			if(this.asignUniqNumber(numArb, position)) {
				this.putNumberW(numArb, position.x, position.y);
				i++;
			}
		}
	};
	this.searchValidBoard = async function() {
		this.resetButton = false;
		var veces = 1;
		while(veces < 10000) {
			this.randomFilledTable();
			await sleep(200);
			var flow = 1;
			while(flow < 100) {
				this.resolve();
				flow++;
			}
			if(this.howManyItems < 81) {
				this.setMsg('Prueba '+veces+' no es sudoku valido');
				await sleep(500);
				this.resetAll();
			} else {
				this.setMsg('Un tablero fue encontrado en intento '+veces+'!');
				veces = 10000;
			}
			if(this.resetButton) {
				veces = 10000;
				this.resetButton = false;
			}
			veces++;
		}
	};
	this.resolveBoard = function() {
		this.setMsg('100 Ciclos para solucion...');
		var veces = 1;
		while(veces < 100) {
			this.resolve();
			veces++;
			this.setMsg(100-veces+' Ciclos para solucion...');
		}
		if(this.howManyItems < 81) {
			alert('No pudo resolver sudoku mediante Backtrack');
			this.setMsg('No pudo resolver');
		} else  {
			this.setMsg('Sudoku fue resuelto');
		}
		
		
	};
	this.resolve = function() {
		var solutions = [];
		var countSolutions = 81 - this.howManyItems;
		for (var i=0;i<countSolutions;i++) {
			solutions[i] = {};
		}
		var solInd = 0;
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				position = {'x':(i+1), 'y':(j+1)};
				if(this.boardTable[i+1][j+1] == 0) {
					solutions[solInd] = {'position': position, 'values': []};
					for(s=1;s<=9;s++) {
						if(this.testingUniqNumber(s, position)) {
							solutions[solInd].values.push(s);
						}
					}
					solInd++;
				}
			}
		}
		for(var i in solutions) {
			if(solutions[i].values.length == 1) {
				if(!this.asignUniqNumber(solutions[i].values[0], solutions[i].position)) {
					return false;
				} else {
					this.putNumberW(solutions[i].values[0], solutions[i].position.x, solutions[i].position.y);
					return true;
				}
			}
		}
		for(var i in solutions) {
			if(solutions[i].values.length == 2) {
				for(opt in solutions[i].values) {
					if(this.asignUniqNumber(opt, solutions[i].position)) {
						this.putNumberW(opt, solutions[i].position.x, solutions[i].position.y);
						if(!this.resolve())
							continue;
						else
							break;
					}
				}
			}
		}
		return false;
	};
	this.staticFilledTable = function() {
		this.setMsg('Sudoku de periodico cargado');
		
		this.staticFilled = true;
		this.initBoard();
		this.putNumber(8,3,1);
		this.putNumber(3,1,2);
		this.putNumber(4,2,2);
		this.putNumber(2,3,2);
		this.putNumber(1,1,3);
		this.putNumber(9,2,3);
		this.putNumber(7,3,3);
		//Box2
		this.putNumber(2,4,1);
		this.putNumber(9,5,2);
		this.putNumber(8,6,2);
		//Box3
		this.putNumber(9,7,1);
		this.putNumber(3,9,1);
		this.putNumber(7,9,2);
		this.putNumber(4,9,3);
		//Box4
		this.putNumber(5,3,4);
		this.putNumber(2,1,6);
		//Box5
		this.putNumber(3,4,4);
		this.putNumber(1,5,4);
		this.putNumber(2,6,4);
		this.putNumber(7,5,6);
		this.putNumber(4,6,6);
		//Box6
		this.putNumber(4,7,4);
		this.putNumber(7,8,4);
		this.putNumber(9,9,4);
		this.putNumber(5,7,6);
		//Box7
		this.putNumber(2,2,7);
		this.putNumber(7,2,8);
		this.putNumber(8,1,9);
		//Box8
		this.putNumber(1,6,7);
		this.putNumber(6,6,8);
		this.putNumber(4,4,9);
		this.putNumber(3,5,9);
		//Box9
		this.putNumber(5,9,7);
		this.putNumber(8,7,8);
		this.putNumber(9,8,8);
		this.putNumber(1,9,8);
		this.putNumber(7,7,9);
		this.putNumber(6,9,9);
		return;
		
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
	this.setMsg = function(text) {
		document.getElementById('msg').innerHTML = text;
	};
}

function addEvent(obj, type, fn) {
	if (obj.addEventListener)
			obj.addEventListener(type, fn, false);
	else if (obj.attachEvent)
			obj.attachEvent('on' + type, function() { return fn.apply(obj, [window.event]);});
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var su = new Sudoku();

window.onload = function() {
	var canvas = document.getElementById('sudokuZone');
	paper.setup(canvas);
	var tool = new paper.Tool();
	tool.activate();
	
	su.drawGridLines(3, 3, 3, paper.view.bounds);
	su.drawGridLines(9, 9, 1, paper.view.bounds);
	
	su.initBoard();
	
	paper.view.draw();
	
	/*
	addEvent(document.getElementById('Init'), 'click', function() { su.randomFilledTable(); });
	addEvent(document.getElementById('Resolve'), 'click', function() { su.resolveBoard(); });
	addEvent(document.getElementById('Static'), 'click', function() { su.staticFilledTable(); });
	*/
	tool.onMouseDown = function(event) {
		if(su.staticFilled) {
			alert('No puede agregar numeros cuando se ha llenado estaticamente');
			return;
		}
		if(su.howManyItems == 81) {
			alert('Sudoku ya fue resuelto, muchas gracias (F5 para reiniciar)');
		} else {
			var pos = su.whichBox(event.point);
			var number = parseInt(prompt("Numero del 1 al 9:", ""));
			if(number > 0 && number < 10) {
				if(su.asignUniqNumber(number, pos)) {
					su.putNumberW(number, pos.x, pos.y);
				} else {
					alert('Esta repetido en fila, columna o bloque local');
				}
			} else {
				alert('No introdujo un numero valido');
			}
		}
	}
}
