Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过options获取？后面的参数
    if (options && options.title){
      this.setData({
        title: options.title
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最     //后一个元素为当前页面。
    console.log('getCurrentPages的用法：', getCurrentPages());
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  back: function(){
    //返回的页面数，如果 delta 大于现有页面数，则返回到首页,默认值为1
    //navigateBack返回是针对navigateTo才可返回，redirect,relaunch跳转的页面，使用navigateTo都不起     //作用
    wx.navigateBack({
      delta:1
    })
  }
})