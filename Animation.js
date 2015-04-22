function Animation() {
	this.sprite;
	this.loop;

	this.fps = 10;
	this.frameInterval = null;
	this.activeFrameIndex = 0;

	this.frames = new Array();
	this.frameSequence = new Array();

	this.offset = new Vector();
}

Animation.prototype.start = function () {
	var animation = this;

	if (this.fps) {
		this.frameInterval = setInterval(function () {
			animation.nextFrame();
		}, 1000 / this.fps);
	}
};

Animation.prototype.end = function () {
	if (this.frameInterval != null) {
		clearInterval(this.frameInterval);
	}
};

Animation.prototype.nextFrame = function () {
	if (this.activeFrameIndex < this.frameSequence.length - 1) {
		this.activeFrameIndex++;
	} else if (this.loop) {
		this.activeFrameIndex = 0;
	} else {
		this.end();
	}
};

Animation.prototype.currentFrame = function () {
	return this.frames[this.frameSequence[this.activeFrameIndex]];
};

Animation.prototype.draw = function (x, y, ctx) {
	var frame = this.currentFrame();
	ctx.drawImage(this.sprite, frame.spriteOffset.x, frame.spriteOffset.y, frame.bounds.w, frame.bounds.h, x + this.offset.x + frame.offset.x, y + this.offset.y + frame.offset.y, frame.bounds.w, frame.bounds.h);
};