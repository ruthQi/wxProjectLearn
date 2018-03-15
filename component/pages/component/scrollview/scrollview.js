var arr = ['first', 'second', 'third'];
var index = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'first',
    isHidden: true,
    viewArr: [{
      unique:'first',value:'first'
    }, {
      unique: 'second', value: 'second'
      }, {
        unique: 'third', value: 'third'
      }]
  },

  scrolltoupper: function(e){
    console.log('滚动到顶部/左边触发',e);
  },
  scrolltolower: function(e){
    console.log('滚动到底部/右边触发', e);
    //模拟下拉刷新
    let data = [{
      unique: 'forth', value: 'forth'
    }, {
        unique: 'fifth', value: 'fifth'
    }, {
        unique: 'sixth', value: 'sixth'
    }];
    let dataArr = this.data.viewArr.concat(data);
    setTimeout(()=>{
      this.setData({
        viewArr: dataArr,
        isHidden: true
      })
    }, 1000)
    this.setData({
      isHidden: false
    })
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
    // for(var i=0;i<arr.length;i++){
    //   if(this.data.toView === arr[i] && i < 2){
    //     console.log(i)
    //     this.setData({
    //       toView: arr[i+1]
    //     });
    //     break;
    //   }
    // }
  }
})