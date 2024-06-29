const VERTEX_SOURCE = [
  '#version 100',
  'precision mediump float;',
  'attribute vec3 aPosition;',

  'void main(void) {',
    'gl_Position = vec4(aPosition, 1.0);',
  '}',
].join('\n');