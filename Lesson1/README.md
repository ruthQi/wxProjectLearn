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