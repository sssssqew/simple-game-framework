// helper function
function getDist(x1, y1, x2, y2){
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
}

function getDistFromLength(l1, l2){
  return Math.sqrt(l1*l1+l2*l2)
}

function isContainX(x, rx, rw){
  return (x >= rx && x <= rx+rw)
}
function isContainY(y, ry, rh){
  return (y >= ry && y <= ry+rh)
}

function isNull(v){
  return (v === null || v === undefined)
}

function isCollide(d, r){
  if(d <= r) return true;
  else return false;
}

function getRadius(){
  if(!isNull(shape.r)) r = shape.r;
}

function collisionRectAndCircle(circle, rect){
  var d = 0;

  var x = circle.x;
  var y = circle.y;
  var r = circle.r;

  var rx = rect.x;
  var ry = rect.y;
  var rw = rect.w;
  var rh = rect.h;

  // 사각형 모서리가 아닌 경우
  if(isContainX(x, rx, rw) && isContainY(y, ry, rh)){
    return true;
  }else if(x < rx && isContainY(y, ry, rh)){
    d = rx - x;
    return isCollide(d, r);
  }else if(x > rx + rw && isContainY(y, ry, rh)){
    d = x - (rx + rw);
    return isCollide(d, r);
  }else if(y < ry && isContainX(x, rx, rw)){
    d = ry - y;
    return isCollide(d, r);
  }else if(y > ry + rh && isContainX(x, rx, rw)){
    d = y - (ry + rh);
    return isCollide(d, r);
  }
  // 사각형 모서리인 경우
  else if(x < rx && y < ry){
    d = getDist(x, y, rx, ry);
    return isCollide(d, r);
  }else if(x > rx + rw && y < ry){
    d = getDist(x, y, rx + rw, ry);
    return isCollide(d, r);
  }else if(x < rx && y > ry + rh){
    d = getDist(x, y, rx, ry + rh);
    return isCollide(d, r);
  }else if(x > rx + rw && y > ry + rh){
    d = getDist(x, y, rx + rw, ry + rh);
    return isCollide(d, r);
  }
}

// Color
function Color(r, g, b, a){
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.a = 1;
  
  if(!isNull(r)) this.r = r;
  if(!isNull(g)) this.g = g;
  if(!isNull(b)) this.b = b;
  if(!isNull(a)) this.a = a;

  this.ToStandard = function(noAlpha){
    if(isNull(noAlpha)){
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }else{
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
  }
}

function Animation(width, height, row, column, limit, imgSrc, fps, columns, rows){
  if(isNull(fps) || fps >= 33){
    this.fps = 1;
  }else{
    this.fps = 33 / fps;
  }
  this.fpsCounter = 0;
  this.frame = 0;
  this.width = width;
  this.height = height;
  this.rowStart = row;
  this.columnStart = column;
  this.row = row;
  this.column = column;
  this.rows = rows;
  this.columns = columns;
  if(isNull(limit) || limit === 0){
    this.limit = 9999999
  }else{
    this.limit = limit - 1;
  }
  this.limitCount = 0;
  this.image = new Image();
  this.image.src = imgSrc;
  this.position = new Vector2(0);
  this.cropPosition = new Vector2(0);

  this.SetLimit = function(limit){
    this.limit = limit - 1;
  }
  this.SetRow = function(num){
    this.row = num;
    this.rowStart = num;
  }
  this.SetColumn = function(num){
    this.column = num;
    this.columnStart = num;
  }
  // 캔버스에 그려야할 위치를 이동시킨다
  this.Update = function(pos){
    if(!isNull(pos)){
      this.position = pos;
    }
    
    this.cropPosition.x = this.width * this.column;
    this.cropPosition.y = this.height * this.row;

    if(isNull(this.columns) || this.columns === 0){
      this.columns = this.image.width / this.width;    
    }
    if(isNull(this.rows) || this.rows === 0){
      this.rows = this.image.height / this.height;
    }
  }
  this.Draw = function(ctx){
    // 스프라이트 애니메이션 위치를 이동시킨다 (다른 그림을 선택한다)
    if(this.fpsCounter === 0){
      if(this.limitCount < this.limit){
        this.limitCount++;
        this.column++;

        if(this.column >= this.columns){
          this.row++;
          this.column = 0;

          if(this.row >= this.rows){
            this.row = this.rowStart;
            this.column = this.columnStart;
            this.limitCount = 0;
          }
        }
      }else{
        this.column = this.columnStart;
        this.row = this.rowStart;
        this.limitCount = 0;
      }
    }
    // 변경한 애니메이션 그린다
    ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, 
                    this.position.x, this.position.y, this.width, this.height);
    
    // fps가 33이면 33번동안 같은 동작 그리고 다시 그림 변경하고 다시 33번동안 그린다
    this.fpsCounter++;
    if(this.fpsCounter >= this.fps){
      this.fpsCounter = 0;
    }

  }
}

// create rectangle
function Rectangle(x, y, w, h){
  if(isNull(x) || isNull(y) || isNull(w) || isNull(h)){
    throw new Error('You did not pass all the valid variables (x, y, w, h)')
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.color = new Color();

  this.collideWithCircle = function(shape){
    return collisionRectAndCircle(shape, this);
  }

  this.collideWithRect = function(shape){
    var x = shape.x;
    var y = shape.y;
    var w = shape.w;
    var h = shape.h;

    var rx = this.x;
    var ry = this.y;
    var rw = this.w;
    var rh = this.h;

    var mx = x+w/2;
    var my = y+h/2;

    if(isContainX(x, rx, rw) && isContainY(y, ry, rh)){
      return true;
    }else if(isContainX(x+w, rx, rw) && isContainY(y, ry, rh)){
      return true;
    }else if(isContainX(x+w, rx, rw) && isContainY(y+h, ry, rh)){
      return true;
    }else if(isContainX(x, rx, rw) && isContainY(y+h, ry, rh)){
      return true;
    }else if(isContainX(mx, rx, rw) && isContainY(my, ry, rh)){ // 중앙지점도 체크
      return true;
    }else{
      return false;
    }
  }

  this.Contains = function(x, y){
    return isContainX(x, this.x, this.w) && isContainY(y, this.y, this.h);
  }

  this.Draw = function(ctx){
    ctx.fillStyle = this.color.ToStandard();
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

// create circle
function Circle(x, y, r){
  if(isNull(x) || isNull(y) || isNull(r)){
    throw new Error('You did not pass all the valid variables (x, y, w, h)')
  }
  this.x = x;
  this.y = y;
  this.w = 2*r;
  this.h = 2*r;
  this.r = r;

  this.collideWithRect = function(shape){
    return collisionRectAndCircle(this, shape);
  }

  this.collideWithCircle = function(shape){
    var r = this.r + shape.r;
    var d = getDist(shape.x, shape.y, this.x, this.y);
    if(d <= r) return true;
    else return false;
  }

  this.Draw = function(ctx, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

Array.prototype.Remove = function(arg, all){
  for(var i=0; i<this.length; i++){
    if(this[i] == arg){
      this.splice(i, 1);

      if(isNull(all)) break; // arg 값을 한번만 제거함
      // all == true 이면 arg 값과 일치하는 모든 값을 제거함
      else i--; // 배열 요소들이 왼쪽으로 이동하므로 검색 위치 i도 왼쪽으로 위치 이동
    } 
  }
}

Array.prototype.RemoveAt = function(position){
  this.splice(position, 1);
}

Array.prototype.Clear = function(){
  this.length = 0;
}

Array.prototype.InsertAt = function(arg, position){
  var arr1 = this.slice(0, position);
  var arr2 = this.slice(position);

  this.Clear();

  for(var i=0; i<arr1.length; i++){
    this.push(arr1[i]);
  }

  this.push(arg)

  for(var j=0; j<arr2.length; j++){
    this.push(arr2[j]);
  }

}

Array.prototype.Contains = function(arg){
  for(var i=0; i<this.length; i++){
    if(this[i]==arg) return true;
  }
  return false;
}

Array.prototype.Occurs = function(arg){
  var counter = 0;
  for(var i=0; i<this.length; i++){
    if(this[i]==arg) counter++;
  }
  return counter;
}

// vector 2d
function Vector2(x, y){
  this.x = 0;
  this.y = 0;

  if(!isNull(x) && isNull(y)){
    this.x = x;
    this.y = x;
  }else{
      // 현재 입력된 좌표로 초기화
    if(!isNull(x)) this.x = x;
    if(!isNull(y)) this.y = y;
  }

  this.prevX = 0;
  this.prevY = 0;

  // 현재 입력된 좌표로 업데이트
  this.Set = function(x, y){
    if(isNull(x) && isNull(y)){
      console.log("No 'x' or 'y' has been passed to Vector2's Set function")
    }else{
      this.prevX = this.x;
      this.prevY = this.y;

      if(!isNull(x) && isNull(y)){
        this.x = x;
        this.y = x;
      }else{
        if(!isNull(x)) this.x = x;
        if(!isNull(y)) this.y = y;
      }
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



