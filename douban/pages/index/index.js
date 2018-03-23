var Url = 'http://localhost/v2/movie/top250';
// var start = 0;
// var count = 20;
var loadingNum = 0;
Page({
   data:{
      movieList:[],
      title:'加载中...'
   },
   onLoad: function(){
     
     this.requestFun(0,20);
   },
   //分页加载
   loadOther: function(e){
      console.log(e);
      loadingNum ++;
      this.requestFun(loadingNum * 20 ,20);
   },
   requestFun: function(start,count){
      wx.showLoading({
         title: '加载中...',
      });
      wx.request({
         url: Url,
         data: {
            start: start,
            count: count
         },
         header: {
            'content-type': 'json'
         },
         success: (res) => {
            console.log(res)
            wx.hideLoading();
            this.setData({
               title: res.data.title,
               movieList: this.data.movieList.concat(res.data.subjects)
            })
         }
      })
   }
})
