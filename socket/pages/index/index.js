//index.js
//服务端使用nodejs的ws
var wsApi = 'ws://10.234.40.140:3001'
var openBol = false;
Page({
  data: {
    
  },
  //事件处理函数
  onLoad: function(){
     wx.connectSocket({
        url: wsApi,
        header: {
           'content-type': 'application/json'
        },
        data:{},
        method: 'GET',
        success: function(){
            console.log('客户端连接成功')
        }

     });
     wx.onSocketOpen(function(){
        console.log('websocket连接已打开')
        openBol = true;
     });
     //客户端接收服务器端的消息
     wx.onSocketMessage(function(res){
        console.log(res)
     })
  },
  sendMsg: function(e){
     if (openBol){
         wx.sendSocketMessage({
            data: e.detail.value,
            success: ()=>{
               console.log('发送成功')
            }
         })
     }
  }
})
