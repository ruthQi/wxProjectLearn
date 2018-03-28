
import observer from './observer.js';
var Chatroom = require('./ChatRoom.js');
var app = getApp();
import request from '../models/request.js';
export default class Chat {
   constructor(params) {
      //this.a = 0;
      this.initChatRoom(params);
   }
   // getChatroomAddress(params) {
   //    request.request('/api/liveroom/requestAddr', {
   //       yxRoomId: params.chatroomId,
   //       clientType: 1
   //    }, 'get', (res) => {
   //       console.log(res)
   //       params.chatroomAddresses = res.data.data.addr;
   //       this.initChatRoom(params);
   //    })
      
   // }
   initChatRoom(params) {
      console.log(Chatroom)
      console.log(params)
      this.chatroom = Chatroom.getInstance(this.getChatRoomParams(params));
      //因为console报错convert circular structure to JSON
      //console.log(app.globalData.chatroom)
      // setTimeout(()=>{
      //    console.log(app.globalData.chatroom)
      // },1000)
   }
   getChatRoomParams(params) {
      const chatRoomParams = {
         secure: params.secure || true,
         appKey: params.appKey || appKey,
         account: params.account,
         token: params.token,
         chatroomId: params.chatroomId,
         chatroomAddresses: params.chatroomAddresses,
         onconnect: this.onChatroomConnect,
         onerror: this.onChatroomError,
         onwillreconnect: this.onChatroomWillReconnect,
         ondisconnect: this.onChatroomDisconnect,
         // 消息
         onmsgs: this.onChatroomMsgs
      };
      return chatRoomParams;
   }
   onChatroomConnect(chatroom) {//链接成功后的回调函数
      //this.isConnected = true;
      //信号重新连接时，重新渲染视频区域和聊天区域
      //observer.emit('chatroom:connect', chatroom);
      console.log('chatroom:进入聊天室', chatroom);
   }
   onChatroomError(error, obj) {
      console.log('chatroom:发生错误', error, obj);
      //observer.emit('chatroom:error', error);
   }
   onChatroomWillReconnect(obj) {
      console.log('chatroom:即将重连', obj);
      //this.roomData = RoomData.get();
      //当主播退出时会调用onChatroomDisconnect，所以无法分辨是自己退出还是信号中断。
      //所以中断的消息放在重新连接中，主播主动下播的话，不会调用此方法
      //信号中断的话，重新渲染视频区域和聊天区域
      //observer.emit('chatroom:willReconnect', obj);
   }
   onChatroomDisconnect(error) {
      console.log('chatroom:连接断开', error);
      // this.isConnected = false;
      // if (error) {
      //    switch (error.code) {
      //       // 账号或者密码错误, 请跳转到登录页面并提示错误
      //       case 302:
      //          observer.emit('chatroom:302', error);
      //          break;
      //       // 被踢, 请提示错误后跳转到登录页面
      //       case 'kicked':
      //          /**
      //           * 当code为'kicked'的时候, 此对象会有以下字段
      //           * reason: 被踢的原因
      //           *    chatroomClosed: 聊天室关闭了
      //           *    managerKick: 被管理员踢出
      //           *    samePlatformKick: 不允许同一个帐号重复登录同一个聊天室
      //           * message: 文字描述的被踢的原因
      //           */
      //          observer.emit('chatroom:kicked', error);
      //          break;
      //       default:
      //          observer.emit('chatroom:disconnect', error);
      //          break;
      //    }
      // }
   }
   onChatroomMsgs(msgs) {
      console.log('chatroom:收到聊天室消息', msgs);
      msgs.forEach((item, index) => {
         if (item.type == 'custom') {
            console.log('000000000000000000000')
            var data = JSON.parse(item.content);
            console.log('chatroom:收到自定义消息', data.type, data);
            observer.emit(data.type, data);
         }
      });
   }
}