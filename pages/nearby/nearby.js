const { extend, Tab } = require('../../zanui/index');
Page(extend({}, Tab,{
  data: {
    showView: true,
    popdown:false,
    choseRecommend:false,
    recently:false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    tab2: {
         color:'#eee',
         selectedId: 'all',
         scroll:true,
         list:[{
          // tab 项 id
          id: 'all',
          // tab 项展示文案
          title: '全部',
          src:'../images/test/index-navicon10.jpg'
        }, {
          id: 'topay',
          title: '汽车',
          src:'../images/test/index-navicon3.jpg'
        }, {
          id: 'tosend',
          title: '美食',
          src:'../images/test/index-navicon2.jpg'
        }, {
          id: 'send',
          title: '生活',
          src:'../images/test/index-navicon4.jpg'
        }, {
          id: 'sign',
          title: '休闲娱乐',
          src:'../images/test/index-navicon5.jpg'
        }, {
          id: 'jianshne',
          title: '健身娱乐',
          src:'../images/test/index-navicon5.jpg'
        }, {
          id: 'checkrn',
          title: '小吃快餐',
          src:'../images/test/index-navicon5.jpg'
        }, {
          id: 'pl',
          title: '聚会宴请',
          src:'../images/test/index-navicon5.jpg'
        }, {
          id: 'baoyang',
          title: '汽车保养',
          src:'../images/test/index-navicon5.jpg'
        }]
    }
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },
  handleZanTabChange({ componentId, selectedId }) {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 tab 时，进行区分
    // selectId 表示被选中 tab 项的 id
    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
},
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  onChangeShowSta: function () {
    var that = this;
    that.setData({
      popdown: (!that.data.popdown),
      choseRecommend:false,
      recently:false,
    })
  },
  recommendChose(){
      var _this = this;
      _this.setData({
          choseRecommend: !_this.data.choseRecommend,
          popdown: false,
          recently:false,
      })
  },
  recentlyChose(){
      var _this = this;
      _this.setData({
          recently: !_this.data.recently,
          popdown: false,
          choseRecommend:false,
      })
  },
  onTap: function (event) {
    wx.navigateTo({
      url: "../seach/seach"
    });
  },
  onshopdetail: function (event) {
    wx.navigateTo({
      url: "../shopdetails/shopdetails"
    })
  }
}));
