/**
 * By default, functions involve 4x4 matrices unless specified otherwise.
 * These "4x4 matrices" are represented as 16-element arrays
 */

/*Takes two 16-element "4x4 matrices" and returns a Mat4 object*/
function mat4Product(A, B){

	var result = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
	var resultMatrix = new Mat4();
	var arrayA = A.toArray();
	var arrayB = B.toArray();
	for(var k=0; k<=12; k+=4)
		for(var i=0; i<4; i++)
			for (var j=0, bCount=0; j<4; j++, bCount+=4)
				result[k+i] += arrayA[k+j%4] * arrayB[bCount+i%4];
	resultMatrix.getFromArray(result);
	return resultMatrix;
}

/*Multiplies a 4x4 matrix and a vector*/
function mat4VectProduct(A, b){
	var aArray = A.toArray();
	var bArray;
	var resultArray = [0,0,0,0];
	var result = new Vec4();
	if(b.dim==3)
		bArray = b.toVec4().toArray();
	else
		bArray = b.toArray();

	for(var i=0, k=0; i<4; i++, k+=4)
		for(var j=0; j<4; j++)
			resultArray[i] += aArray[k+j]*bArray[j];

	result.getFromArray(resultArray);
	return result;
}
/*Multiplies any-size matrix or vector by a scalar*/
function matrixScalarProduct(matrix, scalar){
	var resultMatrix;
	var mArray = matrix.toArray();
	var result = new Array(matrix.dim);
	for(i=0; i<mArray.length; i++)
		result[i] = mArray[i]*scalar;
	resultMatrix.getFromArray(result);
	return resultMatrix;
}

/*Changes the input vector or 3x3 matrix into a 4x4 matrix*/
function make4x4(matrix){
	if (matrix.dim==16)
		return matrix;

	//if it is a vector of [x,y,z]
	if (matrix.dim==3)
		return [1,0,0,matrix.x, 0,1,0,matrix.y, 0,0,1,matrix.z, 0,0,0,1];

	//if it is a vector of [x,y,z,w]
	if (matrix.dim==4)
		return [1,0,0,matrix.x, 0,1,0,matrix.y, 0,0,1,matrix.z, 0,0,0,matrix.w];

	//if it is a 3x3 matrix
	/*unused so far
	if(matrix.length==9){
		return [ matrix[0], matrix[1], 0, matrix[2],
			 matrix[3], matrix[4], 0, matrix[5],
			 0,         0,         1, 0,
			 matrix[6], matrix[7], 0, matrix[8] ];
	}
	*/
	else //if(matrix.length>16)
		return null;

}
/*unused function

function mat3Product(A, B){

	var result = [0,0,0, 0,0,0, 0,0,0, 0,0,0];
	for(var k=0; k<=6; k+=3)
		for(var i=0; i<3; i++)
			for (var j=0, bCount=0; j<3; j++, bCount+=3)
				result[k+i] += A[k+j%3] * B[bCount+i%3];

	return result;
}
*/

/*UNUSED Multiplies a 4x4 matrix and a vector
function matrixVectorProduct3x3(A, b){
	if(b.length==2)
		b = [b[0], b[1], 1];
	
	var result = [0,0,0];
	for(var i=0, k=0; i<3; i++, k+=3)
		for(var j=0; j<3; j++)
			result[i] += A[k+j]*b[j];
}
*/

/*NOTE: Assigning a boolean or string to a variable makes a copy of that value, while 
assigning an array or an object to a variable makes a reference to the value.
Also, splice() can be used to make a shallow copy*/

/*Makes a copy of a "matrix"*/
/*UNUSED use clone() instead
function copyMatrix(from, to){
	for(var i=0; i<from.length; i++)
		to[i] = from[i];
}
*/

/*Returns the transpose of the given 4x4 matrix*/
/* USE Mat4.transpose
function transposeMatrix(matrix){
	return [matrix[0], matrix[4], matrix[8], matrix[12],
		matrix[1], matrix[5], matrix[9], matrix[13],
		matrix[2], matrix[6], matrix[10], matrix[14],
		matrix[3], matrix[7], matrix[11], matrix[15]];
}
*/

/*Returns the transpose of the given 3x3 matrix*/
/*UNUSED SO FAR
function transposeMatrix3x3(matrix){
	return [matrix[0], matrix[3], matrix[6],
		matrix[1], matrix[4], matrix[7],
		matrix[2], matrix[5], matrix[8]];
}
*/

/*Returns the inverse of a 4x4 matrix*/
/* USE Mat4.inverse() instead
function inverse(m){
	var inv = new Array(16);

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
}
*/

/*Loads the 4x4 identity matrix into the specified location*/
/*UNUSED use Mat4.loadIdentity() instead
function loadIdentity(location){
	location = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
}*/