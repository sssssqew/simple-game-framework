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
  this.jumpAvailable = false;
  this.JUMP_MAX = 2;
  this.jumping = false;
  this.jumpVelocity = 0;

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

    if(inputs.a || inputs.left){
      this.animation.SetRow(2);
      this.rect.x -= 0.5;
      this.moving = true;
    } 
    if(inputs.d || inputs.right){
      this.animation.SetRow(0);
      this.rect.x += 0.5;
      this.moving = true;
    } 
    if(inputs.w || inputs.space){
      this.Jump();
    }
    if(this.jumping){ // 땅에 닿아있을때 w키를 누른경우
      this.rect.y -= this.jumpVelocity;
      this.jumpVelocity -= 0.02; // 가속도 0.1 (거리변화가 0.1씩 감소한다)

      if(this.jumpVelocity <= 0){ // 점프해서 가장 높은 지점에 도달하면 그때부터는 중력에 의해 아래로 떨어진다
        this.jumping = false;
        this.jumpAvailable = true; // 가장 높은 지점에서 내려올때 w키를 누르면 다시 한번 더 점프가능
      }
    }else{
      this.rect.y += this.gravity; // 점프해서 가장 높은 지점에서 내려오는 경우
    }

    

    // 애니메이션 이미지를 그릴 위치를 업데이트된 사각형 좌표로 설정한다
    // 어디에 이미지를 그릴 것인가? 현재 사각형 좌표에 그린다
    this.animation.position.Set(this.rect.x, this.rect.y) // 현재 사각형 위치에 이미지를 그린다 (사각형 위치를 이미지를 그릴 위치로 설정한다) - drawImage (x, y) 포인트

    if(this.moving) this.animation.Update(); // 키를 계속 누르고 있으면 애니메이션 그림이 계속 바뀐다
    else this.animation.SetColumn(0);
  }
  this.Jump = function(){
    if(this.jumpAvailable){
      this.jumpVelocity = this.JUMP_MAX;
      this.jumping = true;
    }
  }
  this.Draw = function(ctx){
    // this.rect.Draw(ctx)
    this.animation.Draw(ctx);
  }
}