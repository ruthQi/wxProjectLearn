var arr = ['first', 'second', 'third'];
var index = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'first'
  },

  scrolltoupper: function(e){
    console.log('滚动到顶部/左边触发',e);
  },
  scrolltolower: function(e){
    console.log('滚动到底部/右边触发', e);
  },
  scroll: function(e){
    console.log('滚动：', e);
  },
  changeView: function(){
    index ++;
    if(index > arr.length - 1){
      index = 0;
    }
    this.setData({
      toView: arr[index]
    })
  }
})