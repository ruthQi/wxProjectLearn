//index.js
//获取应用实例
const app = getApp();
var i =1;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testData:[]
  },
  //事件处理函数
  bindViewTap: function() {
    //页面跳转
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击按钮改变内容
  changeMotto: function(){
    this.setData({
      motto: 'Hello you!'
    })
  },
  //当页面加载好之后执行
  onLoad: function () {
    console.log('页面生命周期---页面加载时触发');
    console.log(app.globalData.userInfo)
    console.log(this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    console.log("页面生命周期---页面展示时触发");
  },
  onHide: function(){
    console.log("页面生命周期---页面隐藏时触发");
  },
  //此处点击的事件是bindgetuserinfo，在这里看到的getUserInfo已经类似于是回调函数了
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  testSetData: function(){
      setTimeout(()=>{
         this.testFun();
      },1)
      this.testFun();

  },
  testFun: function(){
     console.log(new Date().getTime())
     i++;
     let arr = this.data.testData;
     arr = arr.concat([{ i: i }])
     console.log('i', i, arr)
     this.setData({
        testData: arr
     })
  }
})
