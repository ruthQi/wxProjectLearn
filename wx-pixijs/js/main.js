
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
    this.cCount = 0;
    this.wCount = 0;//wo
    this.dialogFlag = false;//_o
    this.dialog3Flag = false;//bo
    this.date = new Date();//Hn
    this.objVArr = [];//vo
    this.objK = {};//Kn
    this.$Arr = [];//$n
    this.eArr = [];//eo
    this.iArr = [];//io
    this.nArr = [];//no
    this.rArr = [];//ro
    this.aArr = [];//ao
    this.lFlag = false;//lo
    this.gFlag = false;//go
    this.oFlag = false;//_o
    this.arrIndex = 0;//to
    this.sArr = [{//so
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }];
    this.pArr = [{//po
      figure: 5,
      figureName: "\u5de6\u6a2a",
      rule: [{
        style: [0],
        min: 1,
        max: 3
      }]
    }, {
      figure: 1,
      figureName: "\u53f3\u6a2a",
      rule: [{
        style: [1],
        min: 1,
        max: 3
      }]
    }, {
      figure: 2,
      figureName: "\u7ad6",
      rule: [{
        style: [2, 3],
        min: 1,
        max: 3
      }]
    }, {
      figure: 3,
      figureName: "\u5de6\u659c",
      rule: [{
        style: [4, 7],
        min: 1,
        max: 3
      }]
    }, {
      figure: 4,
      figureName: "\u53f3\u659c",
      rule: [{
        style: [5, 6],
        min: 1,
        max: 3
      }]
    }];
    this.oIndex = 0;//oo
    this.mCount = 0;//mo
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
    //console.log(topScale);
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
    if(this.aniFlag == 'slide2'){
      //console.log('************topScale', topScale)
      this.handleSlide2(topScale);
    }
  }
  handleSlide2(topScale){//R()
    if(topScale > 10){
      this.blackTipsContainer.visible = false;
    }else{
      this.blackTipsContainer.visible = true;
    }
    var dis = this.height + this.rectAni1.left;
    this.textContainer.position.x = dis - topScale;
    
    if (topScale > 845 && 0 == this.textContainer.children[0].hasCrashed){
      this.textContainer.children[0].hasCrashed = true;
      this.textContainer.children[0].gotoAndPlay(11);
    }
    if (topScale > 1460 && 0 == this.textContainer.children[1].hasCrashed){
      this.textContainer.children[1].hasCrashed = !0;
      this.textContainer.children[1].gotoAndPlay(11);
    }
    if (topScale > 2070 && 0 == this.textContainer.children[2].hasCrashed) {
      this.textContainer.children[2].hasCrashed = !0;
      this.textContainer.children[2].gotoAndPlay(11);
    }
    if (topScale > 3000 && 0 == this.textContainer.children[3].hasCrashed) {
      this.diamond1Ani.visible = false;//this.diamond1Ani
      this.diamond1Ani.footStep.visible = false;
      this.textContainer.children[3].hasCrashed = !0;
      this.textContainer.children[3].gotoAndPlay(1);
      this.handleFall1();
    }
    if (topScale < 845 && 1 == this.textContainer.children[0].hasCrashed) {
      this.showTextAni(this.textContainer.children[0]);
    }
    if (topScale < 1460 && 1 == this.textContainer.children[1].hasCrashed) {
      this.showTextAni(this.textContainer.children[1]);
    }
    if (topScale < 2070 && 1 == this.textContainer.children[2].hasCrashed) {
      this.showTextAni(this.textContainer.children[2]);
    }
    let num = topScale % 600, v1 = 307, v2 = 200, v3 = 300, v4 = 400;
    if (num < v2){
      this.diamond1Ani.rotation = num / 1e3 / 2;
      this.diamond1Ani.position.x = v1 - 0.8 * num;
      this.diamond1Ani.position.y = 298;
      this.diamond1Ani.footStep.position.x = v1 - 0.8 * num;
      this.diamond1Ani.footStep.scale.set((1000-num)/1000);
    }
    if(num > v2 && num <= v3){
      this.diamond1Ani.rotation = (v2/1000-(num-v2)/1000*2)/2;
      this.diamond1Ani.position.x = v1- 0.8 * v2 + 1.6 *(num-v2);
      this.diamond1Ani.position.y = 298 - (num-v2);
      this.diamond1Ani.footStep.position.x = v1 - 0.8 * v2 + 1.6 *(num-v2);
      this.diamond1Ani.footStep.scale.set((1000 - v2) / 1000 - (num - v2)/100 * 0.8);
    }
    if(num > v3 && num <= v4){
      this.diamond1Ani.rotation = -(num-v3)/1000;
      this.diamond1Ani.position.x = v1 - 0.8 * v2 + 1.6 * (num - v2);
      this.diamond1Ani.position.y = 198 + (num - v3);
      this.diamond1Ani.footStep.position.x = v1 - 0.8 * v2 + 1.6 * (num - v2);
      this.diamond1Ani.footStep.scale.set((num - v3) / 100 * 0.8);
    }
    if(num > v4){
      this.diamond1Ani.rotation = -(v4 - v3) / 1000+(num-v4)/2000;
      this.diamond1Ani.position.x = v1 - 0.8 * v2 + 1.6 * (v4 - v2) - 0.8 * (num-v4);
      this.diamond1Ani.position.y = 298;
      this.diamond1Ani.footStep.position.x = v1 - 0.8 * v2 + 1.6 * (v4 - v2) - 0.8 * (num - v4);
      this.diamond1Ani.footStep.scale.set(0.8 + (num - v4)/100 * 0.2);
    }
  }
  showTextAni(e){//Q()
    if (!e.timer){
      e.hasCrashed = false;
      e.timer = setInterval(() =>{
        var t = e.currentFrame;
        if (11 == t || 0 == t){
          clearInterval(e.timer);
          e.timer = null
        }
        e.gotoAndStop(t - 1);
      }, 50)
    }
  }
  handleFall1(){//G
    this.aniFlag = 'fall1';
    var self = this;
    new TWEEN.Tween(this.textContainer.position).to({
      x: self.height + self.rectAni1.left - 3450
    }, 0.7).start();
    new TWEEN.Tween(this.textContainer.position).to({
      y: -800
    }, 1.3).delay(0.8).onComplete(function () {
      new TWEEN.Tween(self.holeContainer.position).to({
        y: 0
      }, 0.5).start();
      self.holeContainer.visible = true; 
      self.diamondFallAni.play();
      self.diamondFallAni.onFrameChange = function () {
        if (22 == this.currentFrame){
          this.stop();
          this.visible = false;
          self.trangleContainer.visible = true;
          self.handleDialog("dialog2")
        }
      }
    }).start()
  }
  handleDialog(type){//T()
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
          //console.log('000000')
          this.dialogTextContainer.children[0].visible = true;
          this.dialogTextContainer.children[0].children[1].gotoAndPlay(0);
          this.aniFlag = "dialog1_start";
          this.blackTipsContainer.visible = true;

        },1)
        this.showHeartAni();
      },0.2)
    }
    if (type == 'dialog2'){
      this.rectAni3.left = this.height - 250 - 255;
      this.rectAni3.position.set(this.rectAni3.left + 255, 560);
      setTimeout(() => {
        this.dialog2Container.children[0].visible = true;
        this.dialog2Container.children[0].children[1].play();
        this.aniFlag = "dialog2_start";
        this.whiteTipsContainer.visible = true;
        }, 0.2)
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
    //console.log('+++++++++++++++++++++++')
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
    //console.log('$$$$$$$$$$$$$$$$$$$$$$$v2', v2)
    if(v2 % 2 == 0){
      //console.log(ele.footStep[0].position,ele.left)
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
      //console.log(ele.footStep[1].scale, ele.left, v3)
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
  rectAni2(ele, top, bol) {

    let v1 = top % (Math.PI / 2 * 400),
      v2 = parseInt(top / (Math.PI / 2 * 100)),
      v3 = top % (Math.PI / 2 * 100),
      v4 = -v1 / (Math.PI / 2 * 100) * 255,
      v5 = -v3 / (Math.PI / 2 * 100) * 255;
    bol && (v4 = 0, v5 = 0);
    if (v1 > -Math.PI / 2 * 100) {
      ele.pivot.set(0, 255);
      ele.position.x = ele.left + v4;
      bol && (v5 = 0);
    } else {
      if (v1 < -Math.PI / 2 * 100 && v1 > -Math.PI / 2 * 2 * 100) {
        ele.pivot.set(0, 0);
        ele.position.x = ele.left - 255 + v4;
        bol && (v5 = -255);
      } else {
        if (v1 < -Math.PI / 2 * 100 * 2 && v1 >= -Math.PI / 2 * 100 * 3) {
          ele.pivot.set(255, 0);
          ele.position.x = ele.left -510 + v4;
          bol && (v5 = -510);
        } else {
          if (v1 < Math.PI / 2 * 100 * 3 && v1 >= -Math.PI / 2 * 100 * 4) {
            ele.pivot.set(255, 255);
            ele.position.x = ele.left -765 + v4;
            bol && (v5 = -765);
          }
        }
      }
    }


    ele.rotation = v1 / 100;
    if (v2 % 2 == 0) {
      //console.log(ele.footStep[0].position, ele.left)
      ele.footStep[0].position.x = ele.left + v5;
      ele.footStep[1].position.x = ele.left + v5 + 255;
      ele.footStep[1].scale.set((255 + v3) / 255, (255 + v3) / 255);
      if (v3 > -50) {
        ele.footStep[0].scale.set(-v3 / 50, -v3 / 50)
      } else {
        ele.footStep[0].scale.set(1, 1);
      }
      v2 == 0 && ele.footStep[1].scale.set(0, 0);
    } else {
      //console.log(ele.footStep[1].scale, ele.left, v3)
      ele.footStep[1].position.x = ele.left + v5;
      ele.footStep[0].position.x = ele.left + v5 + 255;
      ele.footStep[0].scale.set((255 + v3) / 255, (255 + v3) / 255);
      if (v3 > -50) {
        ele.footStep[1].scale.set(-v3 / 50, -v3 / 50)
      } else {
        ele.footStep[1].scale.set(1, 1)
      }
    }
    if ('dialog3_end' == this.aniFlag && top + this.height < 1060 && !this.dialog3Flag){
      this.dialog3Tween();
    }

  }
  dialog3Tween(){//W()

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
    //$e
    this.textContainer = new PIXI.Container();
    this.textContainer.position.set(this.height + this.rectAni1.left, 0);
    //this.textContainer.visible = false;
    this.dialogContainer.addChild(step1Sprite, step2Sprite, step3Sprite, step4Sprite, this.rectAni1, this.rectAni2, this.dialogTextContainer, this.heartAni, this.heartSprite, this.textContainer, this.dialogScissorsContainer);
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
    //console.log(this.container)
    canvas.addEventListener('touchstart', (e)=>{
      this.startEvent(e);
    })
    canvas.addEventListener('touchmove', (e) => {
      //console.log('@@@@@@@@@@@@@@@@@@@@@@')
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
    //console.log('00000000000000000000000000000000099999', pageX, pageY)
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
        //console.log('======================')
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
      //console.log('xxxxxxxxxxxxxxxxx')
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
  distanceFun(e, t){
    var i = Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
    return i;
  }
  angle(e, t) {
    var i = 100 * Math.atan((t.y - e.y) / (t.x - e.x));
    return i
  }
  maskStartEvent(e){
    //console.log('000000000000')
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
      this.$Arr.push(this.objK);
      this.eArr.push(this.objK);
      this.iArr.push(this.objK);
      this.nArr.push(this.objK)
    }

  }
  maskMoveEvent(e){
    //console.log('%%%%%%%%%%%%%%%%%',e)
    var pageX = e.touches[0].pageX / this.scale;
    var pageY = e.touches[0].pageY / this.scale;
    this.pointG = {
      x: pageY,
      y: 750 - pageX
    };
    //this.piontG = pointG;
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
      //console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
      this.circleContainer.visible = false;
      if(!this.lFlag){
        return;
      }
      this.generateObj(this.pointG, this.date);
      var point = {
        x: this.pointG.x,
        y: this.pointG.y
      };
      //console.log('9999999999999999@@@@@@@@@@', point, this.pointG)
      var distance = this.distanceFun(this.eArr[this.eArr.length-1], point);
      //console.log(distance, this.eArr)
      if(distance > 10){
        this.eArr.push(point);
        if (this.eArr.length >= 3 && this.eArr.length - this.arrIndex >= 5) {
          let curItem = this.eArr[this.arrIndex];
          let nextItem = this.eArr[this.arrIndex + 1];
          let lastItem = this.eArr[this.eArr.length - 1];
          let last3Item = this.eArr[this.eArr.length - 3];
          let last2Item = this.eArr[this.eArr.length - 2];
          //console.log(curItem, nextItem, lastItem, last2Item, last3Item)
          let angle1 = this.getAngleBetween(last3Item, last2Item, last2Item, nextItem);
          let angle2 = this.getAngleBetween(curItem, nextItem, nextItem, lastItem);

          this.arrIndex = this.eArr.length - 1;
          this.nArr.push(this.eArr[this.eArr.length - 1]);
          this.nArr.push(this.eArr[this.arrIndex]);
          //console.log('move<10**************this.nArr', this.nArr)
          if (this.nArr.length > 1) {
            this.rArr.push({
              firstPoint: this.nArr[this.nArr.length - 3],
              endPoint: this.nArr[this.nArr.length - 2]
            })
          }
          if (angle1 >= 40 || angle2 >= 20) {
            this.arrIndex = this.eArr.length - 1;
            this.iArr.push(this.eArr[this.arrIndex - 1]);
            this.iArr.push(this.eArr[this.arrIndex]);
            //console.log('move<10**************this.iArr', this.iArr)
            if (this.iArr.length > 1) {
              this.aArr.push({
                firstPoint: this.iArr[this.iArr.length - 3],
                endPoint: this.iArr[this.iArr.length - 2]
              })
            }
          }
        }
      }
      this.$Arr.push(point);
      this.objK = point;
      this.changeStyle(this.rArr);
      for (var x = "", i = 0; i < this.pArr.length; i++) {
        var w = this.figureShape(this.rArr, this.pArr[i].rule);
        //console.log('======w', w)
        if(w === !0){
          x = this.pArr[i].figureName;
          this.oIndex = this.pArr[i].figure
        }
        //console.log('move',this.oIndex)
      }
      if (this.aniFlag == 'cut1') {
        this.showCut1(this.oIndex)//v
      } else if (this.aniFlag == 'cut2') {
        this.showCut2(this.oIndex);//m
      }
    }
  }
  figureShape(e, t) {
    for (var i = e.length, n = i - 1, o = t.length - 1; o >= 0; o--) {
      for (var s = 0; n >= 0; n--) {
        for (var a = !1, r = 0; r < t[o].style.length; r++) if (e[n].style == t[o].style[r]) {
          s++ , a = !0;
          break
        }
        if (!a) break
      }
      if (!(s >= t[o].min && s <= t[o].max)) return !1
    }
    return !(n > -1)
  }
  showCut1(e){
    //console.log('***************showCut1', e)
    var t = {
      x: (this.objK.x + this.pointQ.x) / 2,
      y: (this.objK.y + this.pointQ.y) / 2
    };
    if(e == 3){
      if (t.x <= 540 + this.rectAni1.left - 152 && t.y <= 400){
        this.showSlide2(0)
      } else if (t.x > 540 + this.rectAni1.left - 152 && t.y > 400){
        this.showSlide2(3)
      }
    }else if(e == 4){
      if (t.x > 540 + this.rectAni1.left - 152 && t.y <= 400){
        this.showSlide2(1)
      } else if (t.x <= 540 + this.rectAni1.left - 152 && t.y > 400){
        this.showSlide2(2)
      }
    }
  }
  showSlide2(e){
    //console.log('e', e)
    this.scissorsSprite.visible = true;
    this.diamondTween.stop();
    this.scissorsSprite.visible = false;
    if (e != 0 || this.diamondltAni.hasDropped){
      //console.log('e == 0')
      if (1 != e || this.diamondrtAni.hasDropped){
        //console.log('e == 1')
        if (2 != e || this.diamondlbAni.hasDropped){
          //console.log('e == 2')
          if (3 == e && !this.diamondrbAni.hasDropped){
            //console.log('e == 3')
            this.diamondrbAni.hasDropped = true;
            this.diamondrbAni.gotoAndPlay(3);
            this.bloodAni.play();
            this.lineAni2.visible = false;
            this.lineRAni2.visible = true;
            this.cCount++;
          }
        }else{
          this.diamondlbAni.hasDropped = true;
          this.diamondlbAni.gotoAndPlay(3);
          this.blood2Ani.play();
          this.lineAni.visible = false;
          this.lineRAni.visible = true;
          this.cCount++;
        }
      }else{
        this.diamondrtAni.hasDropped = true;
        this.diamondrtAni.gotoAndPlay(3);
        this.bloodAni2.play();
        this.lineBSAni2.visible = false;
        this.lineRSAni2.visible = true;
        this.cCount++
      }
    }else{
      this.diamondltAni.hasDropped = !0;
      this.diamondltAni.gotoAndPlay(3);
      this.blood2Ani2.play();
      this.lineBSAni.visible = !1;
      this.lineRSAni.visible = !0;
      this.cCount++;
    }
    if(this.cCount == 4){
      this.aniFlag = 'slide2';
      setTimeout(()=>{
        this.setmaskFlag();
      },1.2)
    }
  }
  setmaskFlag() {
    //console.log('setmaskFlag====================')
    var self = this;
    if(!this.gFlag){
      this.blackTipsContainer.visible = true;
      this.diamond1Ani.footStep.visible = true;
      this.scroller.__scrollTop = 0;
      this.gFlag = true;
      new TWEEN.Tween({
        alpha: 1
      }).to({
        alpha: 0
      }, 0.3).onUpdate(function () {
        var e = this.alpha;
        self.dialogScissorsContainer.children.forEach(function (t, i) {
          1 != i && 2 != i && (t.alpha = e)
        })
      }).onComplete(function () {
        self.maskFlag = false;
      }).start()
    }
  }
  showCut2(){

  }

  changeStyle(e) {
    for (var t = e.length, i = 0; i < t; i++) {
      var n = this.getAngleBetween(e[i].firstPoint, e[i].endPoint, this.sArr[0], this.sArr[1]),
        o = e[i].firstPoint.x,
        s = e[i].firstPoint.y,
        a = e[i].endPoint.x,
        r = e[i].endPoint.y,
        p = 15;
        //console.log(n,p)
    
      n < p ? (e[i].style = 1, e[i].styleName = "right") : n > 180 - p ? (e[i].style = 0, e[i].styleName = "left") : n > 90 - p && n < 90 + p ? r >= s ? (e[i].style = 2, e[i].styleName = "down") : (e[i].style = 3, e[i].styleName = "up") : a >= o && r <= s ? (e[i].style = 4, e[i].styleName = "up-right") : a < o && r < s ? (e[i].style = 5, e[i].styleName = "up-left") : a >= o && r >= s ? (e[i].style = 6, e[i].styleName = "down-right") : a < o && r > s && (e[i].style = 7, e[i].styleName = "down-left")
    }
  }
  getAngleBetween(e, t, i, n) {
    //console.log('=========',e, t, i, n)
    var o = {
      x: t.x - e.x,
      y: t.y - e.y
    },
      s = {
        x: n.x - i.x,
        y: n.y - i.y
      },
      a = o.x * s.x + o.y * s.y,
      r = Math.sqrt(Math.pow(o.x, 2) + Math.pow(o.y, 2)) * Math.sqrt(Math.pow(s.x, 2) + Math.pow(s.y, 2)),
      p = a / r;
    p > 1 && (p = 1);
    //console.log('angle', a,r,p)
    var l = Math.acos(p),
      d = 180 * l / Math.PI;
    return d
  }
  maskEndEvent(){
    var flag = true;
    if(this.pointG && this.pointG.x - this.pointQ.x > 0){
      flag = false;
    }
    if (this.aniFlag == 'dialog1_start'){
      if (4 == this.mCount) return;
      if(flag){
        this.mCount ++;
        this.blackTipsContainer.visible = false;
      }else{
        this.mCount > 0 && this.mCount --;
      }
      if(this.mCount == 4){
        for(var i = 0; i< 4;i++){
          this.dialogTextContainer.children[i].visible = false;
        }
        this.showTween({
          moveItem: this.rectAni2,
          targetLeft: 500,
          forwards: !0
        });
        this.showTween({
          moveItem: this.rectAni1,
          targetLeft: 157.08,
          forwards: !0,
          time: 300
        }, ()=>{
          this.rectAni1.footStep[0].scale.set(0, 0);
          this.rectAni1.footStep[1].scale.set(0, 0);
          this.showCut('cut1');
        });
        this.maskFlag = true;
        return;
      }
      for(var j = 0;j<4;j++){
        this.dialogTextContainer.children[j].visible = false;
      }
      //console.log('this.mCount', this.mCount, this.dialogTextContainer.children)
      this.dialogTextContainer.children[this.mCount].visible = true;
      this.dialogTextContainer.children[this.mCount].children[1].gotoAndPlay(0);
    }
    if ("dialog2_start" == this.aniFlag) {
      if (3 == this.wCount) return;
      if(flag){
        this.wCount++;
        this.whiteTipsContainer.visible = false;
      }else{
        this.wCount > 0 && this.wCount--;
      }
      if(this.wCount == 3){
        for(var i = 0; i < 3;i++){
          this.dialog2Container.children[i].visible = false;
        }
        this.showTween({
          moveItem: this.rectAni3,
          targetLeft: 500,
          forwards: !0
        }, ()=>{
          this.rectAni3.visible = false;
          this.rectAni3.footStep[0].scale.set(0, 0);
          this.rectAni3.footStep[1].scale.set(0, 0);
          this.showCut('cut2');
        })
      }
      for (var i = 0; i < 3; i++) {
        this.dialog2Container.children[i].visible = false;
      }
      this.dialog2Container.children[this.wCount].visible = true;
      this.dialog2Container.children[this.wCount].children[1].play();
    }
    if ("cut1" == this.aniFlag || "cut2" == this.aniFlag || "dialog3_start" == this.aniFlag){
      if (!this.lFlag) return;
      this.lFlag = false;
      if (this.eArr.length - this.arrIndex == 1){
        this.arrIndex = this.eArr.length - 1;
        this.iArr.push(this.eArr[this.arrIndex - 1]);
        this.iArr.push(this.eArr[this.arrIndex]);
        //console.log('end this.iArr', this.iArr)
        if(this.iArr.length > 1){
          this.aArr.push({
            firstPoint: this.iArr[this.iArr.length - 2],
            endPoint: this.iArr[this.iArr.length - 1]
          });
        }
      }else if(this.iArr.length <= 2){
        return;
      }
      
      this.changeStyle(this.aArr)
      for (var o = "", n = 0; n < this.pArr.length; n++) {
        var s = this.figureShape(this.aArr, this.pArr[n].rule);
        //console.log('s', s)
        if(s){
          o = this.pArr[n].figureName;
          this.oIndex = this.pArr[n].figure
        }
      }
      //console.log('end', this.oIndex)
      if ("cut1" == this.aniFlag){
        this.showCut1(this.oIndex)
      } else if ("cut2" == this.aniFlag){
        this.showCut2(this.oIndex)
      }
    }
  }
  showTween(e, t){//k()
    var self = this;
    var i = e.time ? e.time/1000 : 1;
    e.targetLeft < 0 ? new TWEEN.Tween({
      left: 0
    }).to({
      left: e.targetLeft
    }, i).onUpdate(function () {
      self.rectAni2(e.moveItem, this.left, e.forwards)
    }).onComplete(function () {
      t && t()
    }).delay(0.5).start() : new TWEEN.Tween({
      left: 0
    }).to({
      left: e.targetLeft
    }, i).onUpdate(function () {
      //console.log('=======================')
      self.rectAni(e.moveItem, this.left, e.forwards)
    }).onComplete(function () {
      t && t()
    }).delay(0.5).start()
  }
  showCut(e){
    this.aniFlag = e;
    if(e == 'cut1'){
      this.diamondTween.start();
      this.scissorsSprite.visible = true;
      this.dialogScissorsContainer.visible = true;
      this.rectAni1.visible = false;
    }else{
      this.lineWAni.visible = true;
      this.triangleSciss.visible = true;
      this.triangleScissorsTween.start();
      this.triangleTextSprite.visible = true;
      this.oFlag = false;
    }
  }
  generateObj(obj,time){
    this.objVArr.push({
      position: obj,
      lineWidth:10,
      time: time
    })
  }
  resetData(){
    //Vn = {}, 
    this.objK = {};
    //Zn = {}, 
    this.$Arr = [];
    this.eArr = [];
    this.arrIndex = 0;
    this.iArr = [];
    this.nArr = [];
    this.aArr = [];
    this.lFlag = true;
    this.rArr = [];
    this.oIndex = 0;
    
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
      let lineArr = [];
      for(var i = 0;i<5;i++){
        lineArr.push(this.imgSrc+'line/'+i+'.png');
      }
      //Re
      this.lineAni = new PIXI.extras.AnimatedSprite.fromImages(lineArr),
      this.lineAni.animationSpeed = .4;
      this.lineAni.position.set(291, 197);
      this.lineAni.rotation = Math.PI / 180 * 57.2;
      this.lineAni.pivot.set(142, 0);
      this.lineAni.play();
      //qe
      this.lineAni2 = new PIXI.extras.AnimatedSprite.fromImages(lineArr),
      this.lineAni2.animationSpeed = .4;
      this.lineAni2.position.set(419, 196);
      this.lineAni2.rotation = -Math.PI / 180 * 58.5;
      this.lineAni2.pivot.set(142, 0);
      this.lineAni2.play();
      let lineBSArr = []; 
      for(var i = 0; i<5;i++){
        lineBSArr.push(this.imgSrc + 'line/b_s_'+i+'.png');
      }
      //Je
      this.lineBSAni = new PIXI.extras.AnimatedSprite.fromImages(lineBSArr);
      this.lineBSAni.animationSpeed = .4, this.lineBSAni.position.set(256, 69);
      this.lineBSAni.rotation = -Math.PI / 180 * 40;
      this.lineBSAni.pivot.set(64, 0), this.lineBSAni.play();
      //Ye
      this.lineBSAni2 = new PIXI.extras.AnimatedSprite.fromImages(lineBSArr);
      this.lineBSAni2.animationSpeed = .4, this.lineBSAni2.position.set(451, 69);
      this.lineBSAni2.rotation = Math.PI / 180 * 40, this.lineBSAni2.pivot.set(64, 0); 
      this.lineBSAni2.play();
      //
      let lineRArr = [];
      for(var i = 0; i< 5;i++){
        lineRArr.push(this.imgSrc+'line/r_'+i+'.png');
      }
      //je
      this.lineRAni = new PIXI.extras.AnimatedSprite.fromImages(lineRArr); 
      this.lineRAni.animationSpeed = .4;
      this.lineRAni.position.set(291, 197); 
      this.lineRAni.rotation = Math.PI / 180 * 57.2;
      this.lineRAni.pivot.set(142, 0); 
      this.lineRAni.play();
      //Oe
      this.lineRAni2 = new PIXI.extras.AnimatedSprite.fromImages(lineRArr);
      this.lineRAni2.animationSpeed = .4;
      this.lineRAni2.position.set(419, 196);
      this.lineRAni2.rotation = -Math.PI / 180 * 58.5;
      this.lineRAni2.pivot.set(142, 0); 
      this.lineRAni2.play();
      let lineRSArr = [];
      for(var i = 0; i < 5; i++){
        lineRSArr.push(this.imgSrc + 'line/r_s_'+i+'.png');
      }
      //Qe
      this.lineRSAni = new PIXI.extras.AnimatedSprite.fromImages(lineRSArr);
      this.lineRSAni.animationSpeed = .4, this.lineRSAni.position.set(256, 69);
      this.lineRSAni.rotation = -Math.PI / 180 * 40; 
      this.lineRSAni.pivot.set(64, 0), this.lineRSAni.play();
      //Ge
      this.lineRSAni2 = new PIXI.extras.AnimatedSprite.fromImages(lineRSArr); 
      this.lineRSAni2.animationSpeed = .4;
      this.lineRSAni2.position.set(451, 69); 
      this.lineRSAni2.rotation = Math.PI / 180 * 40; 
      this.lineRSAni2.pivot.set(64, 0); 
      this.lineRSAni2.play();
      this.lineRAni.visible = false;
      this.lineRAni2.visible = false;
      this.lineRSAni.visible =false;
      this.lineRSAni2.visible = false;
      //ze
      let diamond1Arr = [];
      for(var i = 0;i<3;i++){
        diamond1Arr.push(this.imgSrc + 'diamond/1_'+i+'.png');
      }
      this.diamond1Ani = new PIXI.extras.AnimatedSprite.fromImages(diamond1Arr); 
      this.diamond1Ani.animationSpeed = .1;
      var self = this;
      this.diamond1Ani.onFrameChange = function () {
        if (!self.diamondltAni.hasDropped){
          self.diamondltAni.gotoAndStop(self.diamond1Ani.currentFrame);
        }
        if (!self.diamondlbAni.hasDropped){
          self.diamondlbAni.gotoAndStop(self.diamond1Ani.currentFrame)
        }
        if (!self.diamondrtAni.hasDropped) {
          self.diamondrtAni.gotoAndStop(self.diamond1Ani.currentFrame)
        }
        if (!self.diamondrbAni.hasDropped) {
          self.diamondrbAni.gotoAndStop(self.diamond1Ani.currentFrame)
        }
      };
      var footStepSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'foot_step.png'].texture);
      footStepSprite.pivot.set(21.5, 6);
      footStepSprite.position.set(357, 298);
      this.diamond1Ani.footStep = footStepSprite;
      footStepSprite.visible = false;
      this.diamond1Ani.play();
      this.diamond1Ani.pivot.set(357, 298);
      this.diamond1Ani.position.set(357, 298);
      let diamondltArr = [];
      for (var i = 0; i < 15; i++) {
        diamondltArr.push(this.imgSrc + "diamond/l_t_" + i + ".png");
      }
      //We
      this.diamondltAni = new PIXI.extras.AnimatedSprite.fromImages(diamondltArr),
        this.diamondltAni.hasDropped = false;
      this.diamondltAni.loop = false;
      this.diamondltAni.animationSpeed = .2;
      let diamondlbArr = []
      for (var i = 0; i < 15; i++) {
        diamondlbArr.push(this.imgSrc + "diamond/l_b_" + i + ".png");
      }
      //Xe
      this.diamondlbAni = new PIXI.extras.AnimatedSprite.fromImages(diamondlbArr);
      this.diamondlbAni.hasDropped = false;
      this.diamondlbAni.loop = false;
      this.diamondlbAni.animationSpeed = .2;
      let diamondrtArr = [];
      for (var i = 0; i < 15; i++) {
        diamondrtArr.push(this.imgSrc + "diamond/r_t_" + i + ".png");
      }
      //Le
      this.diamondrtAni = new PIXI.extras.AnimatedSprite.fromImages(diamondrtArr);
      this.diamondrtAni.hasDropped = false;
      this.diamondrtAni.loop = false;
      this.diamondrtAni.animationSpeed = .2;
      let diamondrbArr = [];
      for (var i = 0; i < 14; i++) {
        diamondrbArr.push(this.imgSrc + "diamond/r_b_" + i + ".png");
      }
      //Fe
      this.diamondrbAni = new PIXI.extras.AnimatedSprite.fromImages(diamondrbArr);
      this.diamondrbAni.hasDropped = false;
      this.diamondrbAni.loop = false;
      this.diamondrbAni.animationSpeed = .2;
      let bloodArr = [];
      for (var i = 0; i < 19; i++) {
        bloodArr.push(this.imgSrc + "blood/jxxg_" + i + ".png");
      }
      //Be
      this.bloodAni = new PIXI.extras.AnimatedSprite.fromImages(bloodArr);
      this.bloodAni.animationSpeed = .2;
      this.bloodAni.pivot.set(125, 125);
      this.bloodAni.position.set(445, 195);
      this.bloodAni.loop = false;

      //ke
      this.bloodAni2 = new PIXI.extras.AnimatedSprite.fromImages(bloodArr);
      this.bloodAni2.animationSpeed = .2;
      this.bloodAni2.pivot.set(125, 125);
      this.bloodAni2.scale.set(.5, .5);
      this.bloodAni2.position.set(445, 55);
      this.bloodAni2.rotation = -Math.PI / 180 * 90;
      this.bloodAni2.loop = false;


      let blood2Arr = [];
      for (var e = 0; e < 19; e++) {
        blood2Arr.push(this.imgSrc + "blood2/jxxg_" + e + ".png");
      }
      //Ue
      this.blood2Ani = new PIXI.extras.AnimatedSprite.fromImages(blood2Arr);
      this.blood2Ani.animationSpeed = .2;
      this.blood2Ani.pivot.set(375, 125);
      this.blood2Ani.position.set(250, 195);
      this.blood2Ani.loop = false;
      //De
      this.blood2Ani2 = new PIXI.extras.AnimatedSprite.fromImages(blood2Arr);
      this.blood2Ani2.animationSpeed = .2;
      this.blood2Ani2.pivot.set(375, 125);
      this.blood2Ani2.scale.set(.5, .5);
      this.blood2Ani2.position.set(250, 55);
      this.blood2Ani2.rotation = Math.PI / 180 * 90;
      this.blood2Ani2.loop = false;
      this.dialogScissorsContainer.addChild(footStepSprite, this.diamond1Ani, this.diamondlbAni, this.diamondltAni, this.diamondrtAni, this.diamondrbAni, this.blood2Ani2, this.bloodAni2, this.blood2Ani, this.bloodAni, this.scissorsSprite, this.lineAni, this.lineAni2, this.lineBSAni, this.lineBSAni2, this.lineRAni, this.lineRAni2, this.lineRSAni, this.lineRSAni2);

      let text1Arr = [], text2Arr = [], text3Arr = [], text4Arr = [];
      for(var i = 0; i < 27; i++){
        if(i < 11){
          text1Arr.push(this.imgSrc + 'text1/A1-T1exoprt_'+i+'.png');
        }else{
          text1Arr.push(this.imgSrc + 'text1/A1-T1exoprt_' + (i+7) + '.png');
        }
      }
      for (var i = 0; i < 25; i++) {
        if (i < 11) {
          text2Arr.push(this.imgSrc + 'text2/A1-T2exoprt _' + i + '.png');
        } else {
          text2Arr.push(this.imgSrc + 'text2/A1-T2exoprt _' + (i + 9) + '.png');
        }
      }
      for (var i = 0; i < 27; i++) {
        if (i < 11) {
          text3Arr.push(this.imgSrc + 'text3/A1-T3exoprt_' + i + '.png');
        } else {
          text3Arr.push(this.imgSrc + 'text3/A1-T3exoprt_' + (i + 18) + '.png');
        }
      }
      for (var i = 0; i < 25; i++) {
        if (i == 0) {
          text4Arr.push(this.imgSrc + 'text4/zsxlexport_00.png');
        } else {
          text4Arr.push(this.imgSrc + 'text4/zsxlexport_' + (i - 1) + '.png');
        }
      }
      var text1Ani = new PIXI.extras.AnimatedSprite.fromImages(text1Arr);
      text1Ani.animationSpeed = 0.2;
      text1Ani.play();
      text1Ani.onFrameChange = function(){
        this.currentFrame == 10 && this.gotoAndPlay(0);
      }
      text1Ani.loop = false;
      text1Ani.hasCrashed = false;
      text1Ani.timer = null;
      this.textContainer.addChild(text1Ani);

      var text2Ani = new PIXI.extras.AnimatedSprite.fromImages(text2Arr);
      text2Ani.animationSpeed = 0.2;
      text2Ani.play();
      text1Ani.onFrameChange = function () {
        this.currentFrame == 10 && this.gotoAndPlay(0);
      }
      text2Ani.loop = false;
      text2Ani.hasCrashed = false;
      text2Ani.timer = null;
      text2Ani.position.set(630, 0)
      this.textContainer.addChild(text2Ani);

      var text3Ani = new PIXI.extras.AnimatedSprite.fromImages(text3Arr);
      text3Ani.animationSpeed = 0.2;
      text3Ani.play();
      text3Ani.onFrameChange = function () {
        this.currentFrame == 10 && this.gotoAndPlay(0);
      }
      text3Ani.loop = false;
      text3Ani.hasCrashed = false;
      text3Ani.timer = null;
      text3Ani.position.set(1260, 0)
      this.textContainer.addChild(text3Ani);

      var text4Ani = new PIXI.extras.AnimatedSprite.fromImages(text4Arr);
      text4Ani.animationSpeed = 0.2;
      text4Ani.gotoAndStop(0);
      
      text4Ani.loop = false;
      text4Ani.hasCrashed = false;
      text4Ani.timer = null;
      text4Ani.position.set(1995, 0)
      this.textContainer.addChild(text4Ani);

      var text4lineSprite0 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'text4/line0.png'].texture);
      var text4lineSprite1 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'text4/line1.png'].texture);
      var text4lineSprite2 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'text4/line2.png'].texture);
      var text4lineSprite3 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'text4/line3.png'].texture);

      text4lineSprite0.position.set(200, 635);
      text4lineSprite1.position.set(610, 680);
      text4lineSprite2.position.set(726, 652);
      text4lineSprite3.position.set(1745, 85);
      this.textContainer.addChild(text4lineSprite0, text4lineSprite1, text4lineSprite2, text4lineSprite3);
      //rt
      let triangleArr = [];
      for(var i = 0; i< 3; i++){
        triangleArr.push(this.imgSrc + 'triangle/triangle_' + i +'.png')
      }
      this.triangleAni = new PIXI.extras.AnimatedSprite.fromImages(triangleArr);
      this.triangleAni.animationSpeed = .1;
      this.triangleAni.onFrameChange = () => {
        this.triangleTop.hasDropped || this.triangleTop.gotoAndStop(this.triangleAni.currentFrame)
      };
      this.triangleAni.play();
      //triangleTop
      let triangleTopArr = [];
      for(var i = 0; i < 25;i++){
        if(i < 3){
          triangleTopArr.push(this.imgSrc + 'triangle/triangle_top_' + i + '.png');
        }else if(i >= 3 && i <= 13){
          triangleTopArr.push(this.imgSrc + 'triangle/txdl_' + (i-3) + '.png');
        }else if(i >= 14 && i <= 24){
          triangleTopArr.push(this.imgSrc + 'triangle/txdr_' + (i - 14) + '.png');
        }
      }
      this.triangleTop = new PIXI.extras.AnimatedSprite.fromImages(triangleTopArr);
      this.triangleTop.position.set(-172.5, -201);
      this.triangleTop.animationSpeed = .2;
      this.triangleTop.loop = false;
      this.triangleTop.hasDropped = false;
      //lt
      let lineWArr = [];
      for (var e = 0; e < 5; e++){
        lineWArr.push(this.imgSrc + "line/w_" + e + ".png");
      };
      //lt
      this.lineWAni = new PIXI.extras.AnimatedSprite.fromImages(lineWArr);
      this.lineWAni.animationSpeed = .4;
      this.lineWAni.position.set(-14.5, 50);
      this.lineWAni.play();
      this.lineWAni.visible = false;
      //dt
      this.lineRAni3 = new PIXI.extras.AnimatedSprite.fromImages(lineRArr);
      this.lineRAni3.animationSpeed = .4;
      this.lineRAni3.position.set(-14.5, 50);
      this.lineRAni3.play();
      this.lineRAni3.visible = false;
      //ht
      this.blood2Ani3 = new PIXI.extras.AnimatedSprite.fromImages(blood2Arr);
      this.blood2Ani3.animationSpeed = .2;
      this.blood2Ani3.pivot.set(375, 125);
      this.blood2Ani3.scale.set(.8, .8);
      this.blood2Ani3.position.set(130, 50);
      this.blood2Ani3.rotation = Math.PI / 180 * 135;
      //ct
      this.bloodAni3 = new PIXI.extras.AnimatedSprite.fromImages(bloodArr);
      this.bloodAni3.animationSpeed = .2;
      this.bloodAni3.pivot.set(125, 125); 
      this.bloodAni3.scale.set(.8, .8); 
      this.bloodAni3.position.set(130, 50); 
      this.bloodAni3.rotation = -Math.PI / 180 * 135;
      this.bloodAni3.loop = false; 
      this.bloodAni3.loop = false;
      //ft
      this.triangleTextSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'triangle/text.png'].texture);

      this.triangleTextSprite.position.set(500, 50);
      this.triangleTextSprite.visible = false;
      //gt
      this.triangleSciss = new PIXI.Sprite(this.loader.resources[this.imgSrc + "triangle/scissors.png"].texture);
      this.triangleSciss.visible = false;
      this.triangleSciss.position.set(274, 32);
      this.triangleScissorsTween = new TWEEN.Tween(this.triangleSciss.position).to({
        x: -50
      }, 2).easing(TWEEN.Easing.Quadratic.InOut).delay(0.5).repeat(1 / 0);
      this.foot2StepSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'foot_step2.png'].texture)
      this.foot2StepSprite.pivot.set(21.5, 6);
      this.foot2StepSprite.position.set(131.5, 255);
      this.foot2StepSprite.scale.set(0, 0); 
      this.trangleContainer.addChild(this.foot2StepSprite, this.triangleAni, this.triangleTop, this.lineWAni, this.lineRAni3, this.blood2Ani3, this.bloodAni3, this.triangleTextSprite, this.triangleSciss);

      //to do


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
