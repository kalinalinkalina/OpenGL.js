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

var GL_POINTS=                         0x0000;
var GL_LINES=                          0x0001;
var GL_LINE_LOOP=                      0x0002;
var GL_LINE_STRIP=                     0x0003;
var GL_TRIANGLES=                      0x0004;
var GL_TRIANGLE_STRIP=                 0x0005;
var GL_TRIANGLE_FAN=                   0x0006;
var GL_QUADS=                          0x0007;
var GL_QUAD_STRIP=                     0x0008;
var GL_POLYGON=                        0x0009;

/** GLUT inter-file variables */
__glutDisplayMode = GLUT_RGB | GLUT_SINGLE | GLUT_DEPTH; 
function glBegin(model)
{
	$W.pipeline_state = model;
	$W.pipeline_index = [];
	$W.pipeline_color =[];
	$W.pipeline_indexCount = 0;
	$W.pipeline_color_state =[1,0,0];
	$W.pipeline_vertex = [];
}
function glColor3f(r,g,b)
{
	$W.pipeline_color_state =[r,g,b];
}
function glVertex3f(x,y,z)	
{
	var inVec4 = new Vec4();
	inVec4.getFromArray([x,y,z,1]);
	var outVec4 = mat4VectProduct($W.matrixStacks.getActiveMatrix(),inVec4);
	$W.pipeline_vertex.unshift(outVec4.x,outVec4.y,outVec4.z);
	$W.pipeline_color.unshift($W.pipeline_color_state);
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
function glutSolidCube(width)
{

}
/** OpenGL functions */
glutInitDisplayMode = function(mode) {
	__glutDisplayMode = mode; //This doesnt do anything yet.
}

glutDisplayFunc = function(callback) {
	callback();
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