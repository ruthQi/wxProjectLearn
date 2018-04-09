//index.js
//获取应用实例
var Hilo = require('../../utils/hilo.js');
var loader = null;
Page({
  
  onLoad:function(){
     this.loadImages();
  },
  
  loadImages: function() {
     loader = new Hilo.LoadQueue();
     loader.add([
        { id: 'bg', src: '/images/pages/bg.png' },
        { id: 'logo', src: '/images/pages/logo.png' },
        { id: 'restartBtn', src: '/images/pages/btn-restart.png' }
     ]).on('complete', () => {
        this.initStage();
     }).start();
  },
  initStage: function () {
      console.log('000000000')
  },
})
