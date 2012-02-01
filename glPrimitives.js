function glBegin(model_as_string)
{
	switch(model_as_string)
	{
	case "GL_POINTS":
		model = $W.GL.POINTS;
		break;
	case "GL_LINES":
		model = $W.GL.LINES;
		break;
	case "GL_LINE_STRIP":
		model = $W.GL.LINE_STRIP;
		break;
	case "GL_LINE_LOOP":
		model = $W.GL.LINE_LOOP;
		break;
	case "GL_TRIANGLES":
		model = $W.GL.TRIANGLES;
		break;
	case "GL_TRIANGLE_STRIP":
		model = $W.GL.TRIANGLE_STRIP;
		break;
	case "GL_TRIANGLE_FAN":
		model = $W.GL.TRIANGLE_FAN;
		break;
	case "GL_QUADS":
		break;
	case "GL_QUAD_STRIP":
		break;
	case "GL_POLYGON":
		break;
	} 
	$W.pipeline_state = model;
	$W.pipeline_index = [];
	$W.pipeline_color =[];
	$W.pipeline_indexCount = 0;
	$W.pipeline_color_state =[1,0,0];
	$W.pipeline_vertex = [];
}


function glEnd()
{
	 DATA = [];
	 vertex_data = [];
	 vertex_data.push("vertex");
	 vertex_data.push($W.pipeline_vertex);

	 color_data = [];
	 color_data.push("color");
	 color_data.push($W.pipeline_color);

	 index_data = [];
	 index_data.push('wglu_elements');
	 index_data.push($W.pipeline_index);

	 DATA.push(vertex_data,color_data,index_data);
	 $W.createObject({type:$W.pipeline_state, data:DATA});
}


function glEdgeFlag(flag){

}

function glEdgeFlagv(flag){

}

function glPolygonOffset(factor, units){

}

function glRect(x1,y1,x2,y2){

}

function glRectv(v1,v2){

}

function glVertex2(x,y){

}

function glVertex3(x,y,z)	
{
	$W.pipeline_vertex.push(x,y,z);
	$W.pipeline_color.push($W.pipeline_color_state);
	if($W.pipeline_state== $W.GL.TRIANGLES)
	{
		$W.pipeline_index.push($W.pipeline_indexCount);
		$W.pipeline_indexCount += 1;
	}
}

function glVertex4(x,y,z,w){

}