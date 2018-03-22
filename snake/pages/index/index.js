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
Page({
   onReady: function(){
      this.ctx = wx.createCanvasContext('snakeCanvas');
      function foodFun() {
         this.x = round(0, windowWidth);
         this.y = round(0, windowHeight);
         this.w = round(10, 20);
         this.h = round(10, 20);
         this.color = "rgb(" + round(0, 255) + "," + round(0, 255) + "," + round(0, 255) + ")";
         function round(min, max) {
            return parseInt(Math.random() * (max - min) + min);
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
   drawSnake: function(obj){
      //var ctx = wx.createCanvasContext('snakeCanvas');
      this.ctx.setFillStyle(obj.color);
      this.ctx.beginPath();
      this.ctx.rect(obj.x, obj.y, obj.w, obj.h);
      this.ctx.closePath();
      this.ctx.fill();
      //ctx.draw();
   },
   snakeAnimation: function(){
      //var ctx = wx.createCanvasContext('snakeCanvas');
      
      frameNum ++ ;
      if(frameNum % 20 == 0){
         //蛇身数组中push上一个蛇头的位置
         snakeBodys.push({
            x: snakeHeader.x,
            y: snakeHeader.y,
            color: '#00ff00',
            w: 20,
            h: 20
         })
         if (snakeBodys.length > 4) {
            snakeBodys.shift();
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
      for (var i = 0; i < foods.length; i++) {
         //console.log(foods[i])
         this.drawSnake(foods[i]);
      }
      //ctx.draw()方法不能放到drawSnake（）这个方法中，否则每次只渲染一个矩形
      //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
      this.ctx.draw();
      requestAnimationFrame(this.snakeAnimation);
   },
   
   snakeStart: function(e){
      startX = e.touches[0].x;
      startY = e.touches[0].y;
   },
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
   snakeEnd: function(){
      snakeDirection = direction;
   }
})
