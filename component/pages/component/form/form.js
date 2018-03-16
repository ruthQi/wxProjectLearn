const date = new Date();
const years = [];
const months = [];
const days = [];
for(let i = 1990;i<date.getFullYear();i++){
  years.push(i);
};
for(let i =1;i<=12;i++){
  months.push(i);
};
for(let i=1;i<=31;i++){
  days.push(i);
}
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
    ],
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [{
      id: 0,
      name: '美国'
    },
    {
      id: 1,
      name: '中国'
    },
    {
      id: 2,
      name: '巴西'
    },
    {
      id: 3,
      name: '日本'
    }],
    index:0,
    multiIndex:[0,0,0],
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    time:'12:01',
    date:'2018-03-16',
    region:['广东省', '广州市', '海珠区'],
    customItem:'全部',
    year: date.getFullYear(),
    month:2,
    day:2,
    years:years,
    months:months,
    days:days,
    value: [9999, 0, 0],
    items:[
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
  },
  //================picker
  bindPickerChange:function(e){
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeObject: function(e){
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerCancel:function(e){
    console.log(e)
  },
  bindMultiPickerChange:function(e){
    console.log(e)
    this.setData({
      multiIndex:e.detail.value
    })
  },
  //联动
  bindMultiPickerColumnChange:function(e){
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindTimePickerChange:function(e){
    console.log(e)
    this.setData({
      time:e.detail.value
    })
  },
  bindDatePickerChange: function(e){
    this.setData({
      date:e.detail.value
    })
  },
  bindRegionPickerChange: function(e){
    console.log(e);
    this.setData({
      region:e.detail.value
    })
  },
  bindPickerviewChange:function(e){
    console.log(e);
    let val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  radioChange: function(e){
    console.log(e)
  },
  bindSliderChange:function(e){
    console.log(e.detail.value)
  },
  bindSliderChanging:function(e){
    console.log(e)
  },
  bindSwitchChange:function(e){
    console.log(e.detail.value)
  },
  bindLineChange:function(e){
    console.log(e.detail)
  },
  //bindinput 处理函数的返回值并不会反映到 textarea 上?????
  //测试后发现是可以反映的，不知道文档为什么说不能？
  bindTextareaInput:function(e){
    console.log(e.detail)
    return 'v'+e.detail.value
  }
})