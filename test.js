var character = {
	x: 10,
	y: 20,
	prevX: 10,
	prevY: 10,
	w: 10,
	h: 20,
	xAccel: 0,
	yAccel: 0,
	xSpeed: 0,
	ySpeed: 0,
	falling: false,
	jumping: false
};

var Const = {
	tileW: 30,
	tileH: 30,
	friction: 1
};

var map = new Array();

var background;
var graphics;

window.onload = function () {
	map[0] = new Array(0,0,0,0,0,0,0,0,0,0,0,1);
	map[1] = new Array(0,0,0,0,0,0,0,0,0,0,0,1);
	map[2] = new Array(1,0,0,0,0,0,0,1,0,0,0,1);
	map[3] = new Array(1,1,0,0,0,0,0,0,0,1,1,1);
	map[4] = new Array(1,1,1,0,0,0,0,0,1,1,0,1);
	map[5] = new Array(1,1,1,0,0,0,0,1,1,0,0,1);
	map[6] = new Array(0,0,0,0,0,0,1,0,0,0,1,1);
	map[7] = new Array(0,0,0,0,1,0,0,0,0,1,1,1);
	map[8] = new Array(0,0,0,0,0,0,0,0,1,1,0,1);
	map[9] = new Array(0,0,0,0,0,0,0,1,1,0,0,1);
	map[10] = new Array(0,0,0,0,0,0,1,0,0,0,0,1);
	map[11] = new Array(1,1,1,0,0,0,0,0,0,0,0,1);
	map[12] = new Array(1,1,1,1,1,1,1,0,0,0,0,1);
	map[13] = new Array(1,1,1,1,1,1,1,1,0,0,1,1);
	map[14] = new Array(1,1,1,1,1,1,0,0,0,1,1,1);
	map[15] = new Array(1,1,1,1,1,1,1,1,1,1,1,1);

	console.log(new Character());

	graphics = document.getElementById('test').getContext('2d');
	background = document.getElementById('bg').getContext('2d');

	drawMap();

	window.setInterval(function () {
		window.requestAnimationFrame(function () {
			mainLoop();
		});
	}, 1000 / 10);

	window.addEventListener('keydown', function (evt) {
		keyDownHandler(evt.keyCode);

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
		keyUpHandler(evt.keyCode);

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

function mainLoop() {
	updateSpeed();

	updatePosition();

	checkFall();
	checkWallCollision();
	draw();
}

function checkFall() {
	var leftTileX = character.x / Const.tileW | 0;
	var rightTileX = (character.x + character.w) / Const.tileW | 0;
	var bottomTileY = ((character.y + character.h) / Const.tileH) | 0;

	var isFloorTile = map[bottomTileY][leftTileX] || map[bottomTileY][rightTileX];

	if (!isFloorTile /*|| (isFloorTile && character.y + character.h <= Const.tileH * tileY)*/) {
		character.yAccel = 4;
		character.falling = true;
	}
}

function checkWallCollision() {
	if (character.x < 0) {
		character.x = 0;
		character.xSpeed = 0;
		return;
	}

	var leftTileX = character.x / Const.tileW | 0;
	var rightTileX = (character.x + character.w) / Const.tileW | 0;
	var topTileY = character.y / Const.tileH | 0;
	var bottomTileY = (character.y + character.h) / Const.tileH | 0;

	var isRoofTile = (map[topTileY][leftTileX] || map[topTileY][rightTileX]);

	// Above collision
	if (isRoofTile && character.ySpeed < 0) {
		character.y = (topTileY + 1) * Const.tileH;
		character.yAccel = 4;
		character.falling = true;
	}

	var isFloorTile = map[bottomTileY][leftTileX] || map[bottomTileY][rightTileX];

	if (!isFloorTile /*|| (isFloorTile && character.y + character.h <= Const.tileH * tileY)*/) {
		character.yAccel = 4;
		character.falling = true;
	} else if (character.falling) {
		console.log('hit the floor');
		character.falling = false;
		character.yAccel = 0;
		character.ySpeed = 0;
		character.y = Const.tileH * bottomTileY - character.h;
	}

	topTileY = character.y / Const.tileH | 0;
	bottomTileY = (character.y + character.h) / Const.tileH | 0;

	var isLeftWall = (map[topTileY][leftTileX] || (map[bottomTileY][leftTileX] && (character.y + character.h) % Const.tileH));

	if (isLeftWall && character.xSpeed < 0) {
		character.xAccel = 0;
		character.xSpeed = 0;
		character.x = (leftTileX + 1) * Const.tileW;
	}

	var isRightWall = (map[topTileY][rightTileX] || (map[bottomTileY][rightTileX] && (character.y + character.h) % Const.tileH));

	if (isRightWall && character.xSpeed > 0) {
		character.x = (Const.tileW * rightTileX) - character.w;
	}
}

function updateSpeed() {
	character.xSpeed += character.xAccel;

	if (character.falling || character.jumping) {
		character.ySpeed += character.yAccel;
	}

	// Apply friction
	// TODO: Make friction quotient grow with to speed (Exponential?)
	if (character.xSpeed > 0) {
		character.xSpeed -= Const.friction;
	} else if (character.xSpeed < 0) {
		character.xSpeed += Const.friction;
	}
}

function drawMap() {
	for (var y in map) {
		for (var x in map[y]) {
			if (map[y][x]) {
				background.fillStyle = '#f00';
			} else {
				background.fillStyle = '#0f0';
			}
			background.fillRect(x * Const.tileW, y * Const.tileH, Const.tileW, Const.tileH);
		}
	}
}

function draw() {
	graphics.clearRect(0, 0, 500, 500);

	graphics.fillStyle = '#00f';
	graphics.fillRect(character.x, character.y, character.w, character.h);
}

function updatePosition () {
	character.x += character.xSpeed;
	character.y += character.ySpeed;
}

function keyUpHandler(keyCode) {
	switch (keyCode) {
		case 37:	/* Left */
		case 39:	/* Right */
			character.xAccel = 0;
			break;
	}
}

function keyDownHandler(keyCode) {
	switch (keyCode) {
		case 32:	/* Jump */
			if (!character.falling) {
				character.yAccel = -15;
				character.jumping = true;
			}
			break
//		case 38:	/* Up */
//			break;
//		case 40:	/* Down */
//			break;
		case 37:	/* Left */
			character.xAccel= -3;
			break;
		case 39:	/* Right */
			character.xAccel = 3;
			break;
	}
}