入口核心文件为 app.js,app.json

app.js:程序的逻辑事件。定义了onLaunch方法，全局方法，全局属性；注册的页面可以使用getApp（）获取app实例；

app.json:公共的设置。所有被访问的页面都需要在此文件的pages中注册；所写的第一个文件是第一个展示的页面(即首页)；此文件还可以定时是否需要有tabBar,以及tabBar的样式等；此文件还设置了背景色，title标题颜色及文字等

app.wxss：公共样式表。定义了全局公共样式

app.json文件中注册的文件路径‘pages/index/index’不带后缀名，是因为在定位到pages下index下的js,wxml,wxss,json四个文件整合

在index中，js文件定义了页面自己的方法，属性；wxml定义了页面的结构；wxss定义了页面自己的样式，此文件中的定义的样式优先级高于app.wxss文件的样式优先级；json文件定义了页面自己的属性，优先级高于app.json中定义的属性，例如：index.json中配置了"navigationBarTitleText": "首页"，会覆盖了app.json下的"navigationBarTitleText": "WeChat"。

每个页面中js，wxml，wxss，json四个文件中js和wxml文件是必须的，其他可以没有

app.json文件包括pages, window, tabBar, networkTimeout, debug;
  pages中数组第一项代表x小程序的初始页面;小程序中新增/减少都需要对pages数组进行修改；文件名不需要写文件后缀，因为框架会自动去寻找路径下 .json, .js, .wxml, .wxss 四个文件进行整合。
  window用于设置小程序的状态栏、导航条、标题、窗口背景色；
    backgroundTextStyle:影响下拉loading的样式；
    navigationStyle：custom/default,影响导航条的元素多少；
    backgroundColor：下拉时可以看出背景颜色的样式；
    enablePullDownRefresh：下拉刷新
    onReachBottomDistance：页面上拉触底事件触发时距页面底部距离，单位为px
  tabBar:可以通过tabBar配置项指定tab栏的表现，以及tab切换时显示的对应页面
    tabBar中的list是一个数组，只能配置最少2个，最多5个tab

page.json:
  页面的.json只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键
  页面中配置项会覆盖 app.json 的 window 中相同的配置项

App()用来注册一个小程序
  注意事项：
  App()必须在app.js中注册，且不能注册多个；
  不要在定义App()的函数中调用getApp(),使用this就可以拿到app实例;
  使用getApp()获取实例后，不要私自调用生命周期函数；
  不要在onLaunch的时候调用getCurrentPages(),此时page还没生成；

Page()用来注册一个页面，接受一个object参数，用来指定页面的初始数据，生命周期函数，事件处理函数等
setData(data,callback):用于将数据从逻辑层发送到视图层（异步），同事改变对应的this.data的值（同步）
  注意事项：
  1.直接修改this.data的值而不调用this.setData是无法改变页面的状态的，还会造成数据不一致；
  2.单次设置的数据不能超过1024kb,请尽量避免一次设置过多的数据
  3.请不要把data中的任何值设置为undefined,否则这一项将不被设置并可能遗留一些潜在问题

路由相关：
tips：
1.navigateTo,redirectTo只能打开非tabBar页面;
2.switchTab只能打开tabBar页面；
3.reLaunch可以打开任意页面
4.调用页面路由带的参数可以在目标页面的onLoad中获取。