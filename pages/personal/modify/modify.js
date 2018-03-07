var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:null,
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '男' },
      { bindtap: 'Menu2', txt: '女' },
    ],
    menu: '选择性别',
    hiddenToast: true
  }, 
  actionSheetTap: function () {
   this.setData({
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
 actionSheetbindchange: function () {
   this.setData({
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
 bindMenu1: function () {
   this.setData({
     menu: "男",
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
 bindMenu2: function () {
   this.setData({
     menu: "女",
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
  setPhotoInfo:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({ imgUrl: tempFilePaths })
      }
    })
  },
   setNickName: function (event) {
    wx.navigateTo({
      url: "../../personal/modify/inputtext/inputtext"
    });
  },
   setAutograph: function (event) {
     wx.navigateTo({
       url: "../../personal/modify/inputtext/inputtext"
     });
   },
   
   onLoad: function () {
     console.log('onLoad')
     var that = this
     //调用应用实例的方法获取全局数据  
     app.getUserInfo(function (userInfo) {
       //更新数据  
       that.setData({
         userInfo: userInfo
       })
     })
   }  
  
})