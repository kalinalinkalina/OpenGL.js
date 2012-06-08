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
	/*matrix.getFromArray([S.x, U.x, -L.x, -eyeX,
			     S.y, U.y, -L.y, -eyeY,
			     S.z, U.z, -L.z, -eyeZ,
			     0  ,   0,    0,     1]);
	*/
	matrix.getFromArray([S.x, S.y, S.z, 0,
			     U.x, U.y, U.z, 0,
			     -L.x, -L.y, -L.z, 0,
			     0  ,   0,    0,     1]);
	
	glMultMatrix(matrix);
	//glTranslatef(-eyeX,-eyeY,-eyeZ);
}