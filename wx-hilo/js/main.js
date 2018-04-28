
/**
 * 游戏主函数
 */
require('../js/libs/hilo-standalone.js');
//console.log(window.Hilo)
var Hilo = window.Hilo;
export default class Main {
  constructor(){
    this.init();
  }
  init(){
    //let vendor = Hilo.browser.jsVendor;
    //console.log(canvas)
    //console.log(window.innerWidth)
    //console.log(window.innerHeight)
    this.loader = new Hilo.LoadQueue();
    console.log(this.loader)
    //小游戏中的图片加载要使用绝对定位，相对定位找不到图片
    this.loader.add([
      {id:'bg', src:'images/bg.png'},
      {id: 'restartBtn', src: 'images/btn-restart.png' },
      {id: 'logo', src: 'images/logo.png' },
    ]).on('complete', ()=>{
      console.log('0000000000')
    }).start();
  }
}
