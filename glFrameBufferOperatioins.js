var GL_COLOR_BUFFER_BIT = $W.GL.COLOR_BUFFER_BIT;
var GL_DEPTH_BUFFER_BIT = $W.GL.DEPTH_BUFFER_BIT;
var GL_ACCUM_BUFFER_BIT = 0; //doesnt exist in WebGL?
var GL_STENCIL_BUFFER_BIT = $W.GL.STENCIL_BUFFER_BIT;


glClearColor = function (red, green, blue, alpha){
	$W.GL.clearColor(red, green, blue, alpha);
}

function glClear(mask){
	$W.GL.clear(mask);
}

function glBlendFunc(sfactor, dfactor){
	$W.GL.blendFunc(sfactor, dfactor);
}

function glDepthFunc(func){
	$W.GL.depthFunc(func);
}

function glStencilFunc(func, ref, mask){
	$W.GL.stencilFunc(func, ref, mask);
}

function glAccum(op,value){

}

function glAlphaFunc(func, ref){

}

function glClearAccum(red,green,blue,alpha){

}

function glClearDepth(depth){

}

function glClearIndex(c){

}

function glClearStencil(s){

}

function glColorMask(red,green,blue,alpha){

}

function glDepthMask(flag){

}

function glDrawBuffer(mode){

}

function glIndexMask(mask){

}

function glLogicOp(opcode){

}

function glScissor(x,y,width,height){

}

function glStencilMask(mask){

}

function glStencilOp(fail,pass,zpass){

}