var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'test',
    hasUserInfo: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("page test---onload");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("page test---onready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("page test---onshow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("page test---onhide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("page test---onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("page test---onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("page test---onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("page test---onShareAppMessage");
  },
  //此处获取用户信息的方式与index中的方式是不同的方式
  //userInfo是从app.js中传递过来的
  getUserInfo: function(){
    app.getUserInfoTest((userInfo) => {
      console.log(userInfo);
      console.log('--------',app.globalData.userInfoTest);
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true        
      })
    })
  }
})