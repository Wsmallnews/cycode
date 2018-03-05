const Util = require('../../../libs/util');

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        listConf: {
            type: Object,
            value: {},
            observer: function () {
                cListConf = Util.extend(this.defaultListConf, this.listConf, true);
                this.setData({
                    cListConf: cListConf
                });
            }
        },
        noMore: {
            type: Boolean,
            value: false
        },
        isHandStart: {
            type: Boolean,
            value: false
        },
        showLoading: {
            type: Boolean,
            value: false
        }
    },
    data: {     // 这里是一些组件内部数据
        loading: false,
        pullUp: true,
        cssLoading: true,
        loadTip: "正在加载...",
        loadingGif: loadingGif,
        defaultListConf: {      // 默认配置参数
            url: "",
            pageSize: 10,
            total: 0,
            searchParams: {},
            addField: [],
        },
        cListConf: {},           // 合并之后的配置参数
        item: [],
        total: 0,
        current: 1,
        queryParams: {},
        onePage: false,
    },
    methods: {  // 这里是一个自定义方法
        listInit: function (){
            var _this = this;

            // _this.queryParams['page'] = _this.current;
            // _this.queryParams['page_size'] = _this.cListConf['pageSize'];
            _this.setData({
                'queryParams.page': _this.current,
                'queryParams.page_size': _this.cListConf['pageSize']
            });

            _this.pullUpStart();    // 初始化上拉加载
            _this.listLoad();
        },
        // listLoadData: function (cb) {         // 只获取数据
        //     var _this = this;
        //     _this.listBaseRequest(cb);
        // },
        listLoad: function (is_reset) {      // 加载列表
            var _this = this;

            if (_this.loading) {    // 如果正在加载，返回
                return;
            }

            _this.setData({         // 正在加载
                loading: true
            })

            _this.listBaseRequest(function(result){
                if (!result.error){
                    _this.loading = false;
                    var data = result.result;

                    // _this.total = data.total;
                    _this.setData({
                        total: data.total
                    });

                    if (data.current_page == 1) {
                        _this.triggerEvent('setTotal', data.total);
                    }

                    // _this.current = data.current_page;
                    // _this.onePage = _this.total <= _this.cListConf.pageSize;
                    _this.setData({
                        current: data.current_page,
                        onePage: _this.total <= _this.cListConf.pageSize
                    });

                    var item = data.data;
                    if (_this.cListConf.addField.length || _this.cListConf.operBack != undefined){
                        const field = _this.cListConf.addField;
                        const callback =  _this.cListConf.operBack;
                        for (var i in item) {
                            if (field.length) {
                                for (var j in field) {
                                    item[i][field[j]['name']] = field[j]['value'];
                                }
                            }

                            if (callback != undefined) {
                                item[i] = callback(item[i]);
                            }
                        }
                    }

                    if (data.current_page == 1) {
                        // _this.cssLoading = false;
                        // _this.item = item;
                        _this.setData({
                            cssLoading: false,
                            item: item
                        });
                    } else {
                        // _this.item = _this.item.concat(item);
                        _this.setData({
                            cssLoading: false,
                            item: _this.item.concat(item)
                        });
                    }

					_this.triggerEvent('requestFinish');

                    if (data.current_page >= data.last_page) {
                        wx.stopPullDownRefresh();       // 停止上拉加载

                        // _this.pullUp = false;   // 没有更多数据了
                        // _this.loadTip = "别扯了，我是有底线的~";
                    }
                }
            })
        },
        listBaseRequest: function (cb) {      // ajax 请求
            var _this = this;

            Util.extend(_this.queryParams, _this.cListConf['searchParams']);        // 浅拷贝导致的不需要接受返回值

            if (_this.showLoading && _this.queryParams.page == 1) {
                Util.loading("正在加载...");
            }
            Util.ajax({
                url: _this.cListConf['url'],
                data : _this.queryParams,
                method:'get',
                success: function (result){
                    if (cb != undefined) {
                        if (_this.showLoading) {
                            Util.hideLoading()
                        }

                        cb(result);
                        return true;
                    }else {
                        return result;
                    }
                }
            });
        },
        listSearch: function(){         // 搜索
            var _this = this;
            // _this.queryParams['page'] = 1;
            _this.setData({
                'queryParams.page': 1
            });
            _this.listReset();
            _this.listLoad(true);
        },
        listNextPage: function(page){         // 上下页
            var _this = this;

            // _this.queryParams['page'] = page;
            _this.setData({
                'queryParams.page': page
            });
            _this.listLoad();
        },
        listSelect: function(index){
            this.triggerEvent('select', index);
        },
        // listItemOper: function (cb) {
        //     var _this = this;
        //     if (cb != undefined && typeof cb == 'function') {
        //         _this.item = cb(_this.item);
        //     }
        // },
        // listReset () {
        //     this.pullUp = true;
        //     this.loadTip = "正在加载...";
        // },
        // keywordSearch: function(keyword){
        //     var _this = this;
        //     var key = _this.searchKey != undefined ? _this.searchKey : 'keyword';
        //     _this.cListConf.searchParams[key] = keyword;
        //     _this.listSearch();
        // },
        // cancelSearch: function() {
        //     this.$emit('cancleSearch');
        // },
        // operItem: function (cb) {
        // 	var _this = this;
        // 	if (typeof cb == 'function') {
        // 		_this.item = cb(_this.item);
        // 	}
        // },
        handStart() {
            this.listInit();
        },
        pullUpStart() {     // 第一页加载开始之后初始化上啦加载
            var _this = this;
            if (!_this.noMore) {
                wx.startPullDownRefresh({
                    success: function(){
                        if (_this.pullUp) {
                            var nextPage = (_this.current) + 1;
                            _this.listNextPage(nextPage);
                        }
                    }
                })
            }
        }
    },
    created() {  // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
        var _this = this;

        if (!_this.isHandStart) {
            _this.listInit();
        }
    },
    attached() { // 组件生命周期函数，在组件实例进入页面节点树时执行

    },
    ready() {    // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）

    }
})
