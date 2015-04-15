function Character() {
	this.pos = new Vector();
	this.prevPos = new Vector();
	this.bounds = new BoundingBox();
	this.velocity = new Velocity();
	this.maxVelocity = new Velocity();
	this.acceleration = new Acceleration();
	this.animations = new Array();

	this.currentAnimationIndex = 3;
}

Character.prototype.updateSpeed = function (modifierVelocity) {
	this.velocity.x += this.acceleration.x;
	this.velocity.x += modifierVelocity.x;
	
	// Apply the velocity cap
	if (this.velocity.x > this.maxVelocity.x) {
		this.velocity.x = this.maxVelocity.x;
	} else if (this.velocity.x < -this.maxVelocity.x) {
		this.velocity.x = -this.maxVelocity.x;
	}

	if (this.velocity.x == 0 && this.currentAnimationIndex != 0) {
		this.changeAnimation(0);
	} else if (this.currentAnimationIndex != 2 && this.velocity.x > 0) {
		this.changeAnimation(2);
	} else if (this.currentAnimationIndex != 3 && this.velocity.x < 0) {
		this.changeAnimation(3);
	}

	// Cap y velocity when falling?
	this.velocity.y += this.acceleration.y;
	this.velocity.y += modifierVelocity.y;
};

Character.prototype.updatePosition = function () {
	this.prevPos.x = this.pos.x;
	this.prevPos.y = this.pos.y;

	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;
};

Character.prototype.draw = function (ctx) {
	this.animations[this.currentAnimationIndex].draw(this.pos.x, this.pos.y, ctx);

	ctx.strokeStyle = '#f00';
	ctx.lineWidth = 1;
	ctx.strokeRect(this.pos.x, this.pos.y, this.bounds.w, this.bounds.h);
};

Character.prototype.changeAnimation = function (animationIndex) {
	this.animations[this.currentAnimationIndex].end();

	this.currentAnimationIndex = animationIndex;
	this.animations[animationIndex].start();
};