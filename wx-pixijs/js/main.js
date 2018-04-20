
/**
 * 游戏主函数
 * 
 */

var PIXI = require('./libs/pixi.js');
//console.log(PIXI)
var Scroller = require('./libs/scroller.js');
var TWEEN = require('./libs/tween.js');

var Mn, Nn, zn, Wn, Xn, Ln, Fn, Dn, kn, Un, Bn, Rn = false;
var Yn = [Mn, Nn, zn, Wn, Xn, Ln, Fn, Dn, kn, Un, Bn];

export default class Main {
  constructor() {
    this.imgSrc = 'images/';
    this.currentPage = 'main';//Tn
    this.aniFlag = 'slide1';//An
    this.firstLineFlag = false;//Eo
    this.point = {x:0,y:0};//On
    this.pointQ = {x:0,y:0};//Qn
    this.pointG = {x:0,y:0};//Gn
    this.distance = 0;//Jn
    this.dialogFlag = false;//_o
    this.date = new Date();//Hn
    this.objVArr = [];//vo
    this.objK = {};//Kn
    this.$Arr = [];//$n
    this.eArr = [];//eo
    this.iArr = [];//io
    this.nArr = [];//no
    this.lFlag = false;//lo
    this.maskFlag = false;
    this.viewWidth = window.innerWidth;
    this.viewHeight = window.innerHeight;  
    this.container = new PIXI.Container();
    this.loader = PIXI.loader; 
    this.initView();
    this.setStyle();
    
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
    this.scale = this.viewWidth / 750;
    this.height = this.viewHeight / this.scale;
    this.canvasView.resize(750, this.viewHeight / this.scale);
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
    let topScale = top/this.scale;
    let leftScale = left/this.scale;
    console.log(topScale);
    if(this.aniFlag == 'slide1'){
      if(topScale < 942.478){
        if(topScale > 10){
          this.blackTipsContainer.visible = false;
          this.wordAni();
        }else{
          //this.blackTipsContainer.visible = true;
        }
        this.rectAni2.position.x = 942.478 + this.rectAni2.left + 255 - topScale;
        this.rectAni(this.rectAni1, topScale, false);
      }else{
        if (this.dialogFlag){
          this.scroller.__scrollTop = 942.478 * this.scale;
        }else{
          this.handleDialog('dialog1')
        }
      }
    }
  }
  handleDialog(type){
    this.aniFlag = type;
    this.dialogFlag = true;
    this.maskFlag = true;
    if (type == 'dialog1'){
      this.rectAni1.position.x = this.rectAni1.left;
      this.rectAni1.rotation = Math.PI/2 * 2;
      this.rectAni1.footStep[0].scale.set(0,0);
      this.rectAni1.footStep[1].scale.set(0,0);
      this.scroller.__scrollTop = 0;
      setTimeout(()=>{
        setTimeout(()=>{
          console.log('000000')
          this.dialogTextContainer.children[0].visible = true;
          this.dialogTextContainer.children[0].children[1].gotoAndPlay(0);
          this.aniFlag = "dialog1_start";
          this.blackTipsContainer.visible = true;

        },1000)
        this.showHeartAni();
      },200)
    }


  }
  showHeartAni(){
    var self = this;
    new TWEEN.Tween(this.heartSprite.position).to({
      x: this.rectAni1.left + 240 + 78,
      y: 312
    }, 0.5).onComplete(function () {
      self.heartAni.visible = true;
      self.heartAni.play()
    }).start();
    var t = new TWEEN.Tween(this.heartSprite.scale).to({
      x: .8,
      y: .8
    }, 0.5).start(),
    i = new TWEEN.Tween(this.heartSprite.scale).to({
      x: 1,
      y: 1
    }, 0.13),
    n = new TWEEN.Tween(this.heartSprite.scale).to({
      x: .8,
      y: .8
    }, 0.13),
    o = new TWEEN.Tween(this.heartSprite.scale).to({
      x: 1,
      y: 1
    }, 0.13),
    s = new TWEEN.Tween(this.heartSprite.scale).to({
      x: .8,
      y: .8
    }, 0.13).onComplete(function () {
      self.heartAni.visible = false;
      self.heartAni.stop();
      self.heartSprite.visible = false;
    });
    t.chain(i), i.chain(n), n.chain(o), o.chain(s)
  }
  rectAni(ele, top, bol){
    
    let v1 = top%(Math.PI/2*400),
        v2 = parseInt(top/(Math.PI/2*100)),
        v3 = top%(Math.PI/2*100),
        v4 = -v1/(Math.PI/2*100)*255,
        v5 = -v3/(Math.PI/2*100)*255;
    bol && (v4 = 0, v5 = 0);
    if(v1 < Math.PI/ 2 * 100){
      ele.pivot.set(255, 255);
      ele.position.x = ele.left + 255 + v4;
      bol && (v5 = 0);
    }else{
      if(v1 > Math.PI/2*100 && v1 <= Math.PI/2*2*100){
        ele.pivot.set(255,0);
        ele.position.x = ele.left + 255 + 255 + v4;
        bol && (v5 = 255);
      }else{
        if(v1 > Math.PI/2*100*2 && v1<=Math.PI/2*100*3){
          ele.pivot.set(0,0);
          ele.position.x = ele.left + 255*3 + v4;
          bol && (v5 = 510);
        }else{
          if(v1>Math.PI/2 * 100 * 3&& v1<=Math.PI/2*100*4){
            ele.pivot.set(0,255);
            ele.position.x = ele.left + 255 * 4 + v4;
            bol && (v5 = 765);
          }
        }
      }
    }
    
    ele.rotation = v1/100;
    if(v2 % 2 == 0){
      console.log(ele.footStep[0].position,ele.left)
      ele.footStep[0].position.x = ele.left + 255 + v5;
      ele.footStep[1].position.x = ele.left + v5;
      ele.footStep[1].scale.set((255 - v3) / 255, (255 - v3) / 255);
      if(v3 < 50){
        ele.footStep[0].scale.set(v3 / 50, v3 / 50)
      }else{
        ele.footStep[0].scale.set(1, 1);
      }
      v2 == 0 && ele.footStep[1].scale.set(0, 0);
    }else{
      console.log(ele.footStep[1].scale, ele.left, v3)
      ele.footStep[1].position.x = ele.left + 255 + v5;
      ele.footStep[0].position.x = ele.left + v5;
      ele.footStep[0].scale.set((255 - v3) / 255, (255 - v3) / 255);
      if(v3< 50){
        ele.footStep[1].scale.set(v3 / 50, v3 / 50)
      }else{
        ele.footStep[1].scale.set(1, 1)
      }
    }

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
        }, 0.3).onUpdate(function () {
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
    this.initScroller();
    //必须设置此参数才可滑动有效果
    this.scroller && this.scroller.setDimensions(this.viewWidth, this.viewHeight, this.viewWidth, 2e4);
    this.showAnimation();
    this.currentPage = 'firstPage';
    this.dialogContainer.visible = false;
    this.updateLoop();
  }
  renderFirstPage(){
    let self = this;
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
    this.circleSprite1 = circleSprite1;//Se
    //2表示2s
    //Ie
    this.circleTween = new TWEEN.Tween(circleSprite1.position).to({
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
    let step1Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texture);
    step1Sprite.pivot.set(21.5,6);
    step1Sprite.position.set(407, 543);
    step1Sprite.scale.set(0,0);
    let step2Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texture);
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

    let step3Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texture);
    step3Sprite.pivot.set(21.5, 6);
    step3Sprite.position.set(867, 543);
    step3Sprite.scale.set(0, 0);
    step3Sprite.name = 'footStep3';
    let step4Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step.png'].texture);
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
    this.heartSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc +'dialog/heart.png'].texture);
    this.heartSprite.pivot.set(78, 78);
    this.heartSprite.scale.set(0, 0),
    this.heartSprite.position.set(this.rectAni1.left + 240 + 78 - 120, 362);
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
    //Ke
    this.scissorsSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'diamond/scissors.png'].texture);
    this.scissorsSprite.visible = false;
    this.scissorsSprite.position.set(274, 0);
    //diamondScissorsTween
    this.diamondTween = new TWEEN.Tween(this.scissorsSprite.position).to({
      x: 189,
      y: 68
    }, 1).easing(TWEEN.Easing.Quadratic.InOut).delay(0.5).repeat(1 / 0);
    this.dialogScissorsContainer.addChild(textSprite);
    this.dialogScissorsContainer.visible = false;
    this.dialogContainer.addChild(step1Sprite, step2Sprite, step3Sprite, step4Sprite, this.rectAni1, this.rectAni2, this.dialogTextContainer, this.heartAni, this.heartSprite, this.dialogScissorsContainer);
    //nt
    this.holeContainer = new PIXI.Container();
    //ot
    this.holeRect = new PIXI.Graphics();
    this.holeRect.beginFill(2301728);
    this.holeRect.position.set(-2e3, -2e3);
    this.holeRect.drawRect(0, 0, 1e4, 1e4);
    this.holeRect.endFill();
    //Fi
    let diamondFallArr = [];
    for(var i = 0; i< 23; i++){
      diamondFallArr.push(this.imgSrc + "diamond_fall/zsdzxl_" + i + ".png");
    }
    //st
    this.diamondFallAni = new PIXI.extras.AnimatedSprite.fromImages(diamondFallArr);
    this.diamondFallAni.position.set(74, -438);
    this.diamondFallAni.animationSpeed = .2;
    this.diamondFallAni.loop = false;
    //at
    this.trangleContainer = new PIXI.Container();
    this.trangleContainer.visible = false;
    this.trangleContainer.position.set(250, 305);
    //pt
    this.dialog2Container = new PIXI.Container();
    //
    var footStep2Sprite1 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step2.png'].texture);
    footStep2Sprite1.pivot.set(21.5,6);
    footStep2Sprite1.position.set(867,560);
    footStep2Sprite1.scale.set(0,0);
    var footStep2Sprite2 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step2.png'].texture);
    footStep2Sprite2.pivot.set(21.5, 6);
    footStep2Sprite2.position.set(867, 560);
    footStep2Sprite2.scale.set(0, 0);

    this.rectAni3 = new PIXI.extras.AnimatedSprite.fromImages(rectImageArr);
    this.rectAni3.animationSpeed = .1;
    this.rectAni3.gotoAndPlay(2);
    this.rectAni3.left = this.height - 250 - 255;
    this.rectAni3.footStep = [footStep2Sprite1, footStep2Sprite2];
    this.rectAni3.position.set(this.rectAni3.left + 255, 560);
    this.rectAni3.pivot.set(255, 255);
    //xt
    this.stairsContainer = new PIXI.Container();
    this.stairsContainer.visible = false;
    this.stairsContainer.position.set(1876, -200);

    //vt
    this.stairsLlightContainer = new PIXI.Container();

    //mt
    this.stairsBgContainer = new PIXI.Container();

    let stairsBgSprite1 = new PIXI.Sprite(this.loader.resources[this.imgSrc+'stairs/bg1.png'].texture);
    stairsBgSprite1.position.set(69,180);
    let stairsBgSprite2 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/bg_left1.png'].texture);
    let stairsBgSprite3 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/bg_left2.png'].texture);
    stairsBgSprite3.position.set(193,0);
    let stairsBgSprite4 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/bg_right1.png'].texture);
    stairsBgSprite4.position.set(958, 266);
    let stairsBgSprite5 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/bg_right2.png'].texture);
    stairsBgSprite5.position.set(964, 70);
    this.stairsBgContainer.addChild(stairsBgSprite1, stairsBgSprite2, stairsBgSprite3, stairsBgSprite4, stairsBgSprite5);
    this.stairsBgContainer.position.set(1400,-612);
    this.stairsBgContainer.visible = false;
    //St
    this.stairsHoleBgSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/hole_bg.png'].texture);
    this.stairsHoleBgSprite.position.set(2561, -647);
    //bt
    this.stairsHoleCoverSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/hole_cover.png'].texture);
    this.stairsHoleBgSprite.position.set(2561, -794);
    this.holeBg1Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc +'stairs/hole_bg.png'].texture);
    this.holeBg1Sprite.position.set(50,-193);
    this.holeCover1Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'stairs/hole_cover1.png'].texture);
    this.holeCover1Sprite.position.set(50, -340);
    this.holeContainer.addChild(this.holeRect, this.holeBg1Sprite, this.diamondFallAni, this.stairsBgContainer, this.stairsContainer, this.stairsHoleBgSprite, this.trangleContainer, this.stairsHoleCoverSprite, this.holeCover1Sprite, this.dialog2Container, footStep2Sprite1, footStep2Sprite2, this.rectAni3, this.stairsLlightContainer);
    this.holeContainer.visible = false;
    this.holeContainer.position.set(0,250);

    //Et
    this.endContainer = new PIXI.Container();
    this.endContainer.visible = false;

    //Kt
    this.blackTipsContainer = new PIXI.Container();
    let hand2Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'hand2.png'].texture);
    let line4Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'line4.png'].texture);
    line4Sprite.position.set(3, 0);
    line4Sprite.pivot.set(0,0);
    
    new TWEEN.Tween({
      percent: 0
    }).to({
      percent: 100
    }, 2).onUpdate(function () {
      if (this.percent < 45){
        hand2Sprite.alpha = 1
      }else{
        if (this.percent < 80) {
          hand2Sprite.alpha = (35 - (this.percent - 45)) / 35
        } else {
          hand2Sprite.alpha = 0;
        }
      }
      if (this.percent < 50){
        self.blackTipsContainer.position.x = 740 - 140 * this.percent / 50
      }
      if (this.percent < 22){
        line4Sprite.scale.x = this.percent / 22
      }else{
        line4Sprite.scale.x = Math.max(0, (44 - this.percent) / 22)
      }
    }).repeat(1 / 0).easing(TWEEN.Easing.Quadratic.InOut).start()
    this.blackTipsContainer.position.set(600, 600);
    this.blackTipsContainer.addChild(hand2Sprite, line4Sprite);
    this.blackTipsContainer.visible = false;
    //Zt
    this.whiteTipsContainer = new PIXI.Container();
    let handSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'hand.png'].texture);
    let line3Sprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'line3.png'].texture);
    line3Sprite.position.set(3, 0);
    line3Sprite.pivot.set(0, 0);
    new TWEEN.Tween({
      percent: 0
    }).to({
      percent: 100
    }, 2e3).onUpdate(function () {
      if (this.percent < 45){
        handSprite.alpha = 1;
      }else{
        if (this.percent < 80){
          handSprite.alpha = (35 - (this.percent - 45)) / 35
        }else{
          handSprite.alpha = 0
        }
      }
      if (this.percent < 50){
        self.whiteTipsContainer.position.x = 740 - 140 * this.percent / 50
      }
      if (this.percent < 22){
        line3Sprite.scale.x = this.percent / 22
      }else{
        line3Sprite.scale.x = Math.max(0, (44 - this.percent) / 22)
      }
    }).repeat(1 / 0).easing(TWEEN.Easing.Quadratic.InOut).start();

    this.whiteTipsContainer.position.set(600, 600);
    this.whiteTipsContainer.addChild(handSprite, line3Sprite);
    this.whiteTipsContainer.visible = false;

    this.container.addChild(bgRect, this.dialogContainer, this.holeContainer, this.endContainer, this.firstPageContainer, this.firstLineContainer, this.secondLineContainer, this.blackTipsContainer, this.whiteTipsContainer);
    this.container.addChild(this.circleContainer);
  }
  
  bindEvent(){
    //console.log(this.container)
    this.container.interactive = true;
    this.container.buttonMode = true;
    console.log(this.container)
    canvas.addEventListener('touchstart', (e)=>{
      this.startEvent(e);
    })
    canvas.addEventListener('touchmove', (e) => {
      this.moveEvent(e);
    })
    canvas.addEventListener('touchend', (e)=>{
      this.endEvent(e);
    })
  }
  startEvent(e){
    var pageX = e.touches[0].pageX/this.scale;
    var pageY = e.touches[0].pageY/this.scale;
    if (this.maskFlag) {
      this.maskStartEvent(e);
    }
    if (this.currentPage == 'firstPage'){
      this.point = {
        x:pageY,
        y:750-pageX
      };
      this.distance = 0;
      this.circleTween.stop();
      this.circleSprite1.position.x = 250;
      
    } else if (this.currentPage == 'main'){
      
      this.scroller.doTouchStart(e.touches, e.timeStamp);
      this.circleContainer.visible = true;
      this.circleContainer.children[0].position.set(pageY, 750-pageX);
      for (var i = 0; i < this.circleContainer.children.length; i++) {
        var item = this.circleContainer.children[i];
        item.position.set(pageY, 750 - pageX);
      }
    }
  }
  moveEvent(e){
    var pageX = e.touches[0].pageX / this.scale;
    var pageY = e.touches[0].pageY / this.scale;
    if (this.maskFlag) {
      this.maskMoveEvent(e);
    }
    if (this.currentPage == 'firstPage'){
      this.distance = pageY - this.point.x;
      if(this.distance > 0){
        this.distance = 0;
      }else{
        this.distance < -224 && (this.distance = -224);
      }
      this.firstLineContainer.children.forEach((e,t)=>{
        if(t == 9){
          e.position.x = this.distance / 30 * (9 - t) + 304 + 64;
        }else{
          e.position.x = this.distance / 30 * (9 - t) + 38 * t;
        }
      })
      this.secondLineContainer.children.forEach((e, t)=> {
        e.position.x = this.distance / 20 * (8 - t) + 38 * t
      });
      this.circleSprite1.position.x = 250 + this.distance;
      if (this.distance == -224 && this.circleSprite1.scale.x == 0.57){
        new TWEEN.Tween(this.circleSprite1.scale).to({
          x: 1,
          y: 1
        }, 0.3).start();
        setTimeout(()=> {
          var that = this;
          this.distance == -224 && new TWEEN.Tween({
            alpha: 1
          }).to({
            alpha: 0
          }, 0.3).onUpdate(function () {
            that.firstPageContainer.alpha = this.alpha
          }).onComplete(function () {
            that.firstPageContainer.visible = false;
            that.dialogContainer.visible = true;
            that.currentPage = "main";
            that.blackTipsContainer.visible = true;
            that.showOtherCon();
          }).start();
          that.scroller.doTouchStart(e.touches, e.timeStamp);
        }, 0.3)
      }
    } else if (this.currentPage == 'main'){
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
      this.circleContainer.children[0].position.set(pageY, 750-pageX);
      for (var i = 1; i < this.circleContainer.children.length;i++){
        let item = this.circleContainer.children[i];
        Yn[i] && Yn[i].stop();
        Yn[i] = new TWEEN.Tween(item.position).to({
          x: pageY,
          y: 750 - pageX
        }, 0.008 * i).onUpdate(function () {
          item.position.set(this.x, this.y)
        }).start();
      }
    }
  }
  endEvent(e){
    var self = this;
    if (this.maskFlag) {
      this.maskEndEvent(e);
    }
    if (this.currentPage == 'firstPage'){
      if(this.distance > -224){   
        new TWEEN.Tween(this.circleSprite1.scale).to({
          x: .57,
          y: .57
        }, 0.3).start();
        new TWEEN.Tween(this.circleSprite1.position).to({
          x: 250
        }, 0.3).start().onComplete(function () {
          self.circleTween.start()
        });
        this.firstLineContainer.children.forEach(function (e, t) {
          9 == t ? new TWEEN.Tween(e.position).to({
            x: 368
          }, 0.3).start() : new TWEEN.Tween(e.position).to({
            x: 38 * t
          }, 0.3).start()
        });
        this.secondLineContainer.children.forEach(function (e, t) {
          new TWEEN.Tween(e.position).to({
            x: 38 * t
          }, 0.3).start()
        })
      }
    } else if (this.currentPage == 'main'){
      this.scroller.doTouchEnd(e.timeStamp);
      this.circleContainer.visible = false;
    }
  }
  distance(e, t){
    var i = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
    return i
  }
  maskStartEvent(e){
    console.log('000000000000')
    var pageX = e.touches[0].pageX / this.scale;
    var pageY = e.touches[0].pageY / this.scale;
    this.date = new Date();
    this.pointQ.x = pageY;
    this.pointQ.y = 750 - pageX;
    this.pointG = {
      x:pageY,
      y:750 - pageX
    }
    if(this.aniFlag != 'cut1'){
      this.circleContainer.visible = true;
      this.circleContainer.children[0].position.set(pageY, 750 - pageX);
      for (var i = 0; i < this.circleContainer.children.length; i++){
        var item = this.circleContainer.children[i];
        item.position.set(pageY, 750 - pageX);
      }
    }
    if ("cut1" != this.aniFlag && "cut2" != this.aniFlag && "dialog3_start" != this.aniFlag){ 
      return;
    }else{
      this.circleContainer.visible = false;
      this.generateObj(this.pointQ, this.date);
      this.resetData();
      this.objK.x = this.pointQ.x;
      this.objK.y = this.pointQ.y;
      this.$Arr.push(Kn);
      this.eArr.push(Kn);
      this.iArr.push(Kn);
      this.nArr.push(Kn)
    }

  }
  maskMoveEvent(e){
    var pageX = e.touches[0].pageX / this.scale;
    var pageY = e.touches[0].pageY / this.scale;
    this.piontG = {
      x: pageY,
      y: 750 - pageX
    };
    if (this.aniFlag != 'cut1'){
      this.circleContainer.children[0].position.set(pageY, 750 - pageX);
      for (var i = 0; i < this.circleContainer.children.length; i++) {
        var item = this.circleContainer.children[i];
        Yn[i] && Yn[i].stop();
        Yn[i] = new TWEEN.Tween(item.position).to({
          x: pageY,
          y: 750 - pageX
        }, 0.008 * i).onUpdate(function () {
          item.position.set(this.x, this.y)
        }).start()
      }
    }
    if ("cut1" == this.aniFlag || "cut2" == this.aniFlag || "dialog3_start" == this.aniFlag){
      this.circleContainer.visible = false;
      if(!this.lFlag){
        return;
      }
      this.generateObj(this.pointG, this.date);
      var point = {
        x: this.pointG.x,
        y: this.pointG.y
      }
    }
  }
  maskEndEvent(e){

  }
  generateObj(obj,time){
    this.objVArr.push({
      position: obj,
      lineWidth:10,
      time: time
    })
  }
  resetData(){
    Vn = {}, this.objK = {};
    Zn = {}, this.$Arr = [];
    this.eArr = [];
    to = 0, this.iArr = [];
    this.nArr = [], ao = [], ro = [], oo = 0, lo = !0
  }
  getDialogTextArr(){
    let dialogText1Arr = [], dialogText2Arr = [], dialogText3Arr = [], dialogText4Arr = [];
    for(var i = 0; i<5; i++){
      dialogText1Arr.push(this.imgSrc + 'dialog/text1_'+i+'.png');
    }
    for (var i = 0; i < 5; i++) {
      dialogText2Arr.push(this.imgSrc + 'dialog/text2_' + i + '.png');
    }
    for (var i = 0; i < 5; i++) {
      dialogText3Arr.push(this.imgSrc + 'dialog/text3_' + i + '.png');
    }
    for (var i = 0; i < 5; i++) {
      dialogText4Arr.push(this.imgSrc + 'dialog/text4_' + i + '.png');
    }
    return [dialogText1Arr, dialogText2Arr, dialogText3Arr, dialogText4Arr];
  }
  getDialogOutlineArr(){
    let outline1Arr = [], outline2Arr = [], outline3Arr = [], outline4Arr = [];
    for (var i = 0; i < 4; i++) {
      outline1Arr.push(this.imgSrc + 'dialog/outline1_' + i + '.png');
    }
    for (var i = 0; i < 4; i++) {
      outline2Arr.push(this.imgSrc + 'dialog/outline2_' + i + '.png');
    }
    for (var i = 0; i < 4; i++) {
      outline3Arr.push(this.imgSrc + 'dialog/outline3_' + i + '.png');
    }
    for (var i = 0; i < 4; i++) {
      outline4Arr.push(this.imgSrc + 'dialog/outline4_' + i + '.png');
    }
    return [outline1Arr, outline2Arr, outline3Arr, outline4Arr];
  }
  showOtherCon(){
    let dialogTextArr = this.getDialogTextArr();
    let outLineArr = this.getDialogOutlineArr(); 
    if(!Rn){
      Rn = true;
      for(var i = 0; i<4; i++){
        var itemContainer = new PIXI.Container();
        var dialogTextAni = new PIXI.extras.AnimatedSprite.fromImages(dialogTextArr[i]);
        dialogTextAni.animationSpeed = .1;
        dialogTextAni.loop = false;
        itemContainer.position.y = 120;

        var dialogOutlineAni = new PIXI.extras.AnimatedSprite.fromImages(outLineArr[i]);
        dialogOutlineAni.animationSpeed = .1;
        dialogOutlineAni.play();
        dialogOutlineAni.position.x = -40;
        itemContainer.position.x = -15;
        if(i == 0){
          itemContainer.position.x = this.rectAni1.left + 127.5;
          dialogTextAni.position.y = 20;
          dialogTextAni.position.x = -15;
        }
        if (i == 3) {
          itemContainer.position.x = this.rectAni1.left + 127.5;
          dialogTextAni.position.y = 20;
          dialogTextAni.position.x = -10;
        }
        if (i == 1) {
          itemContainer.position.x = (this.height - 460 - 255) / 2 + 460 + 127.5 - 251 + 60;
          dialogTextAni.position.y = 13;
          dialogTextAni.position.x = -16;
        }
        if (i == 2) {
          itemContainer.position.x = (this.height - 460 - 255) / 2 + 460 + 127.5 - 402 + 60;
          dialogTextAni.position.y = 10;
          dialogTextAni.position.x = -23;
        }
        itemContainer.addChild(dialogOutlineAni, dialogTextAni);
        this.dialogTextContainer.addChild(itemContainer);
        itemContainer.visible = false;
      }
    }
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
