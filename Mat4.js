Array.prototype.clone=function(){
    return this.slice(0);
}
function Mat4()
{
	this.m00;this.m01;this.m02;this.m03;
	this.m10;this.m11;this.m12;this.m13;
	this.m20;this.m21;this.m22;this.m23;
	this.m30;this.m31;this.m32;this.m33;

	this.dim = 16;
}
Mat4.prototype.getFromArray = function(array)
{
	this.m00 = array[0];this.m01 = array[1];this.m02 = array[2];this.m03 = array[3];
	this.m10 = array[4];this.m11 = array[5];this.m12 = array[6];this.m13 = array[7];
	this.m20 = array[8];this.m21 = array[9];this.m22 = array[10];this.m23 = array[11];
	this.m30 = array[12];this.m31 = array[13];this.m32 = array[14];this.m33 = array[15];
}
Mat4.prototype.toArray = function()
{
	var array = new Array(16);
	array =[this.m00,this.m01,this.m02,this.m03,
		this.m10,this.m11,this.m12,this.m13,
		this.m20,this.m21,this.m22,this.m23,
		this.m30,this.m31,this.m32,this.m33];
	return array;
}
Mat4.prototype.clone = function()
{
	var newMat = new Mat4();
	newMat.getFromArray(this.toArray().clone());
	return newMat;
}
Mat4.prototype.loadIdentity = function(){
	this.m00 = 1;this.m01 = 0;this.m02 = 0;this.m03 = 0;
	this.m10 = 0;this.m11 = 1;this.m12 = 0;this.m13 = 0;
	this.m20 = 0;this.m21 = 0;this.m22 = 1;this.m23 = 0;
	this.m30 = 0;this.m31 = 0;this.m32 = 0;this.m33 = 1;
}
Mat4.prototype.tranpose = function(){
		var matrix = this.toArray();
		var nArray = [matrix[0], matrix[4], matrix[8], matrix[12],
		matrix[1], matrix[5], matrix[9], matrix[13],
		matrix[2], matrix[6], matrix[10], matrix[14],
		matrix[3], matrix[7], matrix[11], matrix[15]];
		var resultMat4 = new Mat4();
		resultMat4.getFromArray(nArray);
		return resultMat4;
}
Mat4.prototype.inverse = function(){
	var inv = new Array(16);
	var m =this.toArray();
	inv[0] =   m[5]*m[10]*m[15] - m[5]*m[11]*m[14] - m[9]*m[6]*m[15]
		+ m[9]*m[7]*m[14] + m[13]*m[6]*m[11] - m[13]*m[7]*m[10];
	inv[4] =  -m[4]*m[10]*m[15] + m[4]*m[11]*m[14] + m[8]*m[6]*m[15]
		- m[8]*m[7]*m[14] - m[12]*m[6]*m[11] + m[12]*m[7]*m[10];
	inv[8] =   m[4]*m[9]*m[15] - m[4]*m[11]*m[13] - m[8]*m[5]*m[15]
		+ m[8]*m[7]*m[13] + m[12]*m[5]*m[11] - m[12]*m[7]*m[9];
	inv[12] = -m[4]*m[9]*m[14] + m[4]*m[10]*m[13] + m[8]*m[5]*m[14]
		- m[8]*m[6]*m[13] - m[12]*m[5]*m[10] + m[12]*m[6]*m[9];
	inv[1] =  -m[1]*m[10]*m[15] + m[1]*m[11]*m[14] + m[9]*m[2]*m[15]
		- m[9]*m[3]*m[14] - m[13]*m[2]*m[11] + m[13]*m[3]*m[10];
	inv[5] =   m[0]*m[10]*m[15] - m[0]*m[11]*m[14] - m[8]*m[2]*m[15]
		+ m[8]*m[3]*m[14] + m[12]*m[2]*m[11] - m[12]*m[3]*m[10];
	inv[9] =  -m[0]*m[9]*m[15] + m[0]*m[11]*m[13] + m[8]*m[1]*m[15]
		- m[8]*m[3]*m[13] - m[12]*m[1]*m[11] + m[12]*m[3]*m[9];
	inv[13] =  m[0]*m[9]*m[14] - m[0]*m[10]*m[13] - m[8]*m[1]*m[14]
		+ m[8]*m[2]*m[13] + m[12]*m[1]*m[10] - m[12]*m[2]*m[9];
	inv[2] =   m[1]*m[6]*m[15] - m[1]*m[7]*m[14] - m[5]*m[2]*m[15]
		+ m[5]*m[3]*m[14] + m[13]*m[2]*m[7] - m[13]*m[3]*m[6];
	inv[6] =  -m[0]*m[6]*m[15] + m[0]*m[7]*m[14] + m[4]*m[2]*m[15]
		- m[4]*m[3]*m[14] - m[12]*m[2]*m[7] + m[12]*m[3]*m[6];
	inv[10] =  m[0]*m[5]*m[15] - m[0]*m[7]*m[13] - m[4]*m[1]*m[15]
		+ m[4]*m[3]*m[13] + m[12]*m[1]*m[7] - m[12]*m[3]*m[5];
	inv[14] = -m[0]*m[5]*m[14] + m[0]*m[6]*m[13] + m[4]*m[1]*m[14]
		- m[4]*m[2]*m[13] - m[12]*m[1]*m[6] + m[12]*m[2]*m[5];
	inv[3] =  -m[1]*m[6]*m[11] + m[1]*m[7]*m[10] + m[5]*m[2]*m[11]
		- m[5]*m[3]*m[10] - m[9]*m[2]*m[7] + m[9]*m[3]*m[6];
	inv[7] =   m[0]*m[6]*m[11] - m[0]*m[7]*m[10] - m[4]*m[2]*m[11]
		+ m[4]*m[3]*m[10] + m[8]*m[2]*m[7] - m[8]*m[3]*m[6];
	inv[11] = -m[0]*m[5]*m[11] + m[0]*m[7]*m[9] + m[4]*m[1]*m[11]
		- m[4]*m[3]*m[9] - m[8]*m[1]*m[7] + m[8]*m[3]*m[5];
	inv[15] =  m[0]*m[5]*m[10] - m[0]*m[6]*m[9] - m[4]*m[1]*m[10]
		+ m[4]*m[2]*m[9] + m[8]*m[1]*m[6] - m[8]*m[2]*m[5];

	var det = m[0]*inv[0] + m[1]*inv[4] + m[2]*inv[8] + m[3]*inv[12];
	if (det == 0)
        	return null;

	det = 1.0 / det;

	var result = new Array(16);

	for (i = 0; i < 16; i++)
        	result[i] = inv[i] * det;
    var resultMatrix = new Mat4();
    resultMatrix.getFromArray(result);
    return resultMatrix;
}