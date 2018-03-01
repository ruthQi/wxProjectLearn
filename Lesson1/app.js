//小程序的核心文件为app.js , app.json, app.wxss三个文件
//app.js
App({
  //当程序初始化的时候执行onLaunch里面的内容
  onLaunch: function () {
    console.log("小程序生命周期--小程序启动的时候触发");
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //小程序显示的时候触发
  onShow: function(){
    console.log("小程序生命周期---小程序显示的时候触发")
  },
  onHide: function(){
    console.log("小程序生命周期---小程序隐藏的时候触发")
  },
  //全局的方法
  /*cb是从test.js中传递过来的回调函数，在获取用户信息成功之后调用回调函数，从而在test.js中可以知道获   取数据成功并赋值用户信息，改变页面元素;
  在index.js中使用的是另一种方式获取用户信息*/
  getUserInfoTest: function(cb){
    if (this.globalData.userInfoTest){
      typeof cb === 'function' && cb(this.globalData.userInfoTest);
    }else{
      wx.login({
        success: (res)=>{
          wx.getUserInfo({
            success: (res)=>{
              this.globalData.userInfoTest = res.userInfo;
              typeof cb === 'function' && cb(this.globalData.userInfoTest);
            }
          })
        }
      })
    }
  },
  //全局的属性
  globalData: {
    userInfo: null,
    userInfoTest: null
  }
})