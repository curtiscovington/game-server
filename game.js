var cw = 20;
var w = 640;
var h = 640;
var player = { id: getRandom(50), x: get10(w), y: get10(h), speed: cw };
var players;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);
var keysDown = {};
var map = [
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','r','r','r','g','r','r','r','g','g','r','r','g','r','r','r','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','r','g','g','r','g','g','g','r','g','g','g','g','r','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','r','g','g','r','r','g','g','r','r','r','g','g','r','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','r','g','g','r','g','g','g','g','g','r','g','g','r','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','r','g','g','r','r','r','g','r','r','g','g','g','r','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','g','r','g','g','r','g','g','r','r','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','r','r','g','r','g','r','g','r','g','r','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','r','r','g','r','g','r','g','r','g','r','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','g','r','g','r','r','r','g','r','r','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','g','r','g','r','g','r','g','r','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','r','r','r','g','r','r','r','g','r','g','g','g','r','r','r','g','g','r','r','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','r','g','g','g','r','g','g','r','g','g','g','r','g','g','g','r','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','r','g','g','g','r','g','g','r','g','g','g','r','r','g','g','r','r','r','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','r','g','g','g','r','g','g','r','g','g','g','r','g','g','g','g','g','r','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','r','g','g','r','r','r','g','r','r','r','g','r','r','r','g','r','r','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
	['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
];

function init()
{
	if (typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 60);
}
init();

function getRandom(n)
{
	return Math.floor(Math.random() * n);
}
function get10(n)
{
	return (Math.floor(getRandom(n)/cw)) * cw
}
function drawGuess()
{
	ctx.beginPath();
	ctx.strokeStyle = "grey";
	ctx.arc((player.x + cw / 2), (player.y + cw / 2), cw / 2, 0, 2 * Math.PI + 1);
	ctx.stroke();
}
function drawPlayer(x, y)
{
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.arc((x + cw / 2), (y + cw / 2), cw / 2, 0, 2 * Math.PI + 1);
	ctx.fill();
}
function paint()
{
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "lime";
	ctx.strokeRect(0, 0, w, h);
	ctx.fillStyle = "red";
	ctx.fillText("ID: " + player.id +" Location: " + player.x + ", " +player.y, 5, h - 5);
	
	paintTiles();
	
	update();
}
function paintTiles()
{
	for(i = 0; i < h/cw; i++)
	{
		for(j = 0; j < w/cw; j++)
		{
			switch(map[i][j])
			{
				case 'r':
					ctx.fillStyle = "#FFE4C4";
					break;
				case 'g':
					ctx.fillStyle = "#8FBC8F";
					break;
			}
			ctx.fillRect(j*cw, i*cw, cw, cw);
		}
	}
	
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
	
	transmit();
	drawGuess();
}

function transmit()
{
	var msg = {
    type: 	"location",
    id:   	player.id,
    locX: 	player.x, 
	locY:	player.y
	};	
	
	ws.send(JSON.stringify(msg));
}

function loadPlayers(msg)
{
	for(i = 0; i < msg.length; ++i)
	{
		drawPlayer(msg[i][4][0], msg[i][4][1]);
	}
}

