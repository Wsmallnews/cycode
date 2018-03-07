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
            observer: function (newVal, oldVal) {
                var cListConf = Util.extend(this.data.defaultListConf, newVal, true);

                this.setData({
                    cListConf: cListConf
                });
            }
        },
        name: {
            type: String,
            value: ''
        },
        noMore: {
            type: Boolean,
            value: false
        },
        isHandStart: {
            type: Boolean,
            value: false
        },
        isRefresh: {
            type: Boolean,
            value: true
        },
        showLoading: {
            type: Boolean,
            value: false
        }
    },
    data: {     // 这里是一些组件内部数据
        loading: false,
        pullUp: false,
        loadTip: "正在加载...",
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
        loadStaus: { nomore: true },
    },
    methods: {  // 这里是一个自定义方法
        listInit: function (){
            var _this = this;

            _this.setData({
                'queryParams.page': _this.data.current,
                'queryParams.page_size': _this.data.cListConf['pageSize']
            });

            _this.listLoad();
        },
        listLoad: function (is_reset) {      // 加载列表
            var _this = this;

            if (_this.data.loading) {    // 如果正在加载，返回
                return;
            }

            _this.setData({         // 正在加载
                loading: true
            })

            _this.listBaseRequest(function(result){
                if (!result.error){
                    _this.data.loading = false;
                    var data = result.result;

                    _this.setData({
                        total: data.total
                    });

                    if (data.current_page == 1) {
                        _this.triggerEvent('setTotal', data.total);
                    }

                    _this.setData({
                        current: data.current_page,
                        onePage: _this.data.total <= _this.data.cListConf.pageSize
                    });

                    var item = data.data;
                    if (_this.data.cListConf.addField.length || _this.data.cListConf.operBack != undefined){
                        const field = _this.data.cListConf.addField;
                        const callback =  _this.data.cListConf.operBack;
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
                        _this.setData({
                            item: item
                        });
                    } else {
                        _this.setData({
                            item: _this.data.item.concat(item)
                        });
                    }

                    var detail = {
                        item: _this.data.item
                    }

					_this.triggerEvent('requestFinish', detail);

                    if (_this.data.name != '') {
                        Util.setData({
                            key: _this.data.name,
                            data: _this.data.item
                        });
                    }

                    if (data.current_page >= data.last_page) {
                        if (data.current_page == 1 && item.length <= 0) {
                            _this.noData();
                        } else {
                            _this.noMore();
                        }
                    } else {
                        _this.setData({      // 开启分页，加载更多
                            pullUp: true,
                            loadStaus: { loading: true }
                        });
                    }
                }
            })
        },
        listBaseRequest: function (cb) {      // ajax 请求
            var _this = this;

            var queryParams = Util.extend(_this.data.queryParams, _this.data.cListConf['searchParams']);        // 浅拷贝导致的不需要接受返回值
            _this.setData({
                'queryParams': queryParams
            });

            if (_this.data.showLoading && _this.data.queryParams.page == 1) {
                Util.loading("正在加载...");
            }
            Util.ajax({
                url: _this.data.cListConf['url'],
                data : _this.data.queryParams,
                method:'get',
                success: function (result){
                    if (cb != undefined) {
                        if (_this.data.showLoading) {
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
        listNextPage: function(page){         // 上下页
            var _this = this;

            // _this.queryParams['page'] = page;
            _this.setData({
                'queryParams.page': page
            });
            _this.listLoad();
        },
        listReset () {
            console.log('listReset');
            this.setData({
                'queryParams.page': 1,
                'pullUp': true,
                'loadStaus': { loading: true }
            });

            this.listLoad();
        },
        noData () {
            this.setData({
                pullUp: false,
                loadStaus: { nodata: true, nodata_str: '还没有数据' }
            });
        },
        noMore () {
            this.setData({
                pullUp: false,
                loadStaus: { nomore: true }
            });
        },
        listSearch: function(){         // 搜索
            var _this = this;

            _this.listReset();
            _this.listLoad();
        },
        // keywordSearch: function(keyword){
        //     var _this = this;
        //     var key = _this.searchKey != undefined ? _this.searchKey : 'keyword';
        //     _this.cListConf.searchParams[key] = keyword;
        //     _this.listSearch();
        // },
        handStart() {
            this.listInit();
        },
        nextStart() {     // 滚动加载下一页
            var _this = this;
            if (!_this.data.noMore) {
                if (_this.data.pullUp) {
                    var nextPage = (_this.data.current) + 1;
                    _this.listNextPage(nextPage);
                }
            }
        },
    },
    created() {  // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
    },
    attached() { // 组件生命周期函数，在组件实例进入页面节点树时执行
        var _this = this;

        if (_this.data.name != '') {    // 如果需要缓存，拿到缓存数据，绑定到页面
            Util.getData({
                key: _this.data.name,
                success: function (data) {
                    var detail = {
                        item: data
                    }

                    _this.triggerEvent('requestFinish', detail);
                }
            });
        }

        if (!_this.data.isHandStart) {
            _this.listInit();
        }
    },
    ready() {    // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
    }
})
