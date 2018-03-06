//index.js
//获取应用实例
const app = getApp()
// const { Actionsheet, Noticebar, Toast, extend } = require('../../zanui/index');
const Util = require('../../libs/util');

Page({
    data: {     // 页面的初始数据
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        actionsheet: {      // actionsheet
            show: false,
            cancelText: "取消",
            actions: [{
                // 按钮文案
                name: '选项1',
                // 按钮描述文案，不传就不显示
                subname: '选项描述语1',
                // 按钮特殊类，可以通过传入这个，为按钮增加特殊样式
                className: 'action-class',
                // 按钮是否显示为 loading
                loading: false,
                // 按钮的微信开放能力
                // 具体支持可参考微信官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html
                openType: 'share'
            }]
        },
        loadStaus: {
            loading: true
        },
        merchs: [],
        listConf: {
            url: '/deskapi/merchs',
            item: [],
            searchParams: {
                abc: '123'
            }
        }
    },
    onLoad: function (options) {       // 生命周期函数--监听页面加载
        // 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        // 加载商家列表
        this.getMerchs();

        console.log('----onLoad');
    },
    onShow() {      // 生命周期函数--监听页面显示
        console.log('----onShow');
        // this.showZanToast('success', 100000);
        Util.toast({
            title: '已完成'
            // icon: 'success',
            // duration: 3000
        });
        // wx.showActionSheet({
        //     itemList: ['A', 'B', 'C'],
        //     success: function(res) {
        //         if (!res.cancel) {
        //             console.log(res.tapIndex)
        //         }
        //     }
        // });
        console.log('----1122331');
    },
    onReady() {     // 生命周期函数--监听页面初次渲染完成
        // console.log('----onReady');
        this.myList = this.selectComponent("#myList");
    },
    onHide() {      // 生命周期函数--监听页面隐藏
        console.log('----onHide');
    },
    onUnload() {    // 生命周期函数--监听页面卸载
        console.log('----onUnload');
    },
    onPullDownRefresh() {           // 页面相关事件处理函数--监听用户下拉动作
        console.log('----I pull down');
        // wx.stopPullDownRefresh可以停止当前页面的下拉刷新
    },
    onReachBottom() {               // 页面上拉触底事件的处理函数
        this.myList.nextStart();
    },
    onShareAppMessage() {           // 用户点击右上角转发
        console.log('----share');

        return {                    // 分享自定义内容
            title: '自定义转发标题',
            path: '/page/user?id=123'
        }
    },
    onPageScroll(options) {                // 页面滚动触发事件的处理函数 包含页面 scrollTop
        console.log('----page scroll');
    },
    onTabItemTap() {                // 当前是 tab 页时，点击 tab 时触发
        console.log('----click tap');
    },
    showPageMethods() {                     // 简单展示 部分 page 对象常用属性
        // Page.prototype.route
        console.log(this.route);
        this.setData({
            'actionsheet.show': false
        }, function () {
            // 设置完成之后的回调
        });
    },
    getMerchs () {
        var _this = this;
        // console.log('request');
        // Util.ajax({
        //     url: "/deskapi/merchs",
        //     data: {page_size: 5},
        //     success: function(result) {
        //         _this.setData({merchs: result.result.data});
        //     }
        // });
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    showAction: function() {
        this.setData({
            'actionsheet.show': true
        });
    },
    switchLoadMore: function () {
        this.setData({
            'loadStaus': {nodata: true}
        });
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    requestFinish: function (e) {
        this.setData({
            'listConf.item': e.detail.item
        });
    }
})




// Page(Object.assign({}, Noticebar, {
//   data: {
//     movable: {
//       text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
//     },
//     static1: {
//       text: '足协杯战线连续第2年上演广州德比战'
//     },
//     static2: {
//       text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
//     }
//   },
//   onShow() {
//     // 滚动通告栏需要initScroll
//     this.initZanNoticeBarScroll('noticebar');
//     // initScroll的通告栏如果宽度足够显示内容将保持静止
//     // this.initZanNoticeBarScroll('static1');
//     // 不进行initScroll的通告栏也将保持静止
//     // this.initZanNoticeBarScroll('static2');
//   }
// }))

// Page(extend({}, Actionsheet, {
//     data: {
//         actionsheet: {
//             show: true,
//             actions: []
//         }
//     }
// }));
