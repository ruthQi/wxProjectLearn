//开始点的位置
var startX = 0;
var startY = 0;

//移动点的位置
var moveX = 0;
var moveY = 0;

//差值
var deltaX = 0;
var deltaY = 0;
//蛇头对象：
var snakeHeader = {
   x:0,
   y:0,
   color:'#ff0000',
   w:20,
   h:20
};
//蛇身数组
var snakeBodys = [];
//手指方向
var direction = null;
//蛇的移动方向
var snakeDirection = 'right';
//帧率
var frameNum = 0;
//食物
var foods = [];
var windowWidth = 0;
var windowHeight = 0;

//是否移除身体
var shiftBol = true;
Page({
   onReady: function(){
      this.ctx = wx.createCanvasContext('snakeCanvas');
      //食物的构造函数
      function foodFun() {
         this.x = round(0, windowWidth);
         this.y = round(0, windowHeight);
         this.w = round(10, 20);
         this.h = round(10, 20);
         this.color = "rgb(" + round(0, 255) + "," + round(0, 255) + "," + round(0, 255) + ")";
         function round(min, max) {
            return parseInt(Math.random() * (max - min) + min);
         }
         this.reset = function(){
            this.x = round(0, windowWidth);
            this.y = round(0, windowHeight);
            this.color = "rgb(" + round(0, 255) + "," + round(0, 255) + "," + round(0, 255) + ")";
         }
      }
      wx.getSystemInfo({
         success: (res)=> {
            windowWidth = res.windowWidth;
            windowHeight = res.windowHeight;
            //添加食物
            for (var i = 0; i < 20; i++) {
               var food = new foodFun();
               //console.log(food)
               foods.push(food)
            }
            this.snakeAnimation();
         },
      })
        
   },
   //渲染物体
   drawSnake: function(obj){
      //var ctx = wx.createCanvasContext('snakeCanvas');
      this.ctx.setFillStyle(obj.color);
      this.ctx.beginPath();
      this.ctx.rect(obj.x, obj.y, obj.w, obj.h);
      this.ctx.closePath();
      this.ctx.fill();
      //ctx.draw();
   },
   //碰撞函数
   collision: function(obj1,obj2){
      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var t1 = obj1.y;
      var b1 = t1 + obj1.h;

      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var t2 = obj2.y;
      var b2 = t2 +obj2.h;

      if(r1 > l2 && b1 > t2 && l1<r2 && t1 < b2){
         console.log('撞上了');
         return true;
      }
      return false;
   },
   //动画渲染
   snakeAnimation: function(){
      //var ctx = wx.createCanvasContext('snakeCanvas');
      
      frameNum ++ ;
      if(frameNum % 20 == 0){
         //蛇身数组中push上一个蛇头的位置
         //渲染蛇身
         snakeBodys.push({
            x: snakeHeader.x,
            y: snakeHeader.y,
            color: '#00ff00',
            w: 20,
            h: 20
         })
         if (snakeBodys.length > 4) {
            //为true时移除身体，否则不移除。移除碰撞一次，不移除一次，所以在不移除的情况下，要把shiftBol=true,否则只要               运动不管碰不碰撞，身体都会增加
            if (shiftBol){
               snakeBodys.shift();
            }else{
               shiftBol = true;
            }
            
         }
         switch (snakeDirection) {
            case 'left':
               snakeHeader.x -= snakeHeader.w;
               break;
            case 'right':
               snakeHeader.x += snakeHeader.w;
               break;
            case 'top':
               snakeHeader.y -= snakeHeader.h;
               break;
            case 'bottom':
               snakeHeader.y += snakeHeader.h;
               break;

         }
         
      }
      
      this.drawSnake(snakeHeader);
      for(var i = 0; i < snakeBodys.length;i++){
         var snakeBody = snakeBodys[i];
         this.drawSnake(snakeBody);
      }
      //渲染食物
      //每次页面渲染时都会遍历食物，判断蛇头是否与食物相撞，如果相撞，则不移除身体，随机相撞食物的位置，否则正常移除
      for (var i = 0; i < foods.length; i++) {
         //console.log(foods[i])
         var food = foods[i];
         if (this.collision(snakeHeader, food)){
            shiftBol = false;
            food.reset();
         }
         
         this.drawSnake(food);
      }
      //ctx.draw()方法不能放到drawSnake（）这个方法中，否则每次只渲染一个矩形
      //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
      this.ctx.draw();
      requestAnimationFrame(this.snakeAnimation);
   },
   //touchstart事件
   snakeStart: function(e){
      startX = e.touches[0].x;
      startY = e.touches[0].y;
   },
   //touchmove事件
   snakeMove: function(e){
      moveX = e.touches[0].x;
      moveY = e.touches[0].y;

      deltaX = moveX - startX;
      deltaY = moveY - startY;

      if(Math.abs(deltaX) > Math.abs(deltaY)){//横向滑动
         if(deltaX > 0){
            console.log('right')
            direction = 'right';
         }else{
            console.log('left')
            direction = 'left';
         }
      }else{//纵向滑动
         if(deltaY > 0){
            console.log('bottom')
            direction = 'bottom';
         }else{
            console.log('top')
            direction = 'top';
         }
      }
   },
   //touchend事件
   snakeEnd: function(){
      snakeDirection = direction;
   }
})
