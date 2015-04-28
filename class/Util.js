Function.prototype.subclass = function (base) {
	var c = Function.prototype.subclass.nonconstructor;
	c.prototype = base.prototype;
	this.prototype = new c();
};
Function.prototype.subclass.nonconstructor = function () {
};

function createCanvas (id, w, h, zIndex) {
	var canvas = document.createElement('canvas');
	canvas.id = id;
	canvas.width = w;
	canvas.height = h;
	canvas.style = "z-index: " + zIndex + ";";

	document.body.appendChild(canvas);
	return canvas.getContext('2d');
}

function createAnimation(offsetX, offsetY, w, h, sprite, frameCount, loopable, ticsPerSecond) {
	var animation = new Animation();

	animation.ticsPerSecond = ticsPerSecond;
	animation.sprite = sprite;
	animation.loopable = loopable;

	for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
		var frameX = offsetX + (w * frameIndex);
		var frame = new AnimationFrame(frameX, offsetY, w, h);

		animation.frames.push(frame);
	}

	return animation;
}

function Timer(callback, delay) {
	var timerId, start, remaining = delay;

	this.pause = function () {
		window.clearTimeout(timerId);
		remaining -= new Date() - start;
	};

	this.resume = function () {
		start = new Date();
		window.clearTimeout(timerId);
		timerId = window.setTimeout(callback, remaining);
	};

	this.stop = function () {
		window.clearInterval(timerId);
	};

	this.resume();
}