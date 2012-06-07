/* Values for glClear */
var GL_DEPTH_BUFFER_BIT = 256 //0x00000100
//var GL_ACCUM_BUFFER_BIT = 0x00000200
var GL_STENCIL_BUFFER_BIT = 1024 //0x00000400
var GL_COLOR_BUFFER_BIT = 16384 //0x00004000


function glClear(mask){
	gl.clear(mask); 
	//This will do for now... However, WebGL's clear only does COLOR, DEPTH, and STENCIL, but not ACCUM
}

function glClearColor(r, g, b, a){
	gl.clearColor(r,g,b,a);
}