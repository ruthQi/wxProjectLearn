Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'hahhahaha',
    arr:[1,2,3,4,5],
    zero:0,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2018-03-05' 
    },
    objectArray:[
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'}
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(){
    let length = this.data.objectArray.length;
    for(var i=0;i<length;i++){
      const x = Math.floor(Math.random() * length);
      const y = Math.floor(Math.random() * length);
      const temp = this.data.objectArray[x];
      this.data.objectArray[x] = this.data.objectArray[y];
      this.data.objectArray[y] = temp;
    }
    this.setData({
      objectArray:this.data.objectArray
    })
  },
  addToFont: function(){
    let length = this.data.objectArray.length;
    this.data.objectArray = [{id:length,unique:`unique_${length}`}].concat(this.data.objectArray);
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberFront: function(){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray);
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})