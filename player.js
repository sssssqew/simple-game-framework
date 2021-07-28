function Player(){
  this.width = 16; // 플레이어 크기
  this.height = 16; // 플레이어 크기
  this.rect = new Rectangle(0, 0, this.width, this.height);
  this.rect.color.r = 0;
  this.rect.color.g = 0;
  this.animation = new Animation(16, 16, 0, 0, 8, 'mario.png', 12, 4, 5);
  this.animation.SetSize(this.width, this.height) // 플레이어 크기 설정
  this.gravity = 2;

  this.moving = false;

  // 플레이어(사각형)를 특정 위치로 업데이트함
  this.SetPosition = function(x, y, mod){
    if(isNull(mod) || !mod){
      if(!isNull(x)) this.rect.x = x;
      if(!isNull(y)) this.rect.y = y;
    }else{
      if(!isNull(x)) this.rect.x += x;
      if(!isNull(y)) this.rect.y += y;
    }
  }
  // 플레이어 위치(사각형 위치)를 키로 이동시키거나 중력에 의해 이동함
  // 업데이트는 플레이어 위치를 변경하는 함수
  this.Update = function(){
    this.moving = false;

    if(inputs.a){
      this.animation.SetRow(2);
      this.rect.x -= 1;
      this.moving = true;
    } 
    if(inputs.d){
      this.animation.SetRow(0);
      this.rect.x += 1;
      this.moving = true;
    } 

    this.rect.y += this.gravity;

    // 애니메이션 이미지를 그릴 위치를 업데이트된 사각형 좌표로 설정한다
    // 어디에 이미지를 그릴 것인가? 현재 사각형 좌표에 그린다
    this.animation.position.Set(this.rect.x, this.rect.y) // 현재 사각형 위치에 이미지를 그린다 (사각형 위치를 이미지를 그릴 위치로 설정한다) - drawImage (x, y) 포인트

    if(this.moving) this.animation.Update(); // 키를 계속 누르고 있으면 애니메이션 그림이 계속 바뀐다ㅁ
    else this.animation.SetColumn(0);
  }
  this.Draw = function(ctx){
    // this.rect.Draw(ctx)
    this.animation.Draw(ctx);
  }
}