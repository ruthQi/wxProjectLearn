//app.js
//import observer from './utils/observer.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
   //  var logs = wx.getStorageSync('logs') || []
   //  logs.unshift(Date.now())
   //  wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },
  getUserInfo:function(callBack){
     console.log(this.globalData.userInfo)
     if (this.globalData.userInfo) {
        typeof callBack === 'function' && callBack(this.globalData.userInfo);
        return;
     }
     // 登录
     wx.login({
        success: res => {
           // 发送 res.code 到后台换取 openId, sessionKey, unionId
           let code = res.code;
           wx.getUserInfo({
              success: (res) => {
                 wx.request({
                    url: 'https://reg.163.com/nOuterLogin/oauth2/weixin_applet_connect.do',
                    data: {
                       product: 'mint_live',
                       code: code,
                       encryptedData: res.encryptedData,
                       iv: res.iv

                    },
                    success: (res) => {
                       //console.log(res);
                       //this.setCookies(res.data);
                       this.globalData.NTES_SESS = res.data.NTES_OSESS;
                       this.globalData.P_INFO = res.data.P_OINFO;
                       this.globalData.S_INFO = res.data.S_OINFO;
                       //this.getLoginUserInfo(callBack);
                       //callBack();
                    }
                 })
              }
           })
        }
     })
  },
  getLoginUserInfo: function(cb){
     wx.request({
        url: 'https://test-live.ent.163.com/api/user/loginUserInfo',
        header: {
           'cookie': 'NTES_SESS=' + this.globalData.NTES_SESS + '; S_INFO=' + this.globalData.S_INFO + '; P_INFO=' + this.globalData.P_INFO+';'
        },
        success: (res) => {
           //console.log(res)
           this.globalData.userInfo = res.data.data;
           typeof cb === 'function' && cb(this.globalData.userInfo);
        }
     })
  },
  setRoom: function(room){
      this.globalData.chatroom = room;
  },
  onHide:function(){
      console.log('app onhide')
  },
  globalData: {
    appKey: '1698956d2fae6fb7c0124fe49a53ead5',
    userInfo: null,
    NTES_SESS:'',
    P_INFO:'',
    S_INFO:'',
    chatroom:null,
    location:'https://test-live.ent.163.com'
  }
})