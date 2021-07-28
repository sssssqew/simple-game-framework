var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';
inputs.offset = new Vector2(GetLeft(canvas), GetTop(canvas)); // 캔버스 좌표 구하기

var player = new Player();

var floor = new Rectangle(0, 400, 400, 20);
floor.color = new Color(0, 0, 0, 1);



var Update = setInterval(function(){
  player.Update()

  if(floor.collideWithRect(player.rect)){
    player.SetPosition(null, floor.y - player.rect.h)
  }
}, 1);

var Draw = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floor.Draw(ctx);
  player.Draw(ctx);
}, 33)

