//require('');
//require('../../utils/chatRoom.js');
//var NIM = require('../../utils/NIM.js');
var app = getApp();
Page({
   data:{
      account:'',
      token:''
   },
   loginFun: function(){
      wx.login({
         success: (res)=>{
            console.log(res);
            let code = res.code;
            wx.getUserInfo({
               success: (res)=>{
                  //console.log(res)
                  //请求urs
                  wx.request({
                     url: 'https://reg.163.com/nOuterLogin/oauth2/weixin_applet_connect.do',
                     data:{
                        product:'mint_live',
                        code:code,
                        encryptedData: res.encryptedData,
                        iv:res.iv

                     },
                     success: (res)=>{
                        console.log(res)
                     }
                  })
               }
            }) 
         }
      })
   },
   testCookie: function(){
      wx.request({
         url: 'https://live.ent.163.com/api/user/loginUserInfo',
         header: {                                                         'cookie':'NTES_SESS=nQ2oJeXbboMCE3mUN6s3A1CyokAIFEbBkZ4tuZRbj8q13iTX3xgZlswCVRk1ODeBo.RFq0y8j_GC_G_8c.TV5veJWQvl8HtusE5nnuzzicX_jbGpQQV_hQlRebP82BSPouho7phKB8COtnjjT7TFLTjQdD6SBn3lZoy4O.YlGwddMsr6PHupM0BrDY_Z5cUoT44R3qsAUt2ts; S_INFO=1522115663|0|1&85##|qi0428ru; P_INFO=qi0428ru@163.com|1522115663|0|mint_live|11&17|bej&1522059795&kaola#bej&null#10#0#0|&0|yanxuan&kaola&mint_live_check&mint_live&game&note_client&kaola_check|qi0428ru@163.com;'
         },
         success: (res)=>{
            console.log(res)
            this.setData({
               account:res.data.data.user.accid,
               token:res.data.data.yunxinToken
            })
         }
      })
   },
   testSDK: function(){
      console.log(NIM);
      NIM.getInstance({
         appKey: '148fa6ae30b2822c171a52460ab9b265',
         account: this.data.account,
         token: this.data.token,
         onconnect: this.onConnect,
         onerror: this.onError,
         onwillreconnect: this.onWillReconnect,
         ondisconnect: this.onDisconnect,
         // 多端
         onloginportschange: this.onLoginPortsChange,

         syncRelations: false, //是否同步黑名单和静音列表, 默认true. 如果传false就收不到黑名单和静音列表, 即不会收到onblacklist回调和onmutelist回调, 开发者后续可以调用获取黑名单和静音列表来获取黑名单和静音列表。
         syncFriends: false, //是否同步好友列表, 默认true. 如果传false就收不到onfriends回调, 开发者后续可以调用获取好友列表来获取好友列表。
         syncFriendUsers: false, //是否同步好友对应的用户名片列表, 默认true, 如果传false就收不到onusers回调.
         syncTeams: false, //是否同步群列表, 默认true. 如果传false就收不到群列表, 即不会收到onteams回调, 开发者后续可以调用获取群列表来获取群列表.
         syncExtraTeamInfo: false, //是否同步额外的群信息, 默认true会同步额外的群信息, 目前包括当前登录用户是否开启某个群的消息提醒 (SDK 只是存储了此信息, 具体用此信息来做什么事情完全由开发者控制)调用接口NIM#updateInfoInTeam来关闭/开启某个群的消息提醒调用接口NIM#notifyForNewTeamMsg来查询是否需要群消息通知
         syncTeamMembers: false, //是否同步群成员, 默认true. 只有在syncTeams=true的时候才起作用, 如果传false就不会同步群成员, 即不会收到onteammembers和onsyncteammembersdone回调, 开发者后续可以调用获取群成员来获取群成员.
         syncSessionUnread: false, //是否同步会话的未读数, 默认不同步 如果选择同步 那么在一个端读过的会话在其它端也会被标记为已读 在调用NIM#setCurrSession的时候 SDK 会自动同步一次未读数, 此后如果收到当前会话的消息, 需要手动调用NIM#resetSessionUnread来同步未读数
         syncRoamingMsgs: false, //是否同步漫游消息, 默认true. 如果传false就收不到漫游消息, 即不会收到onroamingmsgs回调.
         syncMsgReceipts: false, //是否同步已读回执时间戳, 默认true. 如果传false就收不到已读回执时间戳.
         autoMarkRead: true, //是否自动标记消息为已收到 默认情况下SDK在收到服务器推送过来的消息后, 会在将消息推给开发者时将消息标记为已读状态, 下次登录后就不会收到标记为已读的消息。 SDK通过onofflinemsgs、onofflinesysmsgs、onofflinecustomsysmsgs等回调将离线消息推送给开发者 SDK通过onmsg、onsysmsg、oncustomsysmsg等回调将在线消息推送给开发者 如果开发者想控制标记消息为已收到的时机, 那么可以传false, 这样SDK就不会自动标记消息已读, 此时需要开发者在适当的时机调用相关的方法来标记消息为已读, 否则下次登录后还会收到未标记为已读的消息。 调用标记系统通知已读来标记系统通知和自定义系统通知为已读状态
         db: true, //是否使用数据库
         // 消息
         onroamingmsgs: this.onRoamingMsgs,
         onofflinemsgs: this.onOfflineMsgs,
         onmsg: this.onMsg,
         // 系统通知
         onsysmsg: this.onSysMsg,
         onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs,
         oncustomsysmsg: this.onCustomSysMsg,
         // 同步完成
         onsyncdone: this.onSyncDone,
      })
   },
   onConnect: function(){
      console.log('im:连接成功')
   },
   onError: function (error, obj){
      console.log('im:发生错误', error, obj);
   },
   onWillReconnect: function(obj){
      console.log('im:即将重连', obj);
   },
   onDisconnect: function(error){
      console.log('im:连接断开', error);
   },
   onLoginPortsChange: function (loginPorts){
      console.log('im:当前登录帐号在其它端的状态发生改变了', loginPorts)
   },
   onRoamingMsgs: function(obj){
      console.log('im:漫游消息', obj);
   },
   onOfflineMsgs: function(obj) {
      console.log('im:离线消息', obj);
   },
   onMsg:function(msg) {
      console.log('im:收到消息', msg);
   },

   //TODO im系统通知和自定义通知之后版本才有，需要了再添加
   onSysMsg:function(sysMsg) {
      console.log('im:收到系统通知', sysMsg)
   },

   onOfflineCustomSysMsgs:function(sysMsgs) {
      console.log('im:收到离线自定义系统通知', sysMsgs);
   },

   onCustomSysMsg:function(sysMsg) {
      console.log('im:收到自定义系统通知', sysMsg);
   },

   onSyncDone:function() {
      console.log('im:同步完成');
   }
})
