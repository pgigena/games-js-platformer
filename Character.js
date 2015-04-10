function Character() {
	this.pos = new Vector();
	this.prevPos = new Vector();
	this.bounds = new BoundingBox();
	this.velocity = new Velocity();
	this.maxVelocity = new Velocity();
	this.acceleration = new Acceleration();
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
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 1;
	ctx.strokeRect(this.pos.x, this.pos.y, this.bounds.w, this.bounds.h);

	ctx.fillStyle = '#00f';
	ctx.fillRect(this.pos.x + 1, this.pos.y + 1, this.bounds.w -2, this.bounds.h - 2);
};