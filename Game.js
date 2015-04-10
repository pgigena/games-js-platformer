function Game() {
	this.loading = true;
	this.graphics = {
		map: null,
		game: null/*,
		hud: null*/
	};

	this.map = new Map();
	this.player = new Character();

	this.resolution = {
		w: 500,
		h: 500
	};
}

Game.prototype.run = function () {
	var game = this;

	this.createDomElements();
	this.addEventListeners();

	this.initializePlayer();
	this.map.draw(this.graphics.map);

	window.setInterval(function () {
		window.requestAnimationFrame(function () {
			game.mainLoop();
		});
	}, 1000 / 10 /* <--- FPS */);
};

Game.prototype.createDomElements = function () {
	this.graphics.map = createCanvas('map', this.resolution.w, this.resolution.h, 0);
	this.graphics.game = createCanvas('game', this.resolution.w, this.resolution.h, 1);
//	this.graphics.hud = createCanvas('hud', this.resolution.w, this.resolution.h, 2);
};

Game.prototype.addEventListeners = function () {
	var game = this;

	window.addEventListener('keydown', function (evt) {
		game.onKeyDown(evt.keyCode);

		switch (evt.keyCode) {
			case 32:	/* Jump */
			case 38:	/* Up */
			case 40:	/* Down */
			case 37:	/* Left */
			case 39:	/* Right */
				evt.preventDefault();
		}
	});
	
	window.addEventListener('keyup', function (evt) {
		game.onKeyUp(evt.keyCode);

		switch (evt.keyCode) {
			case 32:	/* Jump */
			case 38:	/* Up */
			case 40:	/* Down */
			case 37:	/* Left */
			case 39:	/* Right */
				evt.preventDefault();
		}
	});
};

Game.prototype.onKeyDown = function (keyCode) {
	switch (keyCode) {
		case 32:	/* Jump */
//			if (!character.falling) {
			this.player.acceleration.y = -15;
//				character.jumping = true;
//			}
			break
		case 37:	/* Left */
			this.player.acceleration.x = -3;
			break;
		case 39:	/* Right */
			this.player.acceleration.x = +3;
			break;
	}
};

Game.prototype.onKeyUp = function (keyCode) {
	switch (keyCode) {
		case 37:	/* Left */
		case 39:	/* Right */
			this.player.acceleration.x = 0;
			break;
	}
};

Game.prototype.initializePlayer = function () {
	this.player.pos.x = 15;
	this.player.pos.y = 15;

	this.player.bounds.w = 25;
	this.player.bounds.h = 35;

	this.player.maxVelocity.x = 15;
	this.player.maxVelocity.y = 15;

	// Animations
	var buster = this.player;
	var game = this;

	var request = new XMLHttpRequest();
	request.open("GET", "./buster.json");
	request.onload = function () { 
		var i = 1;
		var character = JSON.parse(request.responseText);
		
		var sprite = document.createElement('img');
		sprite.src = "./buster.png";

		for (var i in character.animations) {
			var animation = new Animation();

			animation.sprite = sprite;
			animation.fps = character.animations[i].fps;
			animation.loop = character.animations[i].loop;
			animation.offset.x = character.animations[i].offset.x;
			animation.offset.y = character.animations[i].offset.y;
			animation.frameSequence = character.animations[i].frameSequence;

			for (var j in character.animations[i].frames) {
				var frame = new Frame();
				frame.spriteOffset.x = character.animations[i].frames[j].spriteOffset.x;
				frame.spriteOffset.y = character.animations[i].frames[j].spriteOffset.y;

				frame.offset.x = character.animations[i].frames[j].frameOffset.x;
				frame.offset.y = character.animations[i].frames[j].frameOffset.y;

				frame.bounds.w = character.animations[i].frames[j].spriteBounds.w;
				frame.bounds.h = character.animations[i].frames[j].spriteBounds.h;

				animation.frames[j] = frame;
			}

			buster.animations[i] = animation;
		}
		game.loading = false;
		/* @TODO: Set proper animation initialization */
		buster.animations[buster.currentAnimationIndex].start();
	};

	request.send();
};

Game.prototype.mainLoop = function () {
	if (this.loading) {
		return;
	}

	this.updateSpeed();
	this.player.updatePosition();

	this.draw();
};

Game.prototype.updateSpeed = function () {
	var velocityModifiers = new Velocity();

	// Friction is a module, the direction is determined when applying the velocity modifier to the velocity vector
	if (this.player.velocity.x < 0) {
		velocityModifiers.x += 1;
	} else if (this.player.velocity.x > 0) {
		velocityModifiers.x -= 1;
	}

	this.player.updateSpeed(velocityModifiers);
};

Game.prototype.draw = function () {
	this.graphics.game.clearRect(0, 0, this.resolution.w, this.resolution.h);
	this.player.draw(this.graphics.game);
};