//app.js
const Util = require("libs/util");     // 工具类

App({
    onLaunch: function () {         // 生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        this.getUserInfo(function (res) {
            // alert(JSON.stringify(res));
        });
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // // 登录
        // wx.login({
        //     success: res => {
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     }
        // })
        // // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo

        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },
    onShow: function () {   // 生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow

    },
    onHide: function () {   // 生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide

    },
    onError: function () {  // 错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息

    },
    globalData: {           // 全局数据
        userInfo: null
    },
    getUserInfo: function (cb) {
        var _this = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    // 拿到 code
                    var code = res.code;
                    wx.getUserInfo({//getUserInfo流程
                        success: function (result) {//获取userinfo成功
                            console.log(result);
                            // Util.ajax({
                            //     url: '/deskapi/mini',
                            //     data: {
                            //         code: code,
                            //         iv: result.iv,
                            //         encrypt: result.encryptedData
                            //     },
                            //     success: function (res1) {
                            //         console.log("----");
                            //         console.log(res1);
                            //     }
                            // })
                        }
                    })
                }
            });
        }
    }
})
