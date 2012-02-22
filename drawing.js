function startDrawing(){
	
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

function update(){

}

function draw(){

}