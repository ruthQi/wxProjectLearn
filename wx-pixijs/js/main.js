
/**
 * 游戏主函数
 * 
 */
var PIXI = require('./libs/pixi.js');
var Scroller = require('./libs/scroller.js');
var TWEEN = require('./libs/tween.js');
var ctx = canvas.getContext('2d');
//console.log(PIXI)
export default class Main {
  constructor() {
    this.imgSrc = 'images/';
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
    /*自己会创建一个 Canvas 画布，而在微信小游戏中已经有了一个现成的 canvas，随后再创建的 canvas 都是离屏的（off-screen），所以，游戏现在是跑在一个不可见的 canvas 里面。所以，我们需要修改我们的初始化方法，让 Phaser 使用微信自动创建的 canvas。*/
    let config={
      width: this.viewWidth,
      height: this.viewHeight,
      view: canvas
    }
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
      this.canvasView.resize(this.viewHeight / this.scale, 750);
      //console.log(this.canvasView.view)
      //this.canvasView.rootContext.scale(0.5,0.5)
      this.canvasView.view.style.backgroundColor='#fff';
      //console.log(Math.PI)
      this.canvasView.view.style.transform = 'rotate(-180deg)';
      this.canvasView.view.width = this.viewHeight / this.scale;
      this.canvasView.view.height = 750;
      console.log(this.canvasView)
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
    console.log(left, top, zoom)
  }
  loadComplete = () => {
    //fe==this.container
    //this.mainScene = new PIXI.Container();
    //ye
    this.firstPageContainer = new PIXI.Container();
    //this.firstPageContainer.visible = false;
    //Ee
    this.bgSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'first/bg.png'].texture);
    this.bgSprite.position.set(265,97);
    //Ae
    let sxzArr = [];
    for(var i = 0; i < 38; i++){
      sxzArr.push(this.imgSrc+'sxz/sxz_'+ i + '.png');
    }
    this.sxzAni = new PIXI.extras.AnimatedSprite.fromImages(sxzArr);
    this.sxzAni.animationSpeed = 0.25;
    this.sxzAni.loop = false;
    //Pe
    this.timeSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc+'first/time.png'].texture);
    this.timeSprite.position.set(336,607);

    //we
    this.firstLineContainer = new PIXI.Container();
    for(var i = 0; i< 10; i++){
      if(i == 9){
        var renderContent = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/rect.png'].texture);
        renderContent.position.x = 368;
        renderContent.position.y = -69;
      }else{
        var renderContent = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/t1_'+i+'.png'].texture);
        renderContent.position.x = 38 * i;
      }
      this.firstLineContainer.addChild(renderContent);
    }
    this.firstLineContainer.position.set(this.height - 539, 514);
    //_e
    this.secondLineContainer = new PIXI.Container();
    for(var i=0;i<8;i++){
      let item = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/t2_' + i + '.png'].texture);
      item.position.x = 38 * i;
      this.secondLineContainer.addChild(item);
    }
    this.secondLineContainer.position.set(this.height - 422, 572);
    //Te
    this.tipsContainer = new PIXI.Container();
    let circleSprite2 = new PIXI.Sprite(this.loader.resources[this.imgSrc+'first/circle2.png'].texture);
    let circleSprite1 = new PIXI.Sprite(this.loader.resources[this.imgSrc + 'first/circle1.png'].texture);
    circleSprite1.pivot.set(27, 27);
    circleSprite1.scale.set(.57, .57);
    circleSprite1.position.set(250, 27);
    new TWEEN.Tween(circleSprite1.position).to({
      x: 100
    }, 2e3).delay(100).easing(TWEEN.Easing.Quadratic.Out).repeat(1 / 0).start();
    var textSprite = new PIXI.Sprite(this.loader.resources[this.imgSrc + "first/text.png"].texture);
    textSprite.position.set(205, 48);
    this.tipsContainer.addChild(circleSprite2, circleSprite1, textSprite);
    this.tipsContainer.position.set(this.height - 396, 140);
    this.firstPageContainer.addChild(this.bgSprite);

    this.container.addChild(this.firstPageContainer);
    this.updateLoop();
  }
  updateLoop(){
    TWEEN.update();
    requestAnimationFrame(()=>{this.updateLoop()});
    this.canvasView.render(this.container);
  }

  
}
