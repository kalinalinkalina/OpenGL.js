3D Javascript Engine using OpenGL
---
Organization of functions is based on http://pixel.cs.vt.edu/courses/4204/gl.html


Demos
---
Most current demo: http://borkiew1.github.com/

Sicheng's demo: http://sliu45.projects.cs.illinois.edu/demo.html
The code is from "Hierarchical Modeling" slides of CS418, by John Hart, UIUC.


Implementation Notes
---

1) Can only have one color per glBegin() and glEnd() block, and must be specified after glBegin().


Bugs
---

1) gluLookAt seems to have broken, though it was working before... Also, glPush and glPop are not working properly.