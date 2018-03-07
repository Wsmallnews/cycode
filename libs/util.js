const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// my methods
/**
 * extend ，多层级合并，后者覆盖前者
 * objFirst: 第一个对象，objSecond: 第二个对象，mergeArray: 碰到数组对象是否合并，默认不合并
 * 只识别三种类型，对象，数组对象，其他
 */
const extend = (objFirst, objSecond, mergeArray) => {
    if (typeof objSecond === 'object' && !isNaN(objSecond.length)) {    // 如果 第二个对象 是数组对象
        if (mergeArray == undefined || mergeArray == null) {
            objFirst = objSecond;   // 直接覆盖
        }else {
            objFirst = objFirst.concat(objSecond);
        }
    }else {
        for (var s in objSecond) {
            if (objFirst[s] == undefined || (typeof objFirst[s] != 'object' && typeof objSecond[s] === 'object')) { // 如果 objFrist 不存在, 或者类型不一致 ，直接赋值,
                objFirst[s] = objSecond[s];
            } else if (typeof objSecond[s] === 'object' && !isNaN(objSecond[s].length)){    // 如果 是数组对象，直接赋值,默认前面也是数组对象
                if (mergeArray == undefined || mergeArray == null) {      // 不合并数组
                    objFirst[s] = objSecond[s];     // 默认直接赋值
                }else {
                    objFirst[s] = objFirst[s].concat(objSecond[s]);     // 合并
                }
            } else if (typeof objSecond[s] === 'object') {          // 如果是对象
                objFirst[s] = extend(objFirst[s], objSecond[s], mergeArray);
            } else {                        // 直接赋值
                objFirst[s] = objSecond[s];
            }
        }
    }

    return objFirst;
}

const isHttp = str => {
    var reg = new RegExp("/^(http:\/\/|https:\/\/)/");

    return reg.test(str);
}


/*
toast
 */
const toast = options => {
    var default_options = {
        title: "",
        icon: "none",       // "success", "loading", "none"
        image: "",      // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 3000, // 3秒
        mask: false,
        success: undefined,
        fail: undefined,
        complete: undefined
    }

    options = extend(default_options, options);
    wx.showToast(options);
}

const hideToast = () => {
    wx.hideToast();
}

const loading = options => {
    var default_options = {
        title: "",
        mask: false,
        success: undefined,
        fail: undefined,
        complete: undefined
    }

    options = extend(default_options, options);
    wx.showLoading(options);
}

const hideLoading = () => {
    wx.hideLoading();
}

/*
options 设置参数
sync 同步 默认异步
success res: {errMsg: "setStorage:ok"}
 */
const setData = (options, sync) => {
    sync == undefined ? false : true;

    if (options == undefined) {
        toast({title: "数据存储失败"});
        return false;
    }

    if (sync) {
        try {
            wx.setStorageSync(options.key, options.data);
        } catch (e) {
            toast({title: "数据存储失败"});
        }
    } else {
        wx.setStorage(options);
    }
}

const getData = (options, sync) => {
    sync == undefined ? false : true;

    if (options == undefined) {
        toast({title: "数据获取失败"});
        return false;
    }

    if (sync) {
        try {
            var value = wx.getStorageSync(options.key)
            if (value) {
                return value;
            }
        } catch (e) {
            toast({title: "数据获取失败"});
        }
    } else {        // res: {errMsg: "getStorage:ok", data: {}}
        var success = options.success;
        options.success = function (res) {
            if (res.errMsg == 'getStorage:ok') {    // 数据获取成功
                success(res.data);
            } else {
                toast({title: res.errMsg});
            }
        }
        wx.getStorage(options);
    }
}
const removeData = (options, sync) => {
    sync == undefined ? false : true;

    if (options == undefined) {
        toast({title: "数据移除失败"});
        return false;
    }

    if (sync) {
        try {
            wx.removeStorageSync(options.key)
        } catch (e) {
            toast({title: "数据移除失败"});
        }
    } else {
        wx.removeStorage(options);
    }
}
const clearData = (sync) => {
    sync == undefined ? false : true;

    if (sync) {
        try {
            wx.clearStorageSync()
        } catch (e) {
            toast({title: "数据清除失败"});
        }
    } else {
        wx.clearStorage();
    }
}


const baseUrl = "https://cyapi.smcdn.top";

const ajax = options => {
    options.method = options.method != undefined ? options.method.toUpperCase() : 'GET';

    if (options.url == undefined) {
        return false;
    }
    options.url = baseUrl + options.url;

    const success = options.success;
    options.success != undefined ? delete options.success : '';
    const error = options.error;
    options.error != undefined ? delete options.error : '';

    var default_options = {
        url:'',
        method:'GET',
        header: {'X-Requested-With': 'XMLHttpRequest'},
        success: function (res) {
            if (success != undefined) {
                success(res.data, res);     // 处理返回结果
            } else {
                toast({title: "处理成功"});
            }
        },
        fail: function (res) {
            if (error != undefined) {
                error(res);
            } else {
                toast({title: "处理失败"});
            }
        }
    }

    options = extend(default_options, options);

    if (options.data != undefined) {
        options.data.timeStamp = (new Date()).getTime();
    } else {
        options.data = {timeStamp: (new Date()).getTime()};
    }

    wx.request(options);
}



module.exports = {
    formatTime: formatTime,
    baseUrl: baseUrl,
    ajax: ajax,
    extend: extend,
    toast: toast,
    hideToast: hideToast,
    loading: loading,
    hideLoading: hideLoading,
    setData: setData,
    getData: getData,
    removeData: removeData,
    clearData: clearData
}
