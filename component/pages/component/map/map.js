Page({

  /**
   * 页面的初始数据
   */
  data: {
     markers:[{
         id: 1,
         latitude: 40.042730,
         longitude: 116.276020,
         width: 30,
         height: 30,
         title:'网易',
         callout:{
            content:'我的位置',
            bgColor:'#FF0000',
            display:'ALWAYS',
            padding:10,
            borderRadius:10,
            color:'#fff'
         },
         label:{
            content: '我的位置',
            bgColor: '#FF00ff',
            display: 'ALWAYS',
            padding: 10,
            borderRadius: 10,
            color: '#fff',
            x:20,
            y:-30
         }
     }],
     polyline: [{
        points: [{
           longitude: 113.3245211,
           latitude: 23.10229
        }, {
           longitude: 113.324520,
           latitude: 23.21229
        }],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
     }],
     
     controls:[{
        id:2,
        iconPath:'../../../images/play.png',
        position:{
           left: 0,
           top: 0,
           width: 50,
           height: 50
        },
        clickable:true
     }]
  },
  bindControlTap: function(e){
     console.log(e)
  },
  bindMarkerTap: function(e){
     console.log(e)
  },
  bindcallouttap: function(e){
     console.log(e)
  },
  getCurrentLoacation: function(){
     //获取位置
     wx.getLocation({
        type:'gcj02',
        success: function(res) {
           console.log(res);
           let latitude = res.latitude;
           let longitude = res.longitude;
           //打开位置
           wx.openLocation({
              latitude: latitude,
              longitude: longitude,
           })
        },
     })
  },
  regionChange: function(e){
     console.log(e)
  },
  bindMapTap: function(e){
     console.log(e)
  }
})