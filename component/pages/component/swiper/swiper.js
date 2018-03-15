Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr:[
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    hasDot:true,
    interval:2000,
    duration: 1000,
    autoplay: true,
    x: 10,
    y: 10
  },
  onReady: function(){
    this.video = wx.createVideoContext('myVideo', this);
  },
  swiperChange: function(e){
    //e.detail.source:表示导致变更的原因；autoplay:自动播放导致；touch：用户划动导致
    //console.log(e);
  },
  swiperChangeFinish: function(e){
    //console.log(e);
  },
  //slider的change事件
  //改变swiper滚动的间隔时间
  intervalChange: function(e){
    let value = e.detail.value;
    this.setData({
      interval:value
    })
  },
  //改变swiper滚动的时间
  durationChange: function(e){
    let value = e.detail.value;
    this.setData({
      duration: value
    })
  },
  changeAutoplay: function(){
    this.setData({
      autoplay:!this.data.autoplay
    })
  },
  changeDotShow: function(){
    this.setData({
      hasDot: !this.data.hasDot
    })
  },

  changeXY: function(){
    this.setData({
      x:30,
      y:30
    })
  },
  changeView:function(e){
    console.log(e)
  },
  changeScale: function(e){
    console.log(e)
  },
  play:function(){
    this.video.play();
  },
  pause:function(){
    this.video.pause();
  }
})