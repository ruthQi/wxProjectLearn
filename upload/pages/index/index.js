
Page({
   data:{
      imgSrc:'',
      downloadSrc: ''
   },
   uploadImg: function(){
      wx.chooseImage({
         count:2,//最多可以选择的图片张数，默认9
         sizeType: ['original','compressed'],//original 原图，compressed 压缩图，默认二者都有
         sourceType: ['album','camera'],//album 从相册选图，camera 使用相机，默认二者都有
         success: (res)=> {
            console.log(res)
            this.setData({
               imgSrc: res.tempFilePaths[0]//在开发者工具上展示不出来图片
            });
            // wx.request({
            //    url: 'https://live.ent.163.com/api/common/upload',
            //    method:'POST',
            //    data: {
            //       Filedata: res.tempFiles[0]
            //    },
            //    success: (res)=>{
            //       console.log(res)
            //    }
            // })
            //需要后台重写文件接收，进行上传
            //目前的接口，报400，参数错误
            wx.uploadFile({
               url: 'https://live.ent.163.com/api/common/upload',
               filePath: res.tempFilePaths[0],
               header: { "Content-Type": "multipart/form-data" },
               name: 'Filedata',
               success:(res)=>{
                  console.log(res)
               }
            })
         },
      })
   },
   downloadFile: function(){
      wx.downloadFile({
         url:'https://mint-public.nosdn.127.net/mint_1522047832247_41845329.png',
         success: (res)=>{
            console.log(res)
            this.setData({
               downloadSrc: res.tempFilePath
            })
         }
      })
   }
})
