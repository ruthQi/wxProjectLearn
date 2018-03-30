
//获取应用实例
const app = getApp();
import request from '../../models/request.js';
import Chat from '../../utils/linkChat.js';
import observer from '../../utils/observer.js';
//var chatroom = null;
//import { ChatRoom } from '../../utils/linkChat.js';
var flag = true;
var chatroom = null;
let array = [];
var i = 0;
/**
 * 当打开一个页面,room.wxml,在点击回退，在进入room.wxml,这时候上个页面并未销毁，还存在data域，触发socket后，还会存到上个页面的data中去；所以存在，联系触发两次 socket，一次存入上个页面，一个存入当前页面，虽然收到2条socket,但是只会渲染一次
 setData目前测试不存在延时，上面赋值，下面就可以获取到新值
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomData: {},
        pullUrl: 'http://pullhlsbohetec1.live.126.net/live/e309955592574771b8db768c1dd3610a/playlist.m3u8',
        imputValue: '',
        messageList: [],
        focus: false,
        userInfo: null,
        appKey: '',
        token: '',
        account: '',
        messages:[],
        testData:[]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(flag)
        this.haddleMessage();
        app.getLoginUserInfo((userInfo) => {
            console.log('===========', userInfo)
            console.log(options)
            request.request('/api/liveroom/user/enter', {
                userId: userInfo.user.userId,
                roomId: options.roomId
            }, 'POST', (res) => {
                console.log(res)
                let room = res.data.data.room;
                this.setData({
                    roomData: res.data.data,
                    userInfo: userInfo.user,
                    appKey: app.globalData.appKey,
                    account: userInfo.user.accid,
                    token: userInfo.yunxinToken,
                })
                //console.log('==========', app.globalData)
                this.linkChatRoom(room.yxRoomId);
            })
        });
        flag = false;
        this.timer = setInterval(this.renderMessage, 300);
    },
    onShow: function(){
         console.log('onShow')
    },

    linkChatRoom: function (yxRoomId) {
        var params = {
            appKey: this.data.appKey,
            account: this.data.account,
            token: this.data.token,
            chatroomId: yxRoomId,
            chatroomAddresses: ['wlnimsc1.netease.im:443']
        }
        chatroom = new Chat(params)
        //console.log('========', chatroom);
        app.setRoom(chatroom);
    },
    sendMessage: function () {
        request.request('/api/chat/roomChat', {
            roomId: this.data.roomData.room.roomId,
            userId: this.data.userInfo.userId,
            message: this.data.inputValue
        }, 'POST', (res) => {
            //console.log('------------',res);
            if (res.data.data) {
                let data = {
                    type: 'msg_chat',
                    data: res.data.data.eventData
                }
                this.data.messages.push(data);
            }

        })
        this.setData({
            inputValue: '',
            focus: true
        })
    },
    inputMessage: function (e) {
        //console.log(e)
        this.setData({
            inputValue: e.detail.value
        })
    },
    haddleMessage: function () {
        console.log('9999999999999999')
        observer.on('msg_chat', this.testFun);
        //observer.on('user_enter', this.showMessage);
        //observer.on('live_user_list', this.showMessage);
        this.testFun();
        this.testFun();

    },
    testFun:function(){
       console.log(new Date().getTime())
       i++;
       let arr = this.data.testData;
       arr = arr.concat([i])
       console.log('i', i, arr)
       this.setData({
          testData: arr
       })
    },
    showMessage: function (data) {
        //console.log('data.type', data.type);
        console.log(new Date().getTime())
        if (data.type == 'msg_chat' && data.data.user.userId == this.data.userInfo.userId) {
            return;
        }
        array = array.concat([data]);
       // 数组使用push有问题
        //console.log(array.push(data))//输出1


      //   let list = this.data.messages;
      //   console.log('============', list)
      //   list = list.concat([1])
      //   this.setData({
      //      messages: list
      //   })
      //   console.log('this.data.messages', this.data.messages)
        
        

    },
    renderMessage: function () {
        if (array.length > 0) {
            let list = [...this.data.messageList];
            console.log('array',array)
            list = list.concat(array);
            //console.log(list)
            if (list.length > 200) {
                list.splice(0, 100);
            }
            this.setData({
                messageList: list
            });
            array = [];
        }
    }
})