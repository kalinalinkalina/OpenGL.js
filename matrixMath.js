/*Takes two 16-element "4x4 matrices" and returns a 16-element product*/
function matrixProduct(A, B){

	var result = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
	for(var k=0; k<=12; k+=4)
		for(var i=0; i<4; i++)
			for (var j=0, bCount=0; j<4; j++, bCount+=4)
				result[k+i] += A[k+j%4] * B[bCount+i%4];

	return result;
}

/*Multiplies any-size matrix or vector by a scalar*/
matrixScalarProduct(matrix, scalar){
	var result = new Array(matrix.length);
	for(i=0; i<matrix.length; i++)
		result[i] = matrix[i]*scalar;
}

/*NOTE: Assigning a boolean or string to a variable makes a copy of that value, while 
assigning an array or an object to a variable makes a reference to the value.
Also, splice() can be used to make a shallow copy*/

/*Makes a deep copy of a 16-element "matrix"*/
function copyMatrix(from, to){
	for(var i=0; i<from.length; i++)
		to[i] = from[i];
}

/*Transposes the given matrix*/
function transposeMatrix(matrix){
	return [matrix[0], matrix[4], matrix[8], matrix[12],
		matrix[1], matrix[5], matrix[9], matrix[13],
		matrix[2], matrix[6], matrix[10], matrix[14],
		matrix[3], matrix[7], matrix[11], matrix[15]];
}


/*Returns the inverse of a 4x4 matrix*/
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

/*Loads a 4x4 identity matrix*/
function loadIdentity(location){
	location = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
}

/*Changes the input vector or 3x3 matrix into a 4x4 matrix*/
function make4x4(matrix){
	if (matrix.length==16)
		return matrix;

	//if it is a vector of [x,y,z]
	if (matrix.length==3)
		return [1,0,0,matrix[0], 0,1,0,matrix[1], 0,0,1,matrix[2], 0,0,0,1];

	//if it is a vector of [x,y,z,w]
	if (matrix.length==4)
		return [1,0,0,matrix[0], 0,1,0,matrix[1], 0,0,1,matrix[2], 0,0,0,matrix[3]];

	//if it is a 3x3 matrix
	if(matrix.length==9){
		return [ matrix[0], matrix[1], 0, matrix[2],
			 matrix[3], matrix[4], 0, matrix[5],
			 0,         0,         1, 0,
			 matrix[6], matrix[7], 0, matrix[8] ];
	}

	else //if(matrix.length>16)
		return null;
}

//to use for scale
function makeDiagonal(vector){
	if(vector.lenth==4){
		var M = new Array(16);
		loadIdentity(M);

		M[0] = vector[0];
		M[5] = vector[1];
		M[10] = vector[2];
		M[15] = vector[3];

		return M;
	}
	else return null;
}
