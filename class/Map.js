function Map() {

	this.collisionMap = new Array();

	this.collisionMap[0] = new Array(0,0,0,0,0,0,0,0,0,0,0,1);
	this.collisionMap[1] = new Array(0,0,0,0,0,0,0,0,0,0,0,1);
	this.collisionMap[2] = new Array(1,0,0,0,0,0,0,1,0,0,0,1);
	this.collisionMap[3] = new Array(1,1,0,0,0,0,0,0,0,1,1,1);
	this.collisionMap[4] = new Array(1,1,1,0,0,0,0,0,1,1,0,1);
	this.collisionMap[5] = new Array(1,1,1,0,0,0,0,1,1,0,0,1);
	this.collisionMap[6] = new Array(0,0,0,0,0,0,1,0,0,0,1,1);
	this.collisionMap[7] = new Array(0,0,0,0,1,0,0,0,0,1,1,1);
	this.collisionMap[8] = new Array(0,0,0,0,0,0,0,0,1,1,0,1);
	this.collisionMap[9] = new Array(0,0,0,0,0,0,0,1,1,0,0,1);
	this.collisionMap[10] = new Array(0,0,0,0,0,0,1,0,0,0,0,1);
	this.collisionMap[11] = new Array(1,1,1,0,0,0,0,0,0,0,0,1);
	this.collisionMap[12] = new Array(1,1,1,1,1,1,1,0,0,0,0,1);
	this.collisionMap[13] = new Array(1,1,1,1,1,1,1,1,0,0,1,1);
	this.collisionMap[14] = new Array(1,1,1,1,1,1,0,0,0,1,1,1);
	this.collisionMap[15] = new Array(1,1,1,1,1,1,1,1,1,1,1,1);

	this.tileBox = new BoundingBox();
	
	this.tileBox.w = 30;
	this.tileBox.h = 30;
}

Map.prototype.draw = function (ctx) {
	for (var y in this.collisionMap) {
		for (var x in this.collisionMap[y]) {
			if (this.collisionMap[y][x]) {
				ctx.fillStyle = '#f00';
			} else {
				ctx.fillStyle = '#0f0';
			}
			ctx.fillRect(x * this.tileBox.w, y * this.tileBox.h, this.tileBox.w, this.tileBox.h);
		}
	}
};