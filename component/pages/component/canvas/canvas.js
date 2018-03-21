Page({

  /**
   * 页面的初始数据
   */
  data: {
      x: 0,
      y:0,
      isHidden:true
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