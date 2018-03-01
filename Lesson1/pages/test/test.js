//1.页面中获取应用实例
var app = getApp();
//引入js文件，实现模块化；暂不支持绝对路径
import Common from '../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'test',
    hasUserInfo: false,
    userInfo: {},
    pass: null,
    text:'init data',
    num: 0,
    array:[{text: 'init data'}],
    object: {
      text: 'init data'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("page test---onload");
    //setData的参数，data和callback
    this.setData({
      pass: app.globalData.pass
    }, ()=>{
      console.log('设置密码展示成功')
    })
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
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function(){
    console.log('page scroll')
  },
  /**
   * 当前是tab页时，点击tab触发
   */
  onTabItemTap(item){
    console.log('page tab');
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text)
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
  },
  //===================点击事件========================
  changeText: function(){
    this.setData({
      text: 'changed data'
    })
  },
  changeNum: function(){
    this.data.num = 1;
    this.setData({
      num: this.data.num
    })
  },
  changeItemInArray: function(){
    this.setData({
      'array[0].text':'changed array'
    })
  },
  changeItemInObject: function(){
    this.setData({
      'object.text': 'changed object'
    })
  },
  addNewField: function(){
    this.setData({
      'newField.text': 'new data'
    }, ()=>{
      console.log(this.data)
    })
  },
  //测试common文件
  testCommon:function(){
    Common.sayHello(this.data.name);
  }
})