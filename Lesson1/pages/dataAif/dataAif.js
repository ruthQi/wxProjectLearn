//实现数据绑定与if条件语句
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 2,
    condition: false,
    num:3,
    isBlock: false,
    isHidden: false,
    flag: false,
    num1: 1,
    num2: 2,
    num3: 3,
    nick: 'duck',
    obj1: {
      a:1,
      b:2
    },
    obj2: {
      c:3,
      d:4
    }
  },
  changeIfShow: function(){
    this.setData({
      condition: !this.data.condition
    })
  }
})