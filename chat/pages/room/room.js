
//获取应用实例
const app = getApp();
import request from '../../models/request.js';
import Chat from '../../utils/linkChat.js';
import observer from '../../utils/observer.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomData:{},
    pullUrl:'http://pullhlsbohetec1.live.126.net/live/e309955592574771b8db768c1dd3610a/playlist.m3u8',
    imputValue:'',
    messageList:[],
    messages:[],
    focus: false,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.haddleMessage();
     app.getUserInfo((userInfo) => {
        console.log('===========', userInfo)
        console.log(options)
        request.request('/api/liveroom/user/enter', {
           userId: userInfo.user.userId,
           roomId: options.roomId
        }, 'POST', (res) => {
           console.log(res)
           let room = res.data.data.room;
           this.setData({
              roomData: res.data.data,
              userInfo:userInfo.user
           })
           console.log('==========',app.globalData)
           this.linkChatRoom(room.yxRoomId);
        })
     });
     this.timer = setInterval(this.renderMessage, 300);
  },

  linkChatRoom: function (yxRoomId) {
     var params = {
        appKey: app.globalData.appKey,
        account: app.globalData.userInfo.user.accid,
        token: app.globalData.userInfo.yunxinToken,
        chatroomId: yxRoomId,
        chatroomAddresses: ['wlnimsc1.netease.im:443']
     }
     app.globalData.chatroom = new Chat(params)
     //console.log('========', app.globalData.chatroom);
  },
  sendMessage: function(){
     request.request('/api/chat/roomChat', {
        roomId:this.data.roomData.room.roomId,
        userId:app.globalData.userInfo.user.userId,
        message:this.data.inputValue
     }, 'POST',(res)=>{
         console.log('------------',res);
         let data={
            type:'msg_chat',
            data: res.data.data.eventData
         }
         
         this.data.messages.push(data);
     })
     this.setData({
        inputValue:'',
        focus: true
     })
  },
  inputMessage: function(e){
     //console.log(e)
      this.setData({
         inputValue:e.detail.value
      })
  },
  haddleMessage: function(){
     observer.on('msg_chat', this.showMessage);
     observer.on('user_enter', this.showMessage);
     //observer.on('live_user_list', this.showMessage);
  },
  showMessage: function(data){
     console.log(this.data.userInfo)
     console.log(data)
     if (data.type == 'msg_chat' && data.data.user.userId == this.data.userInfo.userId){
         return;
     }
     this.data.messages.push(data);
  },
  renderMessage: function(){
      if(this.data.messages.length > 0){
         let list = [...this.data.messageList];
         //console.log(list)
         list = list.concat(this.data.messages);
         if (list.length > 200) {
            list.splice(0, 100);
         }
         this.setData({
            messageList:list
         });
         this.data.messages = [];
      }
  }
})