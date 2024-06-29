const VERTEX_SOURCE = [
  '#version 100',
  'precision mediump float;',
  'attribute vec3 aPosition;',

  'void main(void) {',
    'gl_Position = vec4(aPosition, 1.0);',
  '}',
].join('\n');

const FRAGMENT_SOURCE = [
  '#version 100',
  'precision mediump float;',
  
  'uniform vec2 resolution;',
  'uniform float time;',
  
  'const int MaxIter = 100;',
  'const float MaxZ = 16.0;',

  'void main(void) {',
    'vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);',
    'vec2 c=vec2(sin(time * 0.1) + cos(time * 0.23), cos(time * 0.13) + sin(time * 0.21))*0.5;',
    'vec2 z = uv;',
    'int cIter=MaxIter;',
    'for (int iter=0; iter<MaxIter; iter++) {',
      'if (dot(z, z)>=MaxZ) { cIter=iter; break; }',
      'vec2 z2=vec2(z.x * z.x - z.y * z.y, 2. * z.x * z.y);',
      'z = z2 + c;',
    '}',
    
    'if (cIter>=MaxIter) {',
      'gl_FragColor = vec4(1., 1., 0., 1.);',
    '} else {',
      'gl_FragColor = vec4(0., .3, .4, 1.) * (float(cIter) / 10.);',
    '}',
  '}',
].join('\n');


function setup() {
	createCanvas(1500,700, WEBGL);
	noStroke();
	background(0);
  
	shaderProg = createShader(VERTEX_SOURCE, FRAGMENT_SOURCE);
}

function draw() {
	shader(shaderProg);
  
	shaderProg.setUniform("resolution", [width, height]);
	shaderProg.setUniform('time', millis() / 1000.0);
  
	quad(-1, -1, 1, -1, 1, 1, -1, 1);
}