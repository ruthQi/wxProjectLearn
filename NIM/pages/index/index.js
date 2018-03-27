//require('');
//require('../../utils/chatRoom.js');
import Chat from '../../utils/chat.js'
var app = getApp();
Page({
   data: {
      account: '',
      token: ''
   },
   loginFun: function () {
      wx.login({
         success: (res) => {
            console.log(res);
            let code = res.code;
            wx.getUserInfo({
               success: (res) => {
                  //console.log(res)
                  //请求urs
                  wx.request({
                     url: 'https://reg.163.com/nOuterLogin/oauth2/weixin_applet_connect.do',
                     data: {
                        product: 'mint_live',
                        code: code,
                        encryptedData: res.encryptedData,
                        iv: res.iv

                     },
                     success: (res) => {
                        console.log(res)
                     }
                  })
               }
            })
         }
      })
   },
   testCookie: function () {
      wx.request({
         url: 'https://live.ent.163.com/api/user/loginUserInfo',
         header: {
            'cookie': 'NTES_SESS=nQ2oJeXbboMCE3mUN6s3A1CyokAIFEbBkZ4tuZRbj8q13iTX3xgZlswCVRk1ODeBo.RFq0y8j_GC_G_8c.TV5veJWQvl8HtusE5nnuzzicX_jbGpQQV_hQlRebP82BSPouho7phKB8COtnjjT7TFLTjQdD6SBn3lZoy4O.YlGwddMsr6PHupM0BrDY_Z5cUoT44R3qsAUt2ts; S_INFO=1522115663|0|1&85##|qi0428ru; P_INFO=qi0428ru@163.com|1522115663|0|mint_live|11&17|bej&1522059795&kaola#bej&null#10#0#0|&0|yanxuan&kaola&mint_live_check&mint_live&game&note_client&kaola_check|qi0428ru@163.com;'
         },
         success: (res) => {
            console.log(res)
            this.setData({
               account: res.data.data.user.accid,
               token: res.data.data.yunxinToken
            })
         }
      })
   },
   testSDK: function () {
      //console.log(NIM);
      var params = {
         appKey: '148fa6ae30b2822c171a52460ab9b265',
         account: this.data.account,
         token: this.data.token,
         chatroomId: 21200799
      }
      new Chat(params)
   },
   
})
