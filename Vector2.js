function Vector2(x, y){
  this.x = 0;
  this.y = 0;

  // 현재 입력된 좌표로 초기화
  if(!isNull(x)) this.x = x;
  if(!isNull(y)) this.y = y;

  this.prevX = 0;
  this.prevY = 0;

  // 현재 입력된 좌표로 업데이트
  this.Set = function(x, y){
    if(isNull(x) && isNull(y)){
      console.log("No 'x' or 'y' has been passed to Vector2's Set function")
    }else{
      this.prevX = this.x;
      this.prevY = this.y;
      if(!isNull(x)) this.x = x;
      if(!isNull(y)) this.y = y;
    }
  }
  this.Normalize = function(){
    var tmp = new Vector2(this.x, this.y);
    var mag = Math.sqrt((tmp.x * tmp.x) + (tmp.y * tmp.y));
    tmp.x = tmp.x / mag;
    tmp.y = tmp.y / mag;

    return tmp;
  }

  // vec2 지점과의 거리 계산
  this.Distance = function(vec2){
    if(!isNull(vec2)){
      var dx = vec2.x - this.x;
      var dy = vec2.y - this.y;
    }else{
      var dx = this.prevX - this.x;
      var dy = this.prevY - this.y;
    }
    return Math.sqrt(dx * dx + dy * dy);
  }
  this.HasChanged = function(){
    return (this.x != this.prevX || this.y != this.prevY)
  }
  // vec2 지점과의 차이 벡터
  this.Difference = function(vec2, invert){
    var inv = 1;
    if(invert) inv = -1;

    if(!isNull(vec2)){
      return new Vector2((this.x - vec2.x)*inv, (this.y - vec2.y)*inv)
    }else{
      return new Vector2((this.x - this.prevX)*inv, (this.y - this.prevY)*inv)
    }
  }
}