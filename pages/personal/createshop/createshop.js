var app = getApp()
Page({
  data: {
    tempFilePaths: '../../../images/sfcardz.png',
    tempFilePaths2: '../../../images/sfcardf.png',
    tempFilePaths3: '../../../images/yyzz.png',
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  chooseimage2: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          tempFilePaths2: res.tempFilePaths
        })
      }
    })
  },
  chooseimage3: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        _this.setData({
          tempFilePaths3: res.tempFilePaths
        })
      }
    })
  }

})

