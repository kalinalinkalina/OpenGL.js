/** Display mode bit masks */
var GLUT_RGB = 0;
var GLUT_RGBA = GLUT_RGB;
var GLUT_INDEX = 1;
var GLUT_SINGLE = 0;
var GLUT_DOUBLE = 2;
var GLUT_ACCUM = 4;
var GLUT_ALPHA = 8;
var GLUT_DEPTH = 16;
var GLUT_STENCIL = 32;
var GLUT_MULTISAMPLE = 128;
var GLUT_STEREO = 256;
var GLUT_LUMINANCE = 512; 

/** GLUT inter-file variables */
__glutDisplayMode = GLUT_RGB | GLUT_SINGLE | GLUT_DEPTH; 


/** OpenGL functions */
glutInitDisplayMode = function(mode) {
	__glutDisplayMode = mode; //This doesnt do anything yet.
}

glutDisplayFunc = function(callback) {
	callback();
}

glClearColor = function (red, green, blue, alpha){
	$W.GL.clearColor(red, green, blue, alpha);
}

gluLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
	$W.camera.setPosition(eyeX, eyeY, eyeZ);
	$W.camera.setTarget(centerX, centerY, centerZ);
	$W.camera.up = $V([upX, upY, upZ]);
}