//实现数据绑定与if条件语句
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 2,
    condition: false
  },
  changeIfShow: function(){
    this.setData({
      condition: !this.data.condition
    })
  }
})