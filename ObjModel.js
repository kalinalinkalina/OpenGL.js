ObjModel = function (type) {

        $W.objects.push(this);
        $W.renderables.push(this);
        this.material = $W.materials['wglu_default'];
        this.buffers = [];

        /** Set the indices for the elements of this object.
         * Draws this object with drawElements
         * @param Array elements The array of indices of the elements
         */
        this.setElements = function(elements) {
            this._drawFunction = $W.renderer.drawElements;

            var elementAB = new $W.ArrayBuffer('wglu_internal_elements', elements);

            $W.GL.bindBuffer($W.GL.ELEMENT_ARRAY_BUFFER, elementAB.glBuffer);
            $W.GL.bufferData($W.GL.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray( elementAB.data), $W.GL.STATIC_DRAW);

            this.buffers.wglu_internal_elements = elementAB;
        };


        /** Fills the array of the given name, where name is a vertex attribute. 
         * Also creates a buffer to hold the data in WebGL.
         * @param {String} name The attribute variable name
         * @param {Array} contents The data to pass to the attribute.
         */
        this.fillArray = function OBJ_fillArray(name, data) {
            var res = [];
            if (data[0].length !== undefined) {
                for (var i = 0; i < data.length; i++) {
                    res = res.concat(data[i]);
                }
                }else { res = data; } //flattens the array
                
            this.buffers[name] = new $W.ArrayBuffer(name, res);
            this.buffers[name].buffer();
        };

        /** Passes several sets of attribute data to fillArray at once
         * @param {Array} arrays Arrays of the format ["attribute", [0,0,0,...]] corresponding to the arguments of fillArray
         */
        this.fillArrays = function OBJ_fillArrays(arrays) {
            for (var i = 0; i < arrays.length; i++) {
                var arr = arrays[i];
                if (arr[0] === 'wglu_elements') {
                    this.setElements(arr[1]);
                }else {
                    this.fillArray(arr[0], arr[1]);
                }
            }
        };

        /** draw this object at its internally stored position, rotation, and scale
         */
        this.draw = function OBJ_draw() {
            $W.renderer.renderObject(this, this.material, this._drawFunction);
        };

        this.update = function(dt) {};
        
        this.type = type; 

};


var vertexCount = 0;
var faceCount = 0;
var vertexPositions = [];
var faceIndex =[];
var vertex_obj = [];
function handleLoadedWorld(data)
{
	var lines = data.split("\n");

	//read data from .obj file
	for(var i in lines){

		if(lines.length>i)
		{
		var vals = lines[i].split(" ");

		if (vals[0] == "v")
		{
			//push vertex to vertex buffer
			vertexPositions.push(parseFloat(vals[1]));
			vertexPositions.push(parseFloat(vals[2]));
			vertexPositions.push(parseFloat(vals[3]));	
			vertexCount +=1;
			//console.log( parseFloat(vals[1]),parseFloat(vals[2]),parseFloat(vals[3]));

		}
		else if (vals[0] == "f")
		{
			faceIndex.push(parseInt(vals[2]));
			faceIndex.push(parseInt(vals[3]));
			faceIndex.push(parseInt(vals[4]));	
			//console.log( parseFloat(vals[2]),parseFloat(vals[3]),parseFloat(vals[4]));

			this.faceCount += 1;
		}
		}
	}
	for (var i = 0; i < faceIndex.length; i = i+3)
	{
		vertex_obj.push(vertexPositions[3*faceIndex[i]-3],vertexPositions[3*faceIndex[i]-2],vertexPositions[3*faceIndex[i]-1]);
		vertex_obj.push(vertexPositions[3*faceIndex[i+1]-3],vertexPositions[3*faceIndex[i+1]-2],vertexPositions[3*faceIndex[i+1]-1]);
		vertex_obj.push(vertexPositions[3*faceIndex[i+2]-3],vertexPositions[3*faceIndex[i+2]-2],vertexPositions[3*faceIndex[i+2]-1]);

	}
	/*
	var normals = new Array(vertexPositions.length);
	for (var i = 0; i< faceIndex.length; i = i+9)
	{
		var p1 = new Vec3();
		p1.xyz(vertex_obj[i],vertex_obj[i+1],vertex_obj[i+2]);
		var p2 = new Vec3();
		p2.xyz(vertex_obj[i+3],vertex_obj[i+4],vertex_obj[i+5]);
		var p3 = new Vec3();
		p3.xyz(vertex_obj[i+6],vertex_obj[i+7],vertex_obj[i+8]);
		var p4 = p2.sub(p1);
		var p5 =p3.sub(p1);
		var normal = vecCross(p4,p5);
		for(var j = i; j<i+3;j +=1){
			if(typeof normal[3*j] == "undefined")
				normals[3*j] = 0;
			if (typeof normal[3*j+1] == "undefined")
				normals[3*j+1] = 0;
			if(typeof normal[3*j+2] == "undefined")
				normals[3*j+2] = 0;
			
			normals[3*j] += normal.x;
			normals[3*j+1] +=normal.y;
			normals[3*j+2] +=normal.z;
			
			normal.x = normals[3*j];
			normal.y = normals[3*j+1];
			normal.z = normals[3*j+2];
			normal = normal.normalize();
			
			normals[3*j] = normal.x;
			normals[3*j+1] = normal.y;
			normals[3*j+2] = normal.z;
		}	
	}
	*/
}
ObjModel.prototype.draw=function()
{

	console.log(vertex_obj.length);
	for (var i = 0; i < vertex_obj.length; i = i+3)
	{
		glVertex3f( vertex_obj[i],vertex_obj[i+1],vertex_obj[i+2]);

	}
}

ObjModel.prototype.loadModel=function(filename)
{
	console.log("request sended");
	var request = new XMLHttpRequest();
	request.open("GET",filename,false);

	request.onreadystatechange = function(){
		if(request.readyState == 4){
			console.log("request completed");
			handleLoadedWorld(request.responseText);

		}
		else
			console.log(request.readyState);
	}
	request.send();
}

createObject = function(params){
	//$W.createObject(params);
	//$W.createObject({type:$W.pipeline_state, data:DATA});
var obj = new ObjModel(params.type);

	obj.fillArrays(params.data);
	
	return obj;
};