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
Mode = GLUT_RGB | GLUT_SINGLE | GLUT_DEPTH; 

/** OpenGL functions */
glutInitDisplayMode = function(mode) {
	__glutDisplayMode = mode; //This doesnt do anything yet.
}

glutDisplayFunc = function(callback) {
	callback();
}

function glutInitWindowSize(width, height){
	document.getElementById("canvas").style.width=width;
	document.getElementById("canvas").style.height=height; 
}

function glutInit(){
	//Get the WebGL context from the canvas element
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("experimental-webgl");
	
	//Defining the viewport and setting default color
	gl.viewport(0,0,canvas.width, canvas.height);
	
	//Compiling and linking shaders
	var v = document.getElementById("vertex").firstChild.nodeValue;
	var f = document.getElementById("fragment").firstChild.nodeValue;
	var vs = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vs, v);
	gl.compileShader(vs);
	var fs = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fs, f);
	gl.compileShader(fs);
	program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	//Debugging shaders
	if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) 
		console.log(gl.getShaderInfoLog(vs));
					
	if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) 
		console.log(gl.getShaderInfoLog(fs));
				
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
		console.log(gl.getProgramInfoLog(program));
	
	var aspect = canvas.width / canvas.height;
	dimension = 4;
}

function glutSwapBuffers(){
	//this happens automatically with WebGL, so function not needed!
}

function glutTimerFunc(msecs, func, value){
	setTimeout(function() {func(value);},msecs);
}

function glutPostRedisplay(){
	//this is wrong but works for now
	render();
}