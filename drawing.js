$W.Object = function(){
	this.draw = function(){
		//draw object and its internally stored position, rotation, and scale
	}
}

$W.Timer = function () {
	this.age = 0;
	this.currTime = (new Date()).getTime();
	this.deltaTime = 0;
	this.prevTime = this.currTime;
	
	/*Update the timer*/
	this.tick = function(){
		this.currTime = (new Date()).getTime();
		this.deltaTime = this.currTime - this.prevTime;
		this.prevTime = this.currTime;
		this.age += this.deltaTime;
		//update FPS count
	}
}

$W.Camera = function() {
	this.up = [0,1,0]; //up direction
	this.target = [0,0,0]; //target
	
	this.setTarget = function(x,y,z){
		this.target = [x,y,z];
	}
}

function start(){
        // use mozRequestAnimationFrame if available
        if (typeof(window.mozRequestAnimationFrame) != 'undefined') {
            var redraw = function $W_mozRedraw() {
                update();
                draw();
                window.mozRequestAnimationFrame(redraw);
            };
            window.mozRequestAnimationFrame(redraw);

        // fallback to setinterval
        }else {
            if (typeof(framelimit) === 'undefined') {
                framelimit = 10;
            }
            setInterval(function $W_redrawFn() {
                    update();
                    draw();
                    },framelimit);
        }
}

/*Update all objects and textures*/
function update(){
	timer.tick(); //update timer
	
	for(var i=0; i<objects.length; i++)
		objects[i].update(timer);
		
	for(var i=0; i<textures.length; i++)
		textures[i].update();
}

/*Draw all objects from the camera's perspective*/
function drawAll(){
	glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
	setupMatrices();
	drawObjects();
	glFlush();
}

function setupMatrices(){
	modelview.loadIdentity();
	projection.loadIdentity();
	
	//setup projection and modelview matrices to match camera
}

function drawObjects(){
	for (var i=0; i<renderables.length; i++)
		objects[i].draw();
}