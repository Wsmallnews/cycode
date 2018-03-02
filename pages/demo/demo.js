//index.js
//获取应用实例
const app = getApp()
const { Actionsheet, Noticebar, extend } = require('../../zanui/index');

Page({
    data: {
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
        }
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
    onLoad: function () {
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
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onShow() {
        // 在方法中传入对应的 componentId
        // this.initZanNoticeBarScroll('noticebar');   // 参数对应 noticeBar 的 componentId
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
