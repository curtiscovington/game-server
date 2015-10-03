var player = { x: 250, y: 250 };
var cw = 10;
var w = 640;
var h = 640;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

function init()
{
	paint();
	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 60);
}
init();

function drawPlayer()
{
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
	
	drawPlayer();
}