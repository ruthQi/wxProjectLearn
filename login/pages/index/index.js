

Page({
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
   }
})
