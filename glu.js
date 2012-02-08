gluLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
	$W.camera.setPosition(eyeX, eyeY, eyeZ);
	$W.camera.setTarget(centerX, centerY, centerZ);
	$W.camera.up = $V([upX, upY, upZ]);
}