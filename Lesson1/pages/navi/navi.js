Page({

  //跳转到tabBar页面只能使用switchTab打开,
  //navigateTo, redirectTo 只能打开非 tabBar 页面
  //此处使用navigateTo打开tabBar，会进入fail方法，没反应
  goToTest: function(){
    wx.switchTab({
      url: '../test/test',
      success: ()=>{
        console.log('跳转成功')
      }
    })
  },
  navigateToChild: function(){
    wx.navigateTo({
      url: '../childNavi/childNavi',
    })
  },
  //使用redirect，跳转时销毁之前的页面，不能反悔
  redirectToChild: function(){
    wx.redirectTo({
      url: '../childNavi/childNavi',
    })
  },
  //relaunch可以打开任意页面（子页面或者tabBar页面），但是使用relaunch打开的页面不能返回
  reLaunchPage: function(){
    wx.reLaunch({
      url: '../childNavi/childNavi',
    })
  }
})