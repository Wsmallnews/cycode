Page({
  data: {
    showView: true,
    showfilternav: true
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  }
  ,
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
      showfilternav: (options.showfilternav == "true" ? true : false)
  }
  , onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }
  , onChangeShowSta: function () {
    var that = this;
    that.setData({
      showfilternav: (!that.data.showfilternav)
    })
  }
  , onTap: function (event) {
    wx.navigateTo({
      url: "../seach/seach"
    });
  },
  onshopdetail: function (event) {
    wx.navigateTo({
      url: "../shopdetails/shopdetails"
    })
  }
})