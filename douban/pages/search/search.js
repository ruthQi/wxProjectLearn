var url = 'http://localhost/v2/movie/search';
var value = '';
var loadingNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  search: function(e){
      this.setData({
         movieList: []
      })
      this.requestFun(0,20,e.detail.value,'search');
      value = e.detail.value;
  },
  loadOther: function(){
     loadingNum++;
     if (loadingNum * 20 > this.data.total){
         return;
     }
     this.requestFun(loadingNum * 20, 20, value,'load');
  },
  requestFun: function (start, count, value,type) {
     wx.showLoading({
        title: '加载中...',
     });
     wx.request({
        url: url,
        data: {
           start: start,
           count: count,
           q:value
        },
        header: {
           'content-type': 'text/plain'
        },
        success: (res) => {
           console.log(res)
           wx.hideLoading();
           //console.log(this.data.movieList)
           var data = res.data.subjects
           if (type == 'load'){
              data = this.data.movieList.concat(res.data.subjects);
           }
           this.setData({
              total: res.data.total,
              movieList: data
           })
        }
     })
  }
})