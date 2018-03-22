Page({

  /**
   * 页面的初始数据
   */
  data: {
      x: 0,
      y:0,
      isHidden:true,
      rectX: 0,
      frameNum:0
  },
  onReady: function(){
     var firstCtx = wx.createCanvasContext('firstCanvas');
     //矩形
     firstCtx.setStrokeStyle('#ff00ff');
     firstCtx.setLineWidth(5);
     firstCtx.rect(0,0,200,200);
     firstCtx.stroke();
     //笑脸
     firstCtx.setStrokeStyle('#FF0000');
     firstCtx.setLineWidth(2);
     firstCtx.moveTo(160,100);
     /*
      arc(x,y,r,ang1,ang2,boolean):
      x,y表示圆点坐标；
      r:圆弧半径
      ang1,ang2:表示圆弧的起止角度；
      boolean:指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
     */
     firstCtx.arc(100, 100, 60, 0, 2 * Math.PI, true);
     firstCtx.moveTo(140, 100);
     firstCtx.arc(100, 100, 40, 0, Math.PI, false);
     firstCtx.moveTo(85, 80);
     firstCtx.arc(80, 80, 5, 0, 2 * Math.PI, true);
     firstCtx.moveTo(125, 80);
     firstCtx.arc(120, 80, 5, 0, 2 * Math.PI, true);
     firstCtx.stroke();
     firstCtx.draw();

     //第二个canvas
   //   var secondCanvas = wx.createCanvasContext('secondCanvas');
   //   secondCanvas.arc(5,5,5,0,2*Math.PI);
   //   secondCanvas.setFillStyle('#aaa');
   //   secondCanvas.fill();
   //   secondCanvas.draw();
      //第三个canvas--动画
     this.animationFun();
     
  },
  animationFun:function(){
     let rectX = this.data.rectX;
     let frameNum = this.data.frameNum;
     rectX++;
     frameNum++;
     this.setData({
        rectX: rectX,
        frameNum: frameNum
     })
     //每隔4帧渲染
     if(frameNum%4 == 0){
        //console.log(this.data.rectX)
        if (this.data.rectX > 200) {
           return;
        }
        this.moveRect();
        //console.log(frameNum, rectX)
     } 
     requestAnimationFrame(this.animationFun);
  },
  moveRect: function(){
     var thirdCanvas = wx.createCanvasContext('thirdCanvas');
     thirdCanvas.setStrokeStyle('#ffff00');
     //thirdCanvas.setLineWidth(2);
     thirdCanvas.rect(this.data.rectX, 20, 50, 50);
     thirdCanvas.setFillStyle('#ea0000');
     thirdCanvas.fill();//填充
     thirdCanvas.stroke();//线
     thirdCanvas.draw();
  },
  start: function(e){
     console.log(e)
     this.setData({
        isHidden: false,
        x: e.touches[0].x,
        y: e.touches[0].y
     })
  },
  move: function(e){
     console.log(e)
     this.setData({
        x: e.touches[0].x,
        y: e.touches[0].y
     })
  },
  end: function(e){
      this.setData({
         isHidden:true
      })
  }
  
})