var GL_MODELVIEW = 0;
var GL_PROJECTION = 1;
var GL_TEXTURE = 2;
var GL_COLOR = 4;

function glMatrixMode(mode)
{
	$W.matrixMode = mode;
}

function glTranslatef(x,y,z) //not working
{
	var vector = [x,y,z];
	if (Boolean($W.matrixMode))
		$W.perspective.translate(vector);
	else
		$W.modelview.translate(vector);
}

function glRotate(angle,x,y,z){

}

function glScale(x,y,z){

}

function glDepthRange(near,far){

}

function glFrustum(left,right,bottom,top,near,far){

}

function glLoadIdentity(){

}

function glLoadMatrix(m){

}

function glMatrixMode(mode){

}

function glMultMatrix(m){

}

function glOrtho(left,right,bottom,top,near,far){

}

function glPopMatrix(){

}

function glPushMatrix(){

}

function glViewport(x,y,width,height){

}