Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */

      onTapcollect: function (event) {
        wx.navigateTo({
          url: "../personal/collect/collect"
        });
      },
      onTapcomment: function (event) {
        wx.navigateTo({
          url: "../personal/comment/comment"
        });
      },
      onTapprove: function (event) {
        wx.navigateTo({
          url: "../personal/prove/prove"
        });
      },
      onTaptrade: function (event) {
        wx.navigateTo({
          url: "../personal/trade/trade"
        });
      },
      onTapteam: function (event) {
        wx.navigateTo({
          url: "../personal/team/team"
        });
      },
      onTapgrade: function (event) {
        wx.navigateTo({
          url: "../personal/vipgrade/vipgrade"
        });
      },
      onTapmodify: function (event) {
        wx.navigateTo({
          url: "../personal/modify/modify"
        });
      },
      onTapcreateshop: function (event) {
        wx.navigateTo({
          url: "../personal/createshop/createshop"
        });
      },
      onTapaccountsaft: function (event) {
        wx.navigateTo({
          url: "../personal/accountsaft/accountsaft"
        });
      },
  })