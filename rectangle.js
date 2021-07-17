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

// create rectangle
function Rectangle(x, y, w, h){
  if(isNull(x) || isNull(y) || isNull(w) || isNull(h)){
    throw new Error('You did not pass all the valid variables (x, y, w, h)')
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

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

  this.Draw = function(ctx, color){
    ctx.fillStyle = color;
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

