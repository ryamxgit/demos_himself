
function setup() {
	createCanvas(1800,900, WEBGL);
	noStroke();
	background(0);
  
	shaderProg = createShader("vertex_file.js", "segment_file.js");
}

function draw() {
	shader(shaderProg);
  
	shaderProg.setUniform("resolution", [width, height]);
	shaderProg.setUniform('time', millis() / 1000.0);
  
	quad(-1, -1, 1, -1, 1, 1, -1, 1);
}