Page({
  /**
   * currentTarget:表示当前的元素
   * target:表示触发事件的元素
   * 如果当前元素与点击元素为同一个，则两个元素相同；如果当前元素与点击元素不是同一个（例如冒泡事件），      则两个获取的元素不相同
   * 
   * event对象中的target或者currentTarget中有dataset属性，这里存放的值为在节点上定义的data-xxx属性
   * 在dataset中的形式为{xxx:yyy};
   * 如果需要传递值给点击事件，可以使用这种方式，去datset中获取值
   */
  innerTap: function(event){
    console.log(event);
    //{index:1}
    console.log(event.target.dataset);
    console.log('我是innerTap触发的');
  },
  middleTap:function(event){
    console.log(event);
    /**
     * 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在          event.currentTarget.dataset 中会将连字符转成驼峰elementType
     */
    console.log(event.currentTarget.dataset.testIndex);
    console.log('我是middleTap触发的');
  },
  outerTap: function(event){
    console.log(event);
    console.log('我是outerTap触发的');
  },
  catchInnerTap: function(){
    console.log('我是catch inner tap触发的');
  },
  catchMiddleTap: function(){
    console.log('我是catch middle tap触发的');
  },
  catchOuterTap: function(){
    console.log('我是catch outer tap触发的');
  },
  bindInnerMove: function(event){
    console.log(event);
    console.log('我是bind inner move触发的');
  },
  catchInnerStart: function(){
    console.log('我是catch inner start触发的');
  },
  //=========================================
  /**
   * 事件流包括三个阶段：事件捕获阶段，处于目标阶段和事件冒泡阶段；首先发生的是事件捕获，然后实际的目标接受事件，进入冒泡阶段，对事件作出反应
   */
  /**
   * 捕获事件的定义方式 capture-bind:touchstart,不能写成capture-bindtouchstart这形式
   * 捕获事件与冒泡事件的顺序相反：捕获事件的顺序：父元素->子元素；冒泡事件顺序： 子元素-》父元素；
   */
  //捕获事件先于冒泡事件
  captureInner: function(){
    console.log('我是捕获事件Inner');
  },
  captureOuter:function(){
    console.log('我是捕获事件Outter');
  },
  captureOuterBind: function(){
    console.log('我是绑定冒泡事件outtet');
  },
  captureInnerBind: function(){
    console.log('我是绑定冒泡事件Inner');
  },
  //使用capture-catch可以阻断捕获事件并取消冒泡阶段
  //所以使用capture-catch时，无论使用bind或者catch都不会执行到冒泡阶段，也不存在是否组织冒泡的行为了
  captureOuterCatch: function(){
    console.log('我是非冒泡事件outter');
  },
  captureInnerCatch: function(){
    console.log('我是非冒泡事件inner');
  },
  captureOuterStop: function(){
    console.log('我是非冒泡事件的非捕获事件outter')
  },
  captureInnerStop: function () {
    console.log('我是非冒泡事件的非捕获事件Inner')
  }
  
})