Page({

  /**
   * 页面的初始数据
   */
  inputValue:'',
  data: {
    audioPoster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    audioName: '此时此刻',
    audioAuthor: '许巍',
    audioSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    imgArr: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }, {
      mode: 'aspectFit',
      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
    }, {
      mode: 'aspectFill',
      text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
    }, {
       mode: 'widthFix',
       text: 'widthFix：宽度不变，高度自动变化，保持原图宽高比不变'
    }, {
      mode: 'top',
      text: 'top：不缩放图片，只显示图片的顶部区域'
    }, {
      mode: 'bottom',
      text: 'bottom：不缩放图片，只显示图片的底部区域'
    }, {
      mode: 'center',
      text: 'center：不缩放图片，只显示图片的中间区域'
    }, {
      mode: 'left',
      text: 'left：不缩放图片，只显示图片的左边区域'
    }, {
      mode: 'right',
      text: 'right：不缩放图片，只显示图片的右边边区域'
    }, {
      mode: 'top left',
      text: 'top left：不缩放图片，只显示图片的左上边区域'
    }, {
      mode: 'top right',
      text: 'top right：不缩放图片，只显示图片的右上边区域'
    }, {
      mode: 'bottom left',
      text: 'bottom left：不缩放图片，只显示图片的左下边区域'
    }, {
      mode: 'bottom right',
      text: 'bottom right：不缩放图片，只显示图片的右下边区域'
    }],
    src:'../../../images/cat.jpg',
    danmuList:[{
       text:'第1s弹幕',
       color:'#ff0000',
       time:1
    },{
       text: '第3s弹幕',
       color: '#ff00ff',
       time: 3
    }],
    videoSrc:'',
    cameraSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.videoCtx = wx.createVideoContext('myVideo');
  },
  bindAudioError:function(e){
    console.log('audio出错啦',e)
  },
  bindAudioPlay:function(e){
    console.log('audio开始播放啦',e);
  },
  bindAudioPause:function(e){
    console.log('audio暂停播放',e);
  },
  bindAudioTimeupdate:function(e){
    console.log('audio时间更新',e);
  },
  bindAudioEnded:function(e){
    console.log('audio结束了',e);
  },
  audioPlay: function(e){
    this.audioCtx.play();
  },
  audioPause: function(){
    this.audioCtx.pause();
  },
  setAudioSeek:function(){
    this.audioCtx.seek(20);
  },
  audioStart:function(){
    this.audioCtx.seek(0);
  },
  bindImageLoad:function(e){
    console.log('图片加载完成',e.detail)
  },
  bindVideoFullChange: function(e){
    console.log(e)
  },
  bindVideoTimeChange: function(e){
    console.log(e)
  },
  bindInputBlur: function(e){
    this.inputValue = e.detail.value;
  },
  sendDanmu: function(){
     this.videoCtx.sendDanmu({
        text: this.inputValue,
        color: 'red'
     })
  },
  getVideoSrc: function(){
     wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: (res)=>{
           console.log(res)
           this.setData({
              videoSrc:res.tempFilePath
           })
        }
     })
  },
  taskPhoto: function(){
     let camera = wx.createCameraContext(this);
     camera.takePhoto({
        quality: 'high',
        success: (res) => {
           console.log(res)
           this.setData({
              cameraSrc: res.tempImagePath
           })
        }
     })
  },

  bindLiverChange: function(e){
     console.log(e)
  },
  bindError: function(e){
    console.log(e)
  },
  bindNetStatus: function(e){
     console.log(e)
  },
  bindPusherChange: function (e) {
     console.log(e)
  },
  bindPusherError: function (e) {
     console.log(e)
  },
  bindPusherNetStatus: function (e) {
     console.log(e)
  }
})