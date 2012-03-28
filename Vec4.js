function Vec4()
{
	this.x;this.y;this.z;this.w;
	this.dim = 4;
}
Vec4.prototype.toArray = function()
{
	var array = [this.x,this.y,this.z,this.w];
	return array;
}
Vec4.prototype.getFromArray = function(array)
{
	this.x = array[0];this.y = array[1];this.z = array[2];this.w = array[3];
}
Vec4.prototype.clone = function()
{
	var clonedVec4 = new Vec4();
	clonedVec4.getFromArray(this.toArray().clone());
	return clonedVec4;
}
Vec4.prototype.toVec3 = function()
{
	var mvec3 = new Vec3();
	mvec3.x = this.x;
	mvec3.y = this.y;
	mvec3.z = this.z;
	return mvec3;
}
Vec4.prototype.vecMul = function(vec)
{
	var result;
	if(vec.dim == 3)
		result.getFromArray([vec.x*this.x,vec.y*this.y,vec.z*this.z,this.w]);
	else
		result.getFromArray([vec.x*this.x,vec.y*this.y,vec.z*this.z,vec.w*this.w]);
	return result;
}