function glEnable(cap)
{
        $W.GL.enable(cap);
}


function glDisable(cap)
{
        $W.GL.disable(cap);
}


function glFinish()
{
        $W.GL.finish();
}


function glFlush()
{
        $W.GL.flush();
}

function glHint(target, mode)
{
        $W.GL.hint(GENERATE_MIPMAP_HINT, mode);
}


function glIsEnabled(cap)
{
        return $W.GL.isEnabled(cap);
}