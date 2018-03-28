//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
   //  var logs = wx.getStorageSync('logs') || []
   //  logs.unshift(Date.now())
   //  wx.setStorageSync('logs', logs)
    //this.getUserInfo();
  },
  getUserInfo:function(callBack){
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
                       console.log(res);
                       //this.setCookies(res.data);
                       this.globalData.NTES_SESS = 'nRh5q1Fgf3In.tRk_6bI0ux7srICo0QNRgAkngXzPG.v3X6Zb3l6uEWRHZJZ2t5KuG68Tmnhg4UKhB9abORY0GUukKUNE3_iZoJX6hA4GuY49hek8suuCXJxyWkb9MI0237wThUjBzB0wBg8oIA2FgKx5tF97dTR.zuLQk9tx0.3J_noct1X2N5ps_0HIxRmM;';
                       this.globalData.P_INFO = 'minttest0004@163.com|1522207098|0|mint_live|00&99|bej&1522205989&mint_live#bej&null#10#0#0|&0|mint_live_check&mint_live|minttest0004@163.com;';
                       this.globalData.S_INFO = '1522207098|0|3&20##|minttest0004s';
                       this.getLoginUserInfo(callBack);
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
           'cookie': 'NTES_SESS=nRh5q1Fgf3In.tRk_6bI0ux7srICo0QNRgAkngXzPG.v3X6Zb3l6uEWRHZJZ2t5KuG68Tmnhg4UKhB9abORY0GUukKUNE3_iZoJX6hA4GuY49hek8suuCXJxyWkb9MI0237wThUjBzB0wBg8oIA2FgKx5tF97dTR.zuLQk9tx0.3J_noct1X2N5ps_0HIxRmM; S_INFO=1522207098|0|3&20##|minttest0004s; P_INFO=minttest0004@163.com|1522207098|0|mint_live|00&99|bej&1522205989&mint_live#bej&null#10#0#0|&0|mint_live_check&mint_live|minttest0004@163.com;'
        },
        success: (res) => {
           //console.log(res)
           this.globalData.userInfo = res.data.data;
           typeof cb === 'function' && cb(this.globalData.userInfo);
        }
     })
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