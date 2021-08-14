var angle = 90;
function setup() {
	createCanvas(1800,900);
}

function draw() {
	background(0);
	translate(width/2, height/2);
	stroke(255);
	strokeWeight(3);
	var lenght = 400;
	for(var i=0; i<280; i+=10) {
		push();
		rotate(radians(i)*
				cos(radians(angle)));
		line(length*sin(radians(angle)),0,0,200);
		pop();
	}
	angle++;
}