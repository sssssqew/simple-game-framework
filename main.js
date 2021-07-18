var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';

var offset = canvas.getBoundingClientRect();

var ctx = canvas.getContext('2d');

var rect = new Rectangle(15, 15, 50, 50);
var rect2 = new Rectangle(80, 15, 50, 50);
var rect3 = new Rectangle(150, 15, 50, 50);
var movement = -1;
var testVec = new Vector2(10, 15);
testVec.Set(20, 20);


alert(testVec.Distance());

setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rect.Draw(ctx, 'red');
  rect2.Draw(ctx, 'blue');
  rect3.Draw(ctx, 'red');

  rect2.x += movement;

  if(rect2.collideWithRect(rect) || rect2.collideWithRect(rect3)){
    movement *= -1;
  }
  // alert(rect.collideWithRect(rect2))
}, 33)

// window.addEventListener('mousedown', function(event) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // var r = new Rectangle(300, 300, 100, 200);
//   // r.Draw(ctx, 'red');

//   var c = new Circle(300, 400, 30);
//   c.Draw(ctx, 'red');

//   // if(c.collideWithRect(r)){
//   //   c.Draw(ctx, 'yellow');
//   // }

//   var c2 = new Circle(event.clientX - offset.x, event.clientY - offset.y, 100);
//   c2.Draw(ctx, 'blue');
//   if(c.collideWithCircle(c2)){
//     c2.Draw(ctx, 'yellow');
//   }

//   // var r2 = new Rectangle(event.clientX - offset.x, event.clientY - offset.y, 50, 100)
//   // r2.Draw(ctx, 'green');
//   // if(r.collideWithRect(r2) || r2.collideWithRect(r)){ // r2가 r1보다 큰 경우도 체크해줘야 함
//   //   r2.Draw(ctx, 'yellow');
//   // }
// });