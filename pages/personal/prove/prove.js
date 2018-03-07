var app = getApp() 
Page({ 
 data: { 
   tempFilePaths: '../../../images/authentication1.png',
   tempFilePaths2: '../../../images/authentication2.png',
   tempFilePaths3: '../../../images/authenticationjz.png',
   tempFilePaths4: '../../../images/authenticationcl.png',
   actionSheetHidden: true,
   actionSheetItems: [
     { bindtap: 'Menu1', txt: '京' },
     { bindtap: 'Menu2', txt: '沪' },
     { bindtap: 'Menu3', txt: '浙' },
   ],
   menu: '京',
   hiddenToast: true
 }, 
 /**
 * 监听button点击事件
 */
 listenerButton: function () {
   this.setData({
     hiddenToast: !this.data.hiddenToast
   })
 },
 /**
  *    toast显示时间到时处理业务 
  */
 toastHidden: function () {
   this.setData({
     hiddenToast: true
   })
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
     menu: "京",
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
 bindMenu2: function () {
   this.setData({
     menu: "沪",
     actionSheetHidden: !this.data.actionSheetHidden
   })
 },
 bindMenu3: function () {
   this.setData({
     menu: "浙",
     actionSheetHidden: !this.data.actionSheetHidden
   })
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
     tempFilePaths:res.tempFilePaths
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
 },
 chooseimage4: function () {
   var _this = this;
   wx.chooseImage({
     count: 1, // 默认9 
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
     success: function (res) {
       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
       _this.setData({
         tempFilePaths4: res.tempFilePaths
       })
     }
   })
 }

}) 

