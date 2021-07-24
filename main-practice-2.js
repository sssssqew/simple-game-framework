var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
// canvas.width = document.body.clientWidth;
// canvas.height = document.body.clientHeight;
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';
inputs.offset = new Vector2(GetLeft(canvas), GetTop(canvas)); // 캔버스 좌표 구하기

// 충돌 시뮬레이션
var rect = new Rectangle(250, 250, 50, 50);
rect.color = new Color(0, 0, 255, 1);

var player = new Rectangle(0, 0, 25, 25);
player.color.g = 0;
player.color.b = 0;

var Update = setInterval(function(){
  var prevPosition = new Vector2(player.x, player.y);

  if(inputs.a) player.x -= 2;
  if(inputs.d) player.x += 2;
  if(inputs.w) player.y -= 2;
  if(inputs.s) player.y += 2;
  if(player.x < 0) player.x = 0;
  if(player.y < 0) player.y = 0;
  if(player.x + player.w > canvas.width){
    player.x = canvas.width - player.w;
  } 
  if(player.y + player.h > canvas.width){
    player.y = canvas.width - player.h;
  } 

  // 플레이어가 장애물과 충돌하면, 플레이어 위치를 이동하기 전의 위치로 셋팅함
  // 유튜브 비디오와 다르게 내 충돌 알고리즘은 교차체크가 필요함
  if(player.collideWithRect(rect)){
    player.x = prevPosition.x;
    player.y = prevPosition.y;
  }else{
    if(rect.collideWithRect(player)){
      player.x = prevPosition.x;
      player.y = prevPosition.y;
    }
  }
}, 1);

var Draw = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rect.Draw(ctx)
  player.Draw(ctx)
 
}, 33)

