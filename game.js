var player = { x: 250, y: 250 };
var cw = 10;
var w = 640;
var h = 640;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);
var keysDown = {};

function init()
{
	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 60);
}
init();

function drawPlayer()
{
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc((player.x + cw / 2), (player.y + cw / 2), cw / 2, 0, 2 * Math.PI + 1);
	ctx.fill();
}
function paint()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "lime";
	ctx.strokeRect(0, 0, w, h);
	ctx.fillStyle = "red";
	ctx.fillText("Test", 5, h - 5);
	
	update();
	drawPlayer();
}

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function update() 
{
	if (38 in keysDown) { // up
		if(!(player.y < cw))
		player.y -= 1 * cw;
	}
	if (40 in keysDown) { // down
		if(!(player.y >= w - cw))
		player.y += 1 * cw;
	}
	if (37 in keysDown) { // left
		if(!(player.x < cw))
		player.x -= 1 * cw;
	}
	if (39 in keysDown) { // right
		if(!(player.x >= h - cw))
		player.x += 1 * cw;
	}
}
