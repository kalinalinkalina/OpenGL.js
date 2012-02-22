3D Javascript Engine using OpenGL
---


The newest working demo:
http://sliu45.projects.cs.illinois.edu/demo.html
The code used in DEMO is from "Hierarchical Modeling" slides of CS418,by John C. Hart, UIUC.

---


To do for next time:


INITIALIZE:
set up modelview, projection, camera, timer, canvas, WebGL

-

START:
update()
draw()

UPDATE:
update all objects and textures, both stored in arrays

DRAW:
clear()
setupMatrices()
drawObjects()
flush()

SETUPMATRICES()
modelview and projection
apply necessary camera rotation, position, target, up, perspective etc

-

$W.CAMERA

-

$W.TIMER

-

$W.OBJECT
draw objects, stored as an objects[] array