var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';
inputs.offset = new Vector2(GetLeft(canvas), GetTop(canvas)); // 캔버스 좌표 구하기

var player = new Player();

var floor = new Array();
floor.push(new Rectangle(0, 400, 400, 20))
floor.push(new Rectangle(100, 350, 20, 20))
floor.push(new Rectangle(150, 300, 20, 20))
floor.push(new Rectangle(200, 250, 20, 20))
floor.push(new Rectangle(250, 200, 20, 20))
floor.push(new Rectangle(300, 150, 20, 20))
floor.push(new Rectangle(350, 100, 20, 20))

for(var i = 0; i<floor.length; i++){
  floor[i].color = new Color(0, 0, 0, 1);
}

var Update = setInterval(function(){
  player.Update()

  var collided = false;
  for(var i=0; i<floor.length; i++){
    if(floor[i].collideWithRect(player.rect) || player.rect.collideWithRect(floor[i])){
      player.SetPosition(null, floor[i].y - player.rect.h)
      player.jumpAvailable = true; // 땅에 닿아있으면 점프가능
      collided = true;
      break;
    }
  }
  if(!collided){ // 땅에 닿아있지 않은 경우에는 점프가 불가능하게 함
    player.jumpAvailable = false;
  }


}, 1);

var Draw = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i<floor.length; i++){
    floor[i].Draw(ctx);
  }
  player.Draw(ctx);
}, 33)

