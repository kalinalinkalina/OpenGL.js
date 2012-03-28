function Vec3()
{
	this.x;this.y;this.z;
	this.dim = 3;

}
Vec3.prototype.length = function()
{
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}
Vec3.prototype.normalize = function()
{
	this.x = this.x/this.length();
	this.y = this.y/this.length();
	this.z = this.z/this.length();
}
Vec3.prototype.toVec4 = function()
{
	var mvec4 = new Vec4();
	mvec4.x = this.x; mvec4.y = this.y; mvec4.z = this.z;
	mvec4.w = 1;
	return mvec4;
}
Vec3.prototype.toArray = function()
{
	var array = new Array(3);
	array = [this.x,this.y,this.z];
	return array;
}
Vec3.prototype.getFromArray = function(array)
{
	this.x = array[0];
	this.y = array[1];
	this.z = array[2];
	this.w = array[3];
}
Vec3.prototype.clone = function()
{
	var clonedVec3 = new Vec3();
	clonedVec3.getFromArray(this.toArray().clone());
	return clonedVec3;
}