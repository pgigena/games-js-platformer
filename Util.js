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