
function setup() {
	createCanvas(1800,900, WEBGL);
	noStroke();
	background(0);
  
	shaderProg = createShader("/p5_example/vertex_file.js", "/p5_example/segment_file.js");
}

function draw() {
	shader(shaderProg);
  
	shaderProg.setUniform("resolution", [width, height]);
	shaderProg.setUniform('time', millis() / 1000.0);
  
	quad(-1, -1, 1, -1, 1, 1, -1, 1);
}