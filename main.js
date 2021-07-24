var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';

var offset = canvas.getBoundingClientRect();

var ctx = canvas.getContext('2d');

// var rect = new Rectangle(15, 15, 50, 50);
// rect.color = new Color(255, 0, 0, 1);
// var rect2 = new Rectangle(80, 15, 50, 50);
// rect2.color = new Color(0, 0, 255, 1);
// var rect3 = new Rectangle(150, 15, 50, 50);
// rect3.color = new Color(0, 255, 0, 1);
// var rect4 = new Rectangle(25, 25, 50, 50);
// rect4.color = new Color(0, 0, 255, 0.5);

// var movement = -1;

// var img = new Image();
// img.src = 'https://img.favpng.com/7/11/22/super-mario-bros-2-drawing-vector-graphics-png-favpng-HDMKBpxHNx3x8mtb7gUman45j.jpg';

// var tmpArr = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 3, 3, 3);

// var str = '';
// for(var i=0; i<tmpArr.length; i++){
//   str += tmpArr[i];
// }

// alert(tmpArr.Occurs(3));

// limit 8은 마리오가 2번째 줄까지 왼쪽으로 이동하는 애니메이션이기 때문에
var anim = new Animation(16, 16, 0, 0, 8, 'mario.png', 12, 4, 5)
anim.position.Set(50, 50);

setInterval(() => {
  if(inputs.d){
    anim.SetRow(0); // 왼쪽으로 갈때 왼쪽 동작부터 시작함
  }else if(inputs.a){
    anim.SetRow(2); // 오른쪽으로 갈때 오른쪽 동작부터 시작함
  }

  if(inputs.a){
    anim.position.Move(new Vector2(-0.5, 0)) // 0.5픽셀만큼 왼쪽으로 이동함
  }else if(inputs.d){
    anim.position.Move(new Vector2(0.5, 0))
  }else if(inputs.w){
    anim.position.Move(new Vector2(0, -0.5))
  }else if(inputs.s){
    anim.position.Move(new Vector2(0, 0.5))
  }
  
  anim.Update();
}, 1);

// 프레임 : 1초동안 이미지가 몇번 바뀌는지 (1초는 1000ms 30프레임이면 33ms마다 이미지가 한번씩 변경됨)
// Drwa 함수에서 column이 33ms 마다 한번씩 변경되므로 update 함수가 1ms마다 업데이트되어도 
// cropPosition(변경할 사진 위치)은 column이 변경되어야 같이 변경되므로 결국 33ms마다 이미지가 변경됨 
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // anim.Update()
  anim.Draw(ctx)

  // rect.Draw(ctx);
  // rect2.Draw(ctx);
  // rect3.Draw(ctx);
  // rect4.Draw(ctx);

  // rect2.x += movement;

  // ctx.drawImage(img, 0, 0, 820, 913, 180, 180, 50, 50);

  // if(rect2.collideWithRect(rect) || rect2.collideWithRect(rect3)){
  //   movement *= -1;
  // }
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