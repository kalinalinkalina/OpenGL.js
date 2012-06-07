var GL_POINTS=                         0x0000;
var GL_LINES=                          0x0001;
var GL_LINE_LOOP=                      0x0002;
var GL_LINE_STRIP=                     0x0003;
var GL_TRIANGLES=                      0x0004;
var GL_TRIANGLE_STRIP=                 0x0005;
var GL_TRIANGLE_FAN=                   0x0006;
var GL_QUADS=                          0x0007;
var GL_QUAD_STRIP=                     0x0008;
var GL_POLYGON=                        0x0009;

function glBegin(mode){
	pipeline_state = mode;
	pipeline_index = [];
	pipeline_color =[];
	pipeline_indexCount = 0;
	pipeline_color_state =[1,0,0];
	pipeline_vertex = [];
}

function glEnd(){
	//Set up buffer and read coordinates
	vbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);					
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pipeline_vertex), gl.DYNAMIC_DRAW);

	//Setting uniforms and attributes
	gl.useProgram(program); 

	program.uColor = gl.getUniformLocation(program, "uColor");
	gl.uniform4fv(program.uColor, pipeline_color);

	program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
	gl.enableVertexAttribArray(program.aVertexPosition);
	gl.vertexAttribPointer(program.aVertexPosition, dimension, gl.FLOAT, false, 0, 0);

	//Drawing
	switch(pipeline_state){
		case GL_POINTS:
			gl.drawArrays(gl.POINTS, 0, pipeline_indexCount);
		break;
		case GL_LINES:
			gl.drawArrays(gl.LINES, 0, pipeline_indexCount);
		break;
		case GL_LINE_LOOP:
			gl.drawArrays(gl.LINE_LOOP, 0, pipeline_indexCount);
		break;
		case GL_LINE_STRIP:
			gl.drawArrays(gl.LINE_STRIP, 0, pipeline_indexCount);
		break;
		case GL_TRIANGLES:
			gl.drawArrays(gl.TRIANGLES, 0, pipeline_indexCount);
		break;
		case GL_TRIANGLE_STRIP:
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, pipeline_indexCount);
		break;
		case GL_TRIANGLE_FAN:
			gl.drawArrays(gl.TRIANGLE_FAN, 0, pipeline_indexCount);
		break;
	}
}

function glVertex3f(x,y,z){
	var inVec4 = new Vec4();
	inVec4.getFromArray([x,y,z,1]);
	var outVec4 = mat4VectProduct(matrixStacks.getActiveMatrix(),inVec4);
	//document.write(outVec4.x+" "+outVec4.y+" "+outVec4.z+" "+outVec4.w+" ");
	pipeline_vertex.unshift(outVec4.x,outVec4.y,outVec4.z, outVec4.w);
	if(pipeline_color.length==0) //so, this only works for one color per shape. TODO
		pipeline_color.unshift(pipeline_color_state[0], pipeline_color_state[1], pipeline_color_state[2], 1);
	pipeline_indexCount += 1;
}