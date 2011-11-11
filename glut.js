/* The following code contains glutInitDisplayMode, glutDisplayFunc, glClearColor,
 * gluLookAt, glBegin, glEnd, glVertex3f, glutInitWindowSize, glutInit.
 * This is a first time implement and the inside of the function will probably be changed
 * later. To see how to use them, please take a look at demo.html.
 */


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

function glutInitWindowSize(width, height)
{
	document.getElementById("canvas").style.width=width;
	document.getElementById("canvas").style.height=height; 
}

function glutInit()
{
	if (!$W.initialize()) 
	{return false;}
	return true;	
}

function glBegin(model)
{
	$W.pipeline_state = model;
	$W.pipeline_index = [];
	$W.pipeline_color =[];
	$W.pipeline_indexCount = 0;
	$W.pipeline_color_state =[1,0,0];
	$W.pipeline_vertex = [];
}

function glVertex3f(x,y,z)	
{
	$W.pipeline_vertex.push(x,y,z);
	$W.pipeline_color.push($W.pipeline_color_state);
	if($W.pipeline_state== $W.GL.TRIANGLES)
	{
		$W.pipeline_index.push($W.pipeline_indexCount);
		$W.pipeline_indexCount += 1;
	}
}

function glEnd()
{
	 DATA = [];
	 vertex_data = [];
	 vertex_data.push("vertex");
	 vertex_data.push($W.pipeline_vertex);
	 
	 color_data = [];
	 color_data.push("color");
	 color_data.push($W.pipeline_color);
	 
	 index_data = [];
	 index_data.push('wglu_elements');
	 index_data.push($W.pipeline_index);
	
	 DATA.push(vertex_data,color_data,index_data);
	 $W.createObject({type:$W.pipeline_state, data:DATA});
}