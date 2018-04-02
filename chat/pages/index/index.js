//index.js
//获取应用实例
const app = getApp();
import request from '../../models/request.js';

Page({
   data:{
      bannerList:[],
      roomList:[]
   },
   onReady: function(){
      //console.log(app.globalData)
      this.getBannerList();
      this.getRoomList();
      //this.linkChatRoom();
   },
   getBannerList: function(){
      request.request('/api/home/v2/banner', {
         pageSize:20,
         pageNo:1
      }, 'GET', (res)=>{
         console.log(res)
         this.setData({
            bannerList:res.data.data.bannerList
         })
      })
   },
   getRoomList: function(){
      request.request('/api/home/v2/hot',{
         pageNo:1,
         pageSize:20
      }, 'GET', (res)=>{
         console.log(res)
         this.setData({
            roomList: res.data.data.dataList
         })
      })
   }
   
})
