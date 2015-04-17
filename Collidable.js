function Collidable() {
	this.pos = new Vector();
	this.bounds = new BoundingBox();
}

Collidable.prototype.isIntersecting = function (x, y, w, h) {
	if ((this.pos.x + this.bounds.w < x) || (this.pos.x > x + w)
			|| (this.pos.y > y + h) || (this.pos.y + this.bounds.h < y)) {
		return false;
	}

	return true;
};

Collidable.prototype.isColliding = function (collidable) {
	if (!(collidable instanceof Collidable)) {
		throw ("Can't check collision with non-collidable");
	}

	this.isIntersecting(collidable.pos.x, collidable.pos.y, collidable.bounds.w, collidable.bounds.h);
};