var angle = 90;
function setup() {
	createCanvas(1800,900);
}

function draw() {
	background(0);
	translate(width/2, height/2);
	strokeWeight(1);
	var lenght = 400;
	var flag = true;
	for(var i=0; i<280; i+=10) {
		if(flag)
			stroke(255);
		else
			stroke('yellow');
		push();
		rotate(radians(i)*cos(radians(angle)));
		line(200*sin(radians(angle)),0,0,200);
		pop();
		flag = !flag;
	}
	angle++;
}