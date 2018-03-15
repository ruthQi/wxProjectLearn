Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled:true,
    country:[
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' }
    ]
  },

  changeDisabled: function(){
    this.setData({
      isDisabled: false
    })
  },
  submitFun: function(e){
    console.log(e.detail.value)
    console.log('提交表单',e)
  },
  resetFun:function(){
    console.log('重置表单')
  },
  getConcat: function(e){
    console.log(e)
  },
  getPhoneNumber:function(e){
    console.log(e)
  },
  //复选框
  changeGroup: function(e){
    console.log('checkbox改变了',e.detail.value);
  },
  //input
  /**
   * 当键盘输入时，触发input事件，event.detail = {value, cursor}，处理函数可以直接 return 一个字符串，将替换输入框的内容。
   */
  changeValue: function(e){
    console.log(e.detail.value);
    //可以在detail中获取到光标的位置
    console.log(e.detail.cursor);
    return 'v'+e.detail.value
  },
  focusFun: function(){
    console.log('聚焦了');
  },
  blurFun: function(){
    console.log('失去焦点')
  },
  bindReplaceInput: function(e){
    var value = e.detail.value;
    var pos = e.detail.cursor;
    //console.log(pos)
    if(pos != -1){
      //光标在中间时，替换1时，光标继续在中间，如果不slice的话，光标会定位到最后
      var left = e.detail.value.slice(0,pos);
      pos = left.replace(/11/g, 2).length;
    }
    return{
      value: value.replace(/11/g, 2),
      cursor:pos
    }
  }
})