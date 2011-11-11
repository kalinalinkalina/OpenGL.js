/* The following code contains glBegin, glEnd, glVertex3f, 
 * glutDisplayFunc, glutInitWindowSize, glutInit.
 * This is a first time implement and the inside of the function will probably be changed
 * later. To see how to use them, please take a look at demo.html.
 */
function glBegin(model)
{
	$W.pipeline_state = model;
	$W.pipeline_index = [];
	$W.pipeline_color =[];
	$W.pipeline_indexCount = 0;
	$W.pipeline_color_state =[1,0,0];
	$W.pipeline_vertex = [];
}
function glVertex3f(x,y,z)	
{
	$W.pipeline_vertex.push(x,y,z);
	$W.pipeline_color.push($W.pipeline_color_state);
	if($W.pipeline_state== $W.GL.TRIANGLES)
	{
		$W.pipeline_index.push($W.pipeline_indexCount);
		$W.pipeline_indexCount += 1;
	}
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
function glutDisplayFunc(func)
{
	func();
}
function glutInitWindowSize(width, height)
{
	document.getElementById("canvas").style.width=width;
	document.getElementById("canvas").style.height=height; 
}
function glutInit()
{
	if (!$W.initialize()) 
	{return false;}
	return true;	
}
function  glutDisplayFunc(func)
{
	func();
}