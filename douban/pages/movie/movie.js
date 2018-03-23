var url = 'http://localhost/v2/movie/subject/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      movieObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
       url: url+options.id,
       header:{
          'content-type': 'text/plain'
       },
       success: (res)=>{
         console.log(res)
         this.setData({
            movieObj:res.data
         })
       }
    })
  }
})