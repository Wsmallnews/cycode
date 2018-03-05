//index.js

Page({
  data: {
    showView: true, 
    flag: true
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

  // 弹出层函数
  //出现
  hbshow: function () {

    this.setData({ flag: false })

  },
  //消失

  hbhide: function () {

    this.setData({ flag: true })

  },
  onTapsite: function (event) {
    wx.navigateTo({
      url: "../switchcity/switchcity"
    });
  },
  onTapsearch: function (event) {
    wx.navigateTo({
      url: "../seach/seach"
    });
  },
  onTapsearch: function (event) {
    wx.navigateTo({
      url:"../seach/seach"
    });
  },
  onshopdetail: function(event){
    wx.navigateTo({
      url: "../shopdetails/shopdetails"
    })
  },
  ontapindexmore: function (event) {
    wx.navigateTo({
      url: "../index/indexmore/indexmore"
    });
  }
})
