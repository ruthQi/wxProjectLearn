var app = getApp();
const request = {
   request: function(url, data={}, type, callback){
      wx.request({
         url: app.globalData.location + url,
         data: data,
         method: type,
         header: {
            'content-type': 'application/json', // 默认值
            'cookie': 'NTES_SESS=' + app.globalData.NTES_SESS + '; S_INFO=' + app.globalData.S_INFO + '; P_INFO=' + app.globalData.P_INFO+';'
         },
         success: (res)=>{
            //console.log(res)
            callback(res)
         }
      })
   }
}

export default request;