var GL_MODELVIEW = 0; //stack is 32
var GL_PROJECTION = 1; //stack is 2
var GL_TEXTURE = 2; //stack is 2
var GL_COLOR = 4; //stack is 2

MatrixStackObject=function(){
	this.matrixStackIndex = [0,0,0,0];
	this.matrixStacks = [new Array(32), new Array(2), new Array(2), new Array(2)];
	this.matrixMode = 0;
	
	//init
	var IdentityMat4 = new Mat4();
	IdentityMat4.loadIdentity();
	console.log(IdentityMat4);
	for(var i = 0;i<4;i++)
		this.matrixStacks[i][0]=(IdentityMat4.clone());
	
	this.getActiveStack = function(){
		return this.matrixStacks[this.matrixMode];
	}
	
	this.getActiveIndex = function(){
		return this.matrixStackIndex[this.matrixMode];
	}

	this.increaseActiveIndex = function(){
		this.matrixStackIndex[this.matrixMode] += 1;
	}
	
	this.decreaseActiveIndex = function(){
		//Don't decrease if it's already at zero
		if (this.matrixStackIndex[this.matrixMode] == 0) return;
		this.matrixStackIndex[this.matrixMode] -= 1;
	}

	this.setActiveMatrix = function(matrix){
		this.getActiveStack()[this.getActiveIndex()] = matrix;
	}
	
	this.getActiveMatrix = function(){
		return this.getActiveStack()[this.getActiveIndex()];
	}
	
	this.getModelView = function(){
		return this.matrixStacks[0][this.matrixStackIndex[0]];
	}	
	
	this.getProjection = function(){
		return this.matrixStacks[1][this.matrixStackIndex[1]];
	}
	
	this.getTexture = function(){
		return this.matrixStacks[2][this.matrixStackIndex[2]];
	}
	
	this.getColor = function(){
		return this.matrixStacks[3][this.matrixStackIndex[3]];
	}
}

matrixStacks = new MatrixStackObject();

function glMatrixMode(mode){
	matrixStacks.matrixMode = mode;
}

function glPushMatrix(){
	var copyMatrix = matrixStacks.getActiveMatrix();
	matrixStacks.increaseActiveIndex();
	matrixStacks.setActiveMatrix(copyMatrix);
	//matrixStackIndex[matrixMode]++;
	//copyMatrix( matrixModeStack[matrixMode][MatrixStackIndex[matrixMode]-1],
	//	matrixModeStack[matrixMode][MatrixStackIndex[matrixMode]] );
}


function glPopMatrix(){
	matrixStacks.decreaseActiveIndex();
	//matrixStackIndex[matrixMode]--;
}

function glTranslatef(x,y,z){
	var matrix =new Mat4();
	matrix.getFromArray([1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1]);
	console.log(matrixStacks.getActiveMatrix());
	glMultMatrix(matrix);
	//matrixModeStack[matrixMode][matrixStackIndex[matrixMode]] = matrixProduct(matrixModeStack[matrixMode][matrixStackIndex[matrixMode]], matrix);
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

function glLoadIdentity(){
	matrixStacks.getActiveMatrix().loadIdentity();
}

function glLoadMatrix(m){
	matrixStacks.setActiveMatrix(m);
}

function glMultMatrix(m){
	var newMatrix = mat4Product(matrixStacks.getActiveMatrix(),m);
	matrixStacks.setActiveMatrix(newMatrix);
}