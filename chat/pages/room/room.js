
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
        account: ''

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
        observer.on('msg_chat', this.showMessage);
        //observer.on('user_enter', this.showMessage);
        //observer.on('live_user_list', this.showMessage);
    },
    showMessage: function (data) {
        console.log('data.type', data.type);
        if (data.type == 'msg_chat' && data.data.user.userId == this.data.userInfo.userId) {
            return;
        }
        array = array.concat([data]);
      //   this.setData({
      //      messages: array
      //   })

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