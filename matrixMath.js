function matrixProduct(A, B){

	var result = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
	for(var k=0; k<=12; k+=4){
		for(var i=0; i<4; i++){
			for (var j=0, bCount=0; j<4; j++, bCount+=4){
				result[k+i] += A[k+j%4] * B[bCount+i%4];
			}
		}
	}

}




/*NOTE: assigning a boolean or string to a variable makes a copy of that value, while assigning an array or an object to a variable makes a reference to the value.*/
function copyMatrix(from, to){
	to = from.slice();
}

function ensure4x4(matrix){
	if (matrix.length==16)
		return matrix;

	if (matrix.length>16)
		return null;

	for(var i=0; i<matrix.length; i++){

	}
		
}

function loadIdentity(matrix){
	matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
}

