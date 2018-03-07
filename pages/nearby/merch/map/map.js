var bmap = require('../../../utils/bmap-wx.js')
var app = getApp()
Page({
  data: {
    height: 'auto'
  },
  onLoad: function () {
    //保证wx.getSystemInfo的回调函数中能够使用this
    var that = this

    //调用wx.getSystemInfo接口，然后动态绑定组件高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })

  }
})