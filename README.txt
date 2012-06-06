3D Javascript Engine using OpenGL
---


The newest working demo:
http://sliu45.projects.cs.illinois.edu/demo.html
The code used in DEMO is from "Hierarchical Modeling" slides of CS418,by John C. Hart, UIUC.

Implementation Notes
---

1) Objects written earlier into the program will be drawn after objects written later.  (This is important for overlapping objects.)
2) Can only have one color per glBegin() and glEnd() block.

Bugs
---

1) glDrawArrays is giving an "Attempted to access out-of-range indices" error.  Not sure why yet.