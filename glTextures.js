var GL_TEXTURE_2D = TEXTURE_2D;
var GL_TEXTURE_CUBE_MAP = GL_TEXTURE_CUBE_MAP;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X = TEXTURE_CUBE_MAP_POSITIVE_X;
var GL_TEXTURE_CUBE_MAP_POSITIVE_Y = TEXTURE_CUBE_MAP_POSITIVE_Y;
var GL_TEXTURE_CUBE_MAP_POSITIVE_Z = TEXTURE_CUBE_MAP_POSITIVE_Z;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_X = TEXTURE_CUBE_MAP_NEGATIVE_X;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = TEXTURE_CUBE_MAP_NEGATIVE_Y;
var GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = TEXTURE_CUBE_MAP_NEGATIVE_Z;
var GL_RGBA = RGBA;
var GL_SRGB_ALPHA = ALPHA;
var GL_TEXTURE_WRAP_S = TEXTURE_WRAP_S;
var GL_TEXTURE_WRAP_T = TEXTURE_WRAP_T;
var GL_TEXTURE_MIN_FILTER = TEXTURE_MIN_FILTER;
var GL_TEXTURE_MAG_FILTER = TEXTURE_MAG_FILTER;
var GL_BLEND = BLEND;
var GL_CULL_FACE = CULL_FACE;
var GL_DEPTH_TEST = DEPTH_TEST;
var GL_DITHER = DITHER;
var GL_POLYGON_OFFSET_FILL = POLYGON_OFFSET_FILL;
var GL_SAMPLE_ALPHA_TO_COVERAGE = SAMPLE_ALPHA_TO_COVERAGE;
var GL_SAMPLE_TO_COVERAGE = SAMPLE_TO_COVERAGE;
var GL_SCISSOR_TEST = SCISSOR_TEST;
var GL_STENCIL_TEST = STENCIL_TEST;
var GL_NO_ERROR = NO_ERROR;
var GL_OUT_OF_MEMORY = OUT_OF_MEMORY;
var GL_INVALID_ENUM = INVALID_ENUM;
var GL_INVALID_OPERATION = INVALID_OPERATION;
var GL_INVALID_VALUE = INVALID_VALUE;
var GL_INVALID_FRAMEBUFFER_OPERATION = INVALID_FRAMEBUFFER_OPERATION;
var GL_FASTEST = FASTEST;
var GL_NICEST = NICEST;
var GL_DONT_CARE = DONT_CARE;
var GL_UNPACK_ALIGNMENT = UNPACK_ALIGNMENT;
var GL_PACK_ALIGNMENT = PACK_ALIGNMENT;


//All of this is probably wrong/not up to date with other changes in code elsewhere... Kept for reference.

function glActiveTexture(texture) //OpenGLES?
{
	activeTexture(texture);
}


function glBindTexture(target, texture) //only for TEXTURE_2D and TEXTURE_CUBE_MAP
{
	$W.GL.bindTexture(target, texture);
}


//target:  TEXTURE_2D, TEXTURE_CUBE_MAP_POSITIVE_{X,Y,Z}, 
//TEXTURE_CUBE_MAP_NEGATIVE_{X,Y,Z}
//internalformat: ALPHA, LUMINANCE, LUMINANCE_ALPHA, RGB[A] 


function glCopyTexImage2D(target, level, internalformat, x, y, width, height, border)
{
	$W.GL.copyTexImage2D(target, level, internalformat, x, y, width, height, border);
}


function glCopyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height)
{
	$W.GL.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
}


function glGenTextures(n, object)
{
object = new Array(n);
        var i = 0;
        for (i = 0; i < n; i = i+1){
                object(i) = createTexture;
        }
}


function glDeleteTexture(n, textures)
{
        var i = 0;
        for (i =0; i < n; i = i + 1){
textures.pop();
}
return textures;
}


function glGenerateMipmap(target) //OpenGLES?
{
        $W.GL.generateMipmap(target);
}


function glGetTexParameterfv(target, pname, params)
{
        params = $W.GL.getTexParameter(target, pname);
}


function glGetTexParameteriv(target, pname, params)
{
        params = $W.GL.getTexParameter(target, pname);
}


function glGetTexParameterIiv(target, pname, params)
{
        params = $W.GL.getTexParameter(target, pname);
}


function glGetTexParameterIuiv(target, pname, params)
{
        params = $W.GL.getTexParameter(target, pname);
}


function glIsTexture(tex)
{
        return $W.GL.isTexture(tex);
}


function glTexImage2d(target, level, internalFormat, width, height, border, format, type, data)
{
        $W.GL.texImage2d(target, level, internalFormat, width, height, border, format, type, data);
}


function glTexParameterf(target, pname, param)
{
        $W.GL.texParameterf(target, pname, param);
}


function glTexParameteri(target, pname, param)
{
        $W.GL.texParameteri(target, pname, param);
}


function glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, data)
{
        $W.GL.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, data);
}

function glAreTexturesResident(n,textures,residences){

}

function glCopyTexSubimage1d(target,level,xoffset,x,y,width){

}

function glCopyTeximage1D(target,level,internalFormatx,v,border){

}

function glGetTexEnv(target,pname,params){

}

function glPrioritizeTextures(n,textures,priorities){

}

function glTexCoord1(s){

}

function glTexCoord2(s,t){

}

function glTexCoord3(s,t,r){

}

function glTexCoord4(s,t,r,q){

}

function glTexEnv(target,pname,param){

}

function glTexGen(coord,pname,param){

}

function glTexImage1D(target,level,components,width,border,format,type,pixels){

}

function glTexSubImage1D(target,level,xoffset,width,format,type,pixels){

}