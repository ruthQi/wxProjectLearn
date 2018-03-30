var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
   port: 3001
})

//当客户端有连接进入时会触发connection事件

wss.on('connection', function(ws){
   console.log('服务端连接成功');
   //服务端接收客户端消息
   ws.on('message',function(msg){
      console.log(msg);
      ws.send("响应的"+msg)
   });
   
});