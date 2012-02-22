var GL_MODELVIEW = 0; //stack is 32
var GL_PROJECTION = 1; //stack is 2
var GL_TEXTURE = 2; //stack is 2
var GL_COLOR = 4; //stack is 2

$W.MatrixStackObject=function()
{
	this.matrixStackIndex = [0,0,0,0];
	this.matrixStacks = [new Array(32), new Array(2), new Array(2), new Array(2)];
	this.matrixMode = 0;
	
	//init
	var IdentityMat4 = new Mat4();
	IdentityMat4.loadIdentity();
	console.log(IdentityMat4);
	for(var i = 0;i<4;i++)
		this.matrixStacks[i][0]=(IdentityMat4.clone());

	
	this.getActiveStack = function()
	{
		return this.matrixStacks[this.matrixMode];
	}
	this.getActiveIndex = function()
	{
		return this.matrixStackIndex[this.matrixMode];
	}


	this.increaseActiveIndex = function()
	{
		this.matrixStackIndex[this.matrixMode] += 1;
	}
	this.decreaseActiveIndex = function()
	{
		//Don't decrease if it's already at zero
		if (this.matrixStackIndex[this.matrixMode] == 0) return;
		this.matrixStackIndex[this.matrixMode] -= 1;
	}

	this.setActiveMatrix = function(matrix)
	{
		this.getActiveStack()[this.getActiveIndex()] = matrix;
	}
	this.getActiveMatrix = function()
	{
		return this.getActiveStack()[this.getActiveIndex()];
	}
}

$W.matrixStacks = new $W.MatrixStackObject();


function glMatrixMode(mode)
{
	$W.matrixStacks.matrixMode = mode;
}

function glTranslatef(x,y,z)
{
	var matrix =new Mat4();
	matrix.getFromArray([1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1]);
	console.log($W.matrixStacks.getActiveMatrix());
	var newMatrix = mat4Product($W.matrixStacks.getActiveMatrix(),matrix);
	$W.matrixStacks.setActiveMatrix(newMatrix);
	//$W.matrixModeStack[$W.matrixMode][$W.matrixStackIndex[$W.matrixMode]] = matrixProduct($W.matrixModeStack[$W.matrixMode][$W.matrixStackIndex[$W.matrixMode]], matrix);
}

function glPushMatrix(){
	var copyMatrix = $W.matrixStacks.getActiveMatrix();
	$W.matrixStacks.increaseActiveIndex();
	$W.matrixStacks.setActiveMatrix(copyMatrix);
	//$W.matrixStackIndex[$W.matrixMode]++;
	//copyMatrix( $W.matrixModeStack[$W.matrixMode][$W.MatrixStackIndex[$W.matrixMode]-1],
	//	$W.matrixModeStack[$W.matrixMode][$W.MatrixStackIndex[$W.matrixMode]] );
}


function glPopMatrix(){
	$W.matrixStacks.decreaseActiveIndex();
	//$W.matrixStackIndex[$W.matrixMode]--;
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
	var newMatrix = mat4Product($W.matrixStacks.getActiveMatrix(),rtMatrix);
	$W.matrixStacks.setActiveMatrix(newMatrix);
}

function glScalef(x,y,z){
	var scaleMatrix = new Mat4();
	scaleMatrix.m00 = x;
	scaleMatrix.m01 = 0;
	scaleMatrix.m02 = 0;
	scaleMatrix.m03 = 0;
		
	scaleMatrix.m10 = 0;
	scaleMatrix.m11 = y;
	scaleMatrix.m12 = 0;
	scaleMatrix.m13 = 0;
		
	scaleMatrix.m20 = 0;
	scaleMatrix.m21 = 0;
	scaleMatrix.m22 = z;
	scaleMatrix.m23 = 0;
		
	scaleMatrix.m30 = 0;
	scaleMatrix.m31 = 0;
	scaleMatrix.m32 = 0;
	scaleMatrix.m33 = 1;
	var newMatrix = mat4Product($W.matrixStacks.getActiveMatrix(),scaleMatrix);
	$W.matrixStacks.setActiveMatrix(newMatrix);
}

function glDepthRange(near,far){

}

function glFrustum(left,right,bottom,top,near,far){

}

function glLoadIdentity(){

}

function glLoadMatrix(m){

}

function glMultMatrix(m){

}

function glOrtho(left,right,bottom,top,near,far){

}

function glViewport(x,y,width,height){

}