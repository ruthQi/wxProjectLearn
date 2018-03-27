var app = getApp();
var NIM = require('./NIM.js');
import observer from './observer.js';
export default class IMHandle {
   constructor(config){
      this.isConnected = false;
      app.globalData.nim = NIM.getInstance({
         appKey: config.appKey,
         account: config.account,
         token: config.token,
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
   }
   onConnect() {
      console.log('im:连接成功')
      this.isConnected = true;
      observer.emit('im:connect');
   }
   onError(error, obj) {
      console.log('im:发生错误', error, obj);
   }
   onWillReconnect(obj) {
      console.log('im:即将重连', obj);
   }
   onDisconnect(error) {
      this.isConnected = false;
      console.log('im:连接断开', error);
   }
   onLoginPortsChange(loginPorts) {
      console.log('im:当前登录帐号在其它端的状态发生改变了', loginPorts)
   }
   onRoamingMsgs(obj) {
      console.log('im:漫游消息', obj);
   }
   onOfflineMsgs(obj) {
      console.log('im:离线消息', obj);
   }
   onMsg(msg) {
      console.log('im:收到消息', msg);
   }

   //TODO im系统通知和自定义通知之后版本才有，需要了再添加
   onSysMsg(sysMsg) {
      console.log('im:收到系统通知', sysMsg)
   }

   onOfflineCustomSysMsgs(sysMsgs) {
      console.log('im:收到离线自定义系统通知', sysMsgs);
   }

   onCustomSysMsg(sysMsg) {
      console.log('im:收到自定义系统通知', sysMsg);
   }

   onSyncDone() {
      console.log('im:同步完成');
   }
}