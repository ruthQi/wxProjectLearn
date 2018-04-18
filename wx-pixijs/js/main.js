
/**
 * 游戏主函数
 * 
 */

var PIXI = require('./libs/pixi.js');
console.log(PIXI)
var Scroller = require('./libs/scroller.js');
var TWEEN = require('./libs/tween.js');
export default class Main {
  constructor() {
    this.imgSrc = 'images/';
    this.currentPage = 'main';//Tn
    this.aniFlag = 'slide1';//An
    this.firstLineFlag = false;//Eo
    this.viewWidth = window.innerWidth;
    this.viewHeight = window.innerHeight;  
    this.container = new PIXI.Container();
    this.loader = PIXI.loader; 
    this.initView();
    this.setStyle();
    this.initScroller();
  }
  initView(){
    this.container.width = this.viewWidth;
    this.container.height = this.viewHeight;
    this.container.pivot.set(0, this.viewHeight+82);
    this.container.rotation = Math.PI / 2;
    /*自己会创建一个 Canvas 画布，而在微信小游戏中已经有了一个现成的 canvas，随后再创建的 canvas 都是离屏的（off-screen），所以，游戏现在是跑在一个不可见的 canvas 里面。所以，我们需要修改我们的初始化方法，让 Phaser 使用微信自动创建的 canvas。*/
    //console.log(canvas);
    let config={
      width: this.viewWidth,
      height: this.viewHeight,
      view:canvas
    }
    //ue
    this.canvasView = new PIXI.CanvasRenderer(config);
    this.loader.add(this.imgSrc + "first/bg.png")
              .add(this.imgSrc + "first/bg1.png")
              .add(this.imgSrc + "first/bg2.png")
              .add(this.imgSrc + "first/bg3.png")
              .add(this.imgSrc + "first/bg4.png")
              .add(this.imgSrc + "first/time.png")
              .add(this.imgSrc + "first/t1_0.png")
              .add(this.imgSrc + "first/t1_1.png")
              .add(this.imgSrc + "first/t1_2.png")
              .add(this.imgSrc + "first/t1_3.png")
              .add(this.imgSrc + "first/t1_4.png")
              .add(this.imgSrc + "first/t1_5.png")
              .add(this.imgSrc + "first/t1_6.png")
              .add(this.imgSrc + "first/t1_7.png")
              .add(this.imgSrc + "first/t1_8.png")
              .add(this.imgSrc + "first/t2_0.png")
              .add(this.imgSrc + "first/t2_1.png")
              .add(this.imgSrc + "first/t2_2.png")
              .add(this.imgSrc + "first/t2_3.png")
              .add(this.imgSrc + "first/t2_4.png")
              .add(this.imgSrc + "first/t2_5.png")
              .add(this.imgSrc + "first/t2_6.png")
              .add(this.imgSrc + "first/t2_7.png")
              .add(this.imgSrc + "first/rect.png")
              .add(this.imgSrc + "first/text.png")
              .add(this.imgSrc + "first/circle1.png")
              .add(this.imgSrc + "first/circle2.png")
              .add(this.imgSrc + "dialog/heart.png")
              .add(this.imgSrc + "diamond/text.png")
              .add(this.imgSrc + "diamond/scissors.png")
              .add(this.imgSrc + "triangle/text.png")
              .add(this.imgSrc + "triangle/scissors.png")
              .add(this.imgSrc + "text4/line0.png")
              .add(this.imgSrc + "text4/line1.png")
              .add(this.imgSrc + "text4/line2.png")
              .add(this.imgSrc + "text4/line3.png")
              .add(this.imgSrc + "circle1.png")
              .add(this.imgSrc + "circle2.png")
              .add(this.imgSrc + "mask.png")
              .add(this.imgSrc + "foot_step.png")
              .add(this.imgSrc + "foot_step2.png")
              .add(this.imgSrc + "stairs/floor.png")
              .add(this.imgSrc + "stairs/floor2.png")
              .add(this.imgSrc + "stairs/floor3.png")
              .add(this.imgSrc + "stairs/floor4.png")
              .add(this.imgSrc + "stairs/stair1_line.png")
              .add(this.imgSrc + "stairs/stair2_main.png")
              .add(this.imgSrc + "stairs/stair3_main.png")
              .add(this.imgSrc + "stairs/stair4_main.png")
              .add(this.imgSrc + "stairs/light.png")
              .add(this.imgSrc + "stairs/bg1.png")
              .add(this.imgSrc + "stairs/bg_left1.png")
              .add(this.imgSrc + "stairs/bg_left2.png")
              .add(this.imgSrc + "stairs/bg_right1.png")
              .add(this.imgSrc + "stairs/bg_right2.png")
              .add(this.imgSrc + "stairs/hole_bg.png")
              .add(this.imgSrc + "stairs/hole_cover.png")
              .add(this.imgSrc + "stairs/hole_cover1.png")
              .add(this.imgSrc + "dialog3/hole.png")
              .add(this.imgSrc + "end_text/t1_0.png")
              .add(this.imgSrc + "end_text/t1_1.png")
              .add(this.imgSrc + "end_text/t1_2.png")
              .add(this.imgSrc + "end_text/t1_3.png")
              .add(this.imgSrc + "end_text/t1_4.png")
              .add(this.imgSrc + "end_text/t1_5.png")
              .add(this.imgSrc + "end_text/t1_6.png")
              .add(this.imgSrc + "end_text/t1_7.png")
              .add(this.imgSrc + "end_text/t1_8.png")
              .add(this.imgSrc + "end_text/t2_0.png")
              .add(this.imgSrc + "end_text/t2_1.png")
              .add(this.imgSrc + "end_text/t2_2.png")
              .add(this.imgSrc + "end_text/t2_3.png")
              .add(this.imgSrc + "end_text/t2_4.png")
              .add(this.imgSrc + "end_text/t2_5.png")
              .add(this.imgSrc + "end_text/t2_6.png")
              .add(this.imgSrc + "end_text/t2_7.png")
              .add(this.imgSrc + "end_text/t2_8.png")
              .add(this.imgSrc + "end_text/t2_9.png")
              .add(this.imgSrc + "end_text/t2_10.png")
              .add(this.imgSrc + "end_text/text_line2.png")
              .add(this.imgSrc + "end_text/plus.png")
              .add(this.imgSrc + "end_text/right_line.png")
              .add(this.imgSrc + "sxz/sxz_0.png")
              .add(this.imgSrc + "sxz/sxz_1.png")
              .add(this.imgSrc + "sxz/sxz_2.png")
              .add(this.imgSrc + "sxz/sxz_3.png")
              .add(this.imgSrc + "sxz/sxz_4.png")
              .add(this.imgSrc + "sxz/sxz_5.png")
              .add(this.imgSrc + "sxz/sxz_6.png")
              .add(this.imgSrc + "sxz/sxz_7.png")
              .add(this.imgSrc + "sxz/sxz_8.png")
              .add(this.imgSrc + "sxz/sxz_9.png")
              .add(this.imgSrc + "sxz/sxz_10.png")
              .add(this.imgSrc + "sxz/sxz_11.png")
              .add(this.imgSrc + "sxz/sxz_12.png")
              .add(this.imgSrc + "sxz/sxz_13.png")
              .add(this.imgSrc + "sxz/sxz_14.png")
              .add(this.imgSrc + "sxz/sxz_15.png")
              .add(this.imgSrc + "sxz/sxz_16.png")
              .add(this.imgSrc + "sxz/sxz_17.png")
              .add(this.imgSrc + "sxz/sxz_18.png")
              .add(this.imgSrc + "sxz/sxz_19.png")
              .add(this.imgSrc + "sxz/sxz_20.png")
              .add(this.imgSrc + "sxz/sxz_21.png")
              .add(this.imgSrc + "sxz/sxz_22.png")
              .add(this.imgSrc + "sxz/sxz_23.png")
              .add(this.imgSrc + "sxz/sxz_24.png")
              .add(this.imgSrc + "sxz/sxz_25.png")
              .add(this.imgSrc + "sxz/sxz_26.png")
              .add(this.imgSrc + "sxz/sxz_27.png")
              .add(this.imgSrc + "sxz/sxz_28.png")
              .add(this.imgSrc + "sxz/sxz_29.png")
              .add(this.imgSrc + "sxz/sxz_30.png")
              .add(this.imgSrc + "sxz/sxz_31.png")
              .add(this.imgSrc + "sxz/sxz_32.png")
              .add(this.imgSrc + "sxz/sxz_33.png")
              .add(this.imgSrc + "sxz/sxz_34.png")
              .add(this.imgSrc + "sxz/sxz_35.png")
              .add(this.imgSrc + "sxz/sxz_36.png")
              .add(this.imgSrc + "sxz/sxz_37.png")
              .add(this.imgSrc + "logo.png")
              .add(this.imgSrc + "hand.png")
              .add(this.imgSrc + "hand2.png")
              .add(this.imgSrc + "line3.png")
              .add(this.imgSrc + "line4.png")
              .add(this.imgSrc + "rect/0.jpg")
              .add(this.imgSrc + "rect/1.jpg")
              .add(this.imgSrc + "rect/2.jpg")
              .add(this.imgSrc + "dialog/heart_0.png")
              .add(this.imgSrc + "dialog/heart_1.png")
              .add(this.imgSrc + "dialog/heart_2.png")
              .add(this.imgSrc + "dialog/heart_3.png")
              .add(this.imgSrc + "dialog/heart_4.png")
              .add(this.imgSrc + "dialog/heart_5.png")
        .load(this.loadComplete);
  
  
  }
  setStyle(){
    if (this.viewWidth < this.viewHeight) {
      this.scale = this.viewWidth / 750;
      this.height = this.viewHeight / this.scale;
      this.canvasView.resize(750, this.viewHeight / this.scale);
      this.scroller && this.scroller.setDimensions(this.viewWidth, this.viewHeight, this.viewWidth, 2e4);
    } else {
      this.scale = this.viewHeight / 750;
      this.height = this.viewWidth / this.scale;
      this.scroller && this.scroller.setDimensions(this.viewWidth, this.viewHeight, 2e4, this.viewHieght);
    }
  }
  initScroller(){
    this.scroller = new Scroller(this.scrollFun, {
      zooming: false,
      animating: true,
      bouncing: false,
      animationDuration: 1000
    })
  }
  scrollFun = (left, top, zoom) => {
    console.log('++++++++++++++++')
    console.log(left, top, zoom)
    console.log('++++++++++++++++')
    this.container.position.y = -top;
    console.log(this.container)
    let topScale = top/this.scale;
    let leftScale = left/this.scale;
    if(this.aniFlag == 'slide1'){
      if(topScale < 942.478){
        if(topScale > 10){
          this.wordAni();
        }else{
          this.rectAni2.position.x = 942.478 + this.rectAni2.left + 255 - topScale;
          this.rectAni(this.rectAni1, topScale, false);
        }
      }
    }
  }
  rectAni(ele, top, bol){
    let v1 = top%(Math.PI/2*400),
        v2 = parseInt(top/(Math.pi/2*100)),
        v3 = top%(Math.PI/2*100),
        v4 = -v1/(Math.PI/2*100)*255,
        v5 = -v3/(Math.PI/2*100)*255;
    bol && (v4 = 0, v5 = 0);
    if(v1 < Math.PI/ 2 * 100){
      ele.pivot.set(255, 255);
      ele.position.x = ele.left + 255 + v4;
      bol && (v5 = 0);
    }else{
      if(v1 > Math.PI/2*100 && v1 <= Math.PI/4*100){
        ele.pivot.set(255,0);
        ele.position.x = ele.left + 255 + 255 + v4;
        bol && (v5 = 255);
      }else{
        if(v1 > Math.PI/4*100 && v1<=Math.PI/6*100){
          ele.pivot.set(0,0);
          ele.position.x = ele.left + 255*3 + v4;
          bol && (v5 = 510);
        }else{
          if(v1>Math.PI/6 * 100&& v1<=Math.PI/800){
            ele.pivot.set(0,255);
            ele.position.x = ele.left + 255 * 4 + v4;
            bol && (v5 = 765);
          }
        }
      }
    }
    ele.rotation = v1/100;

  }
  wordAni(){
    if (!this.firstLineFlag){
      this.firstLineFlag = true;
      this.firstLineContainer.children.forEach(function (e, t) {
        new TWEEN.Tween({
          _this: e,
          alpha: 1
        }).to({
          alpha: 0
        }, 300).onUpdate(function () {
          this._this.alpha = this.alpha
        }).delay(1.2 * Math.random() + 0.3).start()
      });
      this.secondLineContainer.children.forEach(function (e, t) {
        new TWEEN.Tween({
          _this: e,
          alpha: 1
        }).to({
          alpha: 0
        }, 0.3).onUpdate(function () {
          this._this.alpha = this.alpha
        }).delay(1.2 * Math.random() + 0.3).start()
      })
    }
    
  }
  loadComplete = () => {
    this.renderFirstPage();
    this.bindEvent();
    this.showAnimation();
    this.currentPage = 'firstPage';
    this.updateLoop();
  }
  renderFirstPage(){
    //fe==this.container
    //ye
    this.firstPageContainer = new PIXI.Container();
    //Ee
    this.bgSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/bg.png'].texture);
    this.bgSprite.position.set(265, 97);
    //Ae
    let sxzArr = [];
    for (var i = 0; i < 38; i++) {
      sxzArr.push(this.imgSrc + 'sxz/sxz_' + i + '.png');
    }
    this.sxzAni = new PIXI.extras.AnimatedSprite.fromImages(sxzArr);
    this.sxzAni.animationSpeed = 0.25;
    this.sxzAni.loop = false;
    //Pe
    this.timeSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/time.png'].texture);
    this.timeSprite.position.set(336, 607);

    //we
    this.firstLineContainer = new PIXI.Container();
    for (var i = 0; i < 10; i++) {
      if (i == 9) {
        var renderContent = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/rect.png'].texture);
        renderContent.position.x = 368;
        renderContent.position.y = -69;
      } else {
        var renderContent = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/t1_' + i + '.png'].texture);
        renderContent.position.x = 38 * i;
      }
      this.firstLineContainer.addChild(renderContent);
    }
    this.firstLineContainer.position.set(this.height - 539, 514);
    //_e
    this.secondLineContainer = new PIXI.Container();
    for (var i = 0; i < 8; i++) {
      let item = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/t2_' + i + '.png'].texture);
      item.position.x = 38 * i;
      this.secondLineContainer.addChild(item);
    }
    this.secondLineContainer.position.set(this.height - 422, 572);
    //Te
    this.tipsContainer = new PIXI.Container();
    let circleSprite2 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/circle2.png'].texture);
    let circleSprite1 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/circle1.png'].texture);
    circleSprite1.pivot.set(27, 27);
    circleSprite1.scale.set(.57, .57);
    circleSprite1.position.set(250, 27);
    //2表示2s
    new TWEEN.Tween(circleSprite1.position).to({
      x: 100
    }, 2).delay(0.1).easing(TWEEN.Easing.Quadratic.Out).repeat(1 / 0).start();
    var textSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + "first/text.png"].texture);
    textSprite.position.set(205, 48);
    this.tipsContainer.addChild(circleSprite2, circleSprite1, textSprite);
    this.tipsContainer.position.set(this.height - 396, 140);
    this.firstPageContainer.addChild(this.bgSprite, this.sxzAni, this.timeSprite, this.tipsContainer);
    //it
    let bgRect = new PIXI.Graphics();
    bgRect.beginFill(14935004);
    bgRect.drawRect(0, 0, this.height, 750);
    bgRect.endFill();
    //me
    this.circleContainer = new PIXI.Container();
    let circle1Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'circle1.png'].texture);
    circle1Sprite.pivot.set(22, 22);
    this.circleContainer.addChild(circle1Sprite);
    for(var i = 10;i>0;i--){
      var circle2Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'circle2.png'].texture);
      circle2Sprite.pivot.set(22, 22);
      circle2Sprite.alpha = i/10;
      this.circleContainer.addChild(circle2Sprite);
    }
    this.circleContainer.position.set(-22,-22);
    this.circleContainer.visible = false;

    //rect图片
    let rectImageArr = [];
    for(var i = 0; i< 3;i++){
      rectImageArr.push(this.imgSrc + 'rect/'+ i + '.jpg');
    }
    let step1Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texure);
    step1Sprite.pivot.set(21.5,6);
    step1Sprite.position.set(407, 543);
    step1Sprite.scale.set(0,0);
    let step2Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texure);
    step2Sprite.pivot.set(21.5, 6);
    step2Sprite.position.set(407, 543);
    step2Sprite.scale.set(0, 0);
    //Ce
    this.rectAni1 = new PIXI.extras.AnimatedSprite.fromImages(rectImageArr);
    this.rectAni1.animationSpeed = 0.1;
    this.rectAni1.play();
    this.rectAni1.left = (this.height - 460 - 255) / 2,
    this.rectAni1.footStep = [step1Sprite, step2Sprite],
    this.rectAni1.position.set(this.rectAni1.left + 255, 543),
    this.rectAni1.pivot.set(255, 255);

    let step3Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texure);
    step3Sprite.pivot.set(21.5, 6);
    step3Sprite.position.set(867, 543);
    step3Sprite.scale.set(0, 0);
    step3Sprite.name = 'footStep3';
    let step4Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texure);
    step4Sprite.pivot.set(21.5, 6);
    step4Sprite.position.set(867, 543);
    step4Sprite.scale.set(0, 0);
    //Me
    this.rectAni2 = new PIXI.extras.AnimatedSprite.fromImages(rectImageArr);
    this.rectAni2.animationSpeed = 0.1;
    this.rectAni2.gotoAndPlay(2);
    this.rectAni2.left = (this.height - 460 - 255) / 2 + 460,
    this.rectAni2.footStep = [step3Sprite, step4Sprite],
    this.rectAni2.position.set(942.478 + this.rectAni2.left + 255, 543),
    this.rectAni2.pivot.set(255, 255);

    //tt
    this.dialogContainer = new PIXI.Container();
    //Ne
    this.dialogTextContainer = new PIXI.Container();
    //Ve
    let heartSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc +'dialog/heart.png'].texture);
    heartSprite.pivot.set(78, 78);
    heartSprite.scale.set(0, 0),
    heartSprite.position.set(this.rectAni1.left + 240 + 78 - 120, 362);
    //He
    let dialogHeartArr = [];
    for(var i = 0; i< 6; i++){
      dialogHeartArr.push(this.imgSrc+'dialog/heart_'+ i +'.png');
    }
    this.heartAni = new PIXI.extras.AnimatedSprite.fromImages(dialogHeartArr);
    this.heartAni.animationSpeed = 0.2;
    this.heartAni.loop = false;
    this.heartAni.visible = false;
    this.heartAni.position.set(this.rectAni1.left + 240,234);

    //Ze
    this.dialogScissorsContainer = new PIXI.Container();
    this.dialogScissorsContainer.position.set(this.rectAni1.left+255-226,244);
    var textSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc +'diamond/text.png'].texture);
    textSprite.position.set((700 - textSprite.width) / 2, 345);
    var scissorsSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'diamond/scissors.png'].texture);
    scissorsSprite.visible = false;
    scissorsSprite.position.set(274, 0);
    new TWEEN.Tween(scissorsSprite.position).to({
      x: 189,
      y: 68
    }, 1).easing(TWEEN.Easing.Quadratic.InOut).delay(0.5).repeat(1 / 0);
    this.dialogScissorsContainer.addChild(textSprite);
    this.dialogScissorsContainer.visible = false;
    this.dialogContainer.addChild(step1Sprite, step2Sprite, step3Sprite, step4Sprite, this.rectAni1, this.rectAni2, this.dialogTextContainer, this.heartAni, heartSprite, this.dialogScissorsContainer );


    this.container.addChild(bgRect, this.firstPageContainer, this.firstLineContainer, this.secondLineContainer);
  }
  bindEvent(){
    //console.log(this.container)
    this.container.interactive = true;
    this.container.buttonMode = true;
    console.log(this.container)
    console.log(this.scroller)
    canvas.addEventListener('touchstart', (e)=>{
      //console.log('88888', e)
      //var t = e.data.originalEvent;
      this.eventFlag = false;
      this.scroller.doTouchStart(e.touches, e.timeStamp)
    })
    canvas.addEventListener('touchmove', (e) => {
      //console.log('88888', e)
      //var t = e.data.originalEvent;
      if (!this.eventFlag) {
        //console.log('00000000000')
        //var t = e.data.originalEvent;
        this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale)
      }
    })
    canvas.addEventListener('touchend', (e)=>{
      this.scroller.doTouchEnd(e.timeStamp);
      this.eventFlag = true;
    })
  }
  showAnimation(){
    var that = this;
    this.bgSprite.alpha = 0, this.timeSprite.alpha = 0, 
    new TWEEN.Tween({
      alpha: 0
    }).to({
      alpha: 1
    }, 0.5).onUpdate(function () {
      that.bgSprite.alpha = this.alpha
    }).delay(0.5).onComplete(function () {
      that.sxzAni.play()
    }).start(), 
    new TWEEN.Tween({
      alpha: 0
    }).to({
      alpha: 1
    }, 0.5).onUpdate(function () {
      that.timeSprite.alpha = this.alpha
    }).delay(1).start();
    this.firstLineContainer.children.forEach(function (e, t) {
      t < 9 && (e.alpha = 0, new TWEEN.Tween({
        _this: e,
        alpha: 0
      }).to({
        alpha: 1
      }, 0.3).onUpdate(function () {
        this._this.alpha = this.alpha
      }).delay(1.2 * Math.random() + 0.3).start())
    });
    this.secondLineContainer.children.forEach(function (e, t) {
      e.alpha = 0, new TWEEN.Tween({
        _this: e,
        alpha: 0
      }).to({
        alpha: 1
      }, 0.3).onUpdate(function () {
        this._this.alpha = this.alpha
      }).delay(1.2 * Math.random() + 0.3).start()
    }), this.tipsContainer.alpha = 0, new TWEEN.Tween({
      alpha: 0
    }).to({
      alpha: 1
    }, 0.5).onUpdate(function () {
      that.tipsContainer.alpha = this.alpha
    }).delay(1.8).start()
  }
  updateLoop(){
    TWEEN.update();
    requestAnimationFrame(()=>{this.updateLoop()});
    this.canvasView.render(this.container);
  }

  
}
