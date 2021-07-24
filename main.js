var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
// canvas.width = document.body.clientWidth;
// canvas.height = document.body.clientHeight;
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';
inputs.offset = new Vector2(GetLeft(canvas), GetTop(canvas)); // 캔버스 좌표 구하기

var rects = new Array();

function GenerateRect(){
  var r = new Rectangle(Math.random() * 450, Math.random() * 450, 50, 50);
  r.color = new Color(255, 0, 0, 1);
  rects.push(r)
}

var Update = setInterval(function(){
  
}, 1);

var Draw = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i=0; i<rects.length; i++){
    rects[i].Draw(ctx)
  }
 
}, 33)

