//enum 
var GL_MODELVIEW = 0; 
var GL_PROJECTION = 1;
var GL_TEXTURE = 2;
var GL_COLOR = 3;

//Object to contain state information of the four main matrix stacks in OpenGL
$W.MatrixStackObject=function()
{
	
	this.matrixStackIndex = [0,0,0,0];//each stack has its own corresponding index
	this.matrixStacks = [new Array(), new Array(), new Array(), new Array()];
	this.matrixMode = 0;//intialize to model_view

	//initialize the first matrix  of each stack to the identity
	console.log(IdentityMat4);
	for(var i = 0;i<4;i++)
	{
		var IdentityMat4 = new Mat4();
		IdentityMat4.loadIdentity();
		this.matrixStacks[i].push(IdentityMat4);
	}

	//Returns the matrix stack that is currently being modified
	this.getActiveStack = function()
	{
		return this.matrixStacks[this.matrixMode];
	}
	//Returns the current index for the active stack
	this.getActiveIndex = function()
	{
		return this.matrixStackIndex[this.matrixMode];
	}

	//Increases the size of the active stack
	this.pushMatrix = function()
	{
		this.getActiveStack().push(this.getActiveMatrix().clone());
		this.matrixStackIndex[this.matrixMode] += 1;		

	}
	//Reduces the size of the active stack
	this.popMatrix = function()
	{
		//Don't decrease if it's already at zero
		if (this.matrixStackIndex[this.matrixMode] == 0) return;
		this.matrixStackIndex[this.matrixMode] -= 1;
		this.getActiveStack().pop();
	}

	//Sets the argument as the matrix in the current index of the active matrix stack
	this.setActiveMatrix = function(matrix)
	{
		this.getActiveStack()[this.getActiveIndex()] = matrix;
	}
	//Returns the matrix in the current index of the active matrix stack
	this.getActiveMatrix = function()
	{
		return this.getActiveStack()[this.getActiveIndex()];
	}

	//The following functions return the the matrix from the corresponding current index for each matrix stack
	this.getModelView = function()
	{
		return this.matrixStacks[0][this.matrixStackIndex[0]];
	}	
	this.getProjection = function()
	{
		return this.matrixStacks[1][this.matrixStackIndex[1]];
	}
	this.getTexture = function()
	{
		return this.matrixStacks[2][this.matrixStackIndex[2]];
	}
	this.getColor = function()
	{
		return this.matrixStacks[3][this.matrixStackIndex[3]];
	}
}

//Initialize the matrix stacks in the main $W object
$W.matrixStacks = new $W.MatrixStackObject();


//The following functions are pretty straightforward.
//The OpenGL function calls here are mostly just wrappers around function calls that will specifically modify the main matrixStacks object in $W.
//There should, in fact, only ever need to be one instance of MatrixStackObject.

function glMatrixMode(mode)
{
	$W.matrixStacks.matrixMode = mode;
}

function glPushMatrix(){
	$W.matrixStacks.pushMatrix();
}


function glPopMatrix(){
	$W.matrixStacks.popMatrix();
}

function glLoadIdentity(){
	$W.matrixStacks.getActiveMatrix().loadIdentity();
}

function glLoadMatrix(m){
	$W.matrixStacks.setActiveMatrix(m);
}

function glMultMatrix(m){
	var newMatrix = mat4Product($W.matrixStacks.getActiveMatrix(),m);
	$W.matrixStacks.setActiveMatrix(newMatrix);
}

function glTranslatef(x,y,z)
{
	var matrix =new Mat4();
	matrix.getFromArray([1,0,0,x, 
			     0,1,0,y, 
			     0,0,1,z, 
			     0,0,0,1]);
	console.log($W.matrixStacks.getActiveMatrix());
	glMultMatrix(matrix);
}

function glRotatef(angle,x,y,z){
	var axis = new Vec3();
	axis.getFromArray([x,y,z]);
	axis.normalize();
	var rtMatrix = new Mat4();
	var degree = angle*Math.PI/180;
	var c = Math.cos(degree);
	var ac = 1 - c;
	var s = Math.sin(degree);

	rtMatrix.m00 = axis.x * axis.x * ac + c;
	rtMatrix.m01 = axis.x * axis.y * ac - axis.z * s;
	rtMatrix.m02 = axis.x * axis.z * ac + axis.y * s;
	rtMatrix.m03 = 0;

	rtMatrix.m10 = axis.y * axis.x * ac + axis.z * s;
	rtMatrix.m11 = axis.y * axis.y * ac + c;
	rtMatrix.m12 = axis.y * axis.z * ac - axis.x * s;
	rtMatrix.m13 = 0;

	rtMatrix.m20 = axis.z * axis.x * ac - axis.y * s;
	rtMatrix.m21 = axis.z * axis.y * ac + axis.x * s;
	rtMatrix.m22 = axis.z * axis.z * ac + c;
	rtMatrix.m23 = 0;

	rtMatrix.m30 = 0;
	rtMatrix.m31 = 0;
	rtMatrix.m32 = 0;
	rtMatrix.m33 = 1;		

	glMultMatrix(rtMatrix);
}

function glScalef(x,y,z){
	var scaleMatrix = new Mat4();
	scaleMatrix.getFromArray([x,0,0,0,
				  0,y,0,0,
				  0,0,z,0,
				  0,0,0,1]);
	glMultMatrix(scaleMatrix);
}

function glFrustum(left,right,bottom,top,near,far){
	var oneone = (2*near)/(right - left);
	var twotwo = (2*near)/(top - bottom);
	var A = (right + left)/(right-left);
	var B = (top + bottom)/(top - bottom);
	var C = (far + near)/(far - near);
	var D = (2*far*near)/(far - near);

	var matrix = new Mat4();
	matrix.getFromArray([oneone,  	  0, A, 0,
			     0	   , twotwo, B, 0,
			     0	   , 	  0, C, D,
			     0	   ,      0,-1, 0]);
	glMultMatrix(matrix);
}

function glOrtho(left,right,bottom,top,near,far){
	var oneone = 2 / (right - left);
	var twotwo = 2 / (top - bottom);
	var threethree = -2 / (far - near);
	var tx = (right + left)/(right - left);
	var ty = (top + bottom)/(top - bottom);
	var tz = (far + near)/(far - near);

	var matrix = new Mat4();
	matrix.getFromArray([oneone, 0     , 0	       , tx,
			     0	   , twotwo, 0	       , ty,
			     0	   ,	  0, threethree, tz,
			     0	   ,	  0, 	       ,  1]);
	glMultMatrix(matrix);
}

function gluLookAt(eyeX,eyeY,eyeZ, centerX,centerY,centerZ, upX,upY,upZ){
	var L = new Vec3();//L = center - eye
	L.x = centerX - eyeX;
	L.y = centerY + eyeY;
	L.z = centerZ - eyeZ;
	L.normalize();

	var S = new Vec3();//S = L x up
	S.x = (L.y * upZ) - (L.z * upY);
	S.y = (L.z * upX) - (L.x * upZ);
	S.z = (L.x * upY) - (L.y * upX);
	S.normalize();

	var U = new Vec3();//U = S x L
	U.x = (S.y * L.z) - (S.z * L.y);
	U.y = (S.z * L.x) - (S.x * L.z);
	U.z = (S.x * L.y) - (S.y * L.x);

	var matrix = new Mat4();
	matrix.getFromArray([S.x, U.x, -L.x, -eyeX,
			     S.y, U.y, -L.y, -eyeY,
			     S.z, U.z, -L.z, -eyeZ,
			     0  ,   0,    0,     1]);
	glMultMatrix(matrix);
}

function glViewport(x,y,width,height){

}
function glDepthRange(near,far){

}