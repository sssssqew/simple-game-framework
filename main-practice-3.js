var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';
inputs.offset = new Vector2(GetLeft(canvas), GetTop(canvas)); // 캔버스 좌표 구하기

// 중력 시뮬레이션
var floor = new Rectangle(0, 400, 400, 20);
floor.color = new Color(0, 0, 0, 1);

var player = new Rectangle(15, 15, 20, 20);
console.log(player)
player.color.r = 0;
player.color.g = 0;

var gravity = 2.8;

var Update = setInterval(function(){
  if(inputs.a) player.x -= 3;
  if(inputs.d) player.x += 3;

  player.y += gravity;

  if(floor.collideWithRect(player)){
    player.y = floor.y - player.h;
  }
}, 1);

var Draw = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floor.Draw(ctx);
  player.Draw(ctx);
}, 33)

