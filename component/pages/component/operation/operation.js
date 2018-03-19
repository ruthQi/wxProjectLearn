var api = "http://live.ent.163.com/api/rank/liveroom/rankList";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //wx.showActionSheet 点击取消或蒙层时,回调 fail, errMsg 为 "showActionSheet:fail cancel"
  /**
   * itemList:按钮的文字数组，数组长度最大6个；
   * itemColor:按钮的文字颜色；
   * success:接口调用成功的回调函数；返回参数：tapIndex:用户点击的按钮，从上到下的顺序，从0开始
   * fail:接口调用失败的回调函数；
   * complete:接口调用结束的回调函数
   */
  showActionSheet:function(){
    wx.showActionSheet({
      itemList: ['A','B','C'],
      itemColor:'red',
      success: (res)=>{
        console.log(res.tapIndex)
      },
      fail: (res)=>{
        console.log(res)
      },
      complete:(res)=>{
        console.log('调用完成',res)
      }
    })
  },
  /**
   * iOS wx.showModal 点击蒙层不会关闭模态弹窗，所以尽量避免使用“取消”分支中实现业务逻辑。
   */
  showModel: function(){
    wx.showModal({
      title: '弹框',
      content: '我是一个模态弹框',
      showCancel:true,//是否展示cancel按钮
      cancelText:'点我点我',//cancel按钮的展示文案，最多4个字符，超过4个字符报错
      cancelColor:'red',//cancel文案的展示颜色
      confirmText:'去充值',//确认按钮的展示文字
      confirmColor:'skyblue',//确认按钮展示文字的颜色
      success: (res)=>{
        console.log(res)
        //res返回中confirm为true时，表示点击了确定按钮
        if(res.cancel){
          console.log('点击了取消按钮')
        }
        if(res.confirm){
          console.log('点击了确定按钮')
        }
      },
      fail: (res)=>{
        console.log(res)
      }
    })
  },
  showToast:function(){
    wx.showToast({
      title: '正在加载',
      icon:'loading',//icon的取值：success,loading,none,默认取值为success
      duration:10000,//提示的延迟时间
      mask:true,//是否展示透明的蒙层，防止触摸穿透，默认值为false
      success:(res)=>{
        console.log(res)
      }
    });
    /**
     * wx.request()参数：
     * url,data,header,method，dataType,responseType,success,fail,complete
     */
    wx.request({
      url: api,
      data: { 
        type:2,
        roomId:81454536
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      responseType: 'text',//取值：arraybuffer/text，默认值为text
      success:(res)=>{
        console.log(res);
        if(res.data && res.data.code == 200){
          //隐藏消息提示框
          wx.hideToast();
        }
      }
    })
  },
  /*
  wx.showLoading不会自己消失，需要调用hideLoading才可消失；
  showToast和showLoading二者同时只能展示一个，应该配对使用对应的hide方法
  */
  showLoading: function(){
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: (res)=>{
        console.log(res)
      }
    });
    setTimeout(()=>{
      wx.hideLoading();
    },3000)
  }
})