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
                objFirst[s] = util.extend(objFirst[s], objSecond[s], mergeArray);
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


const setData = (name, value, cb) => {
    // LocalForage.setItem(name, value, function(value){
    //     if (typeof cb == "function") {
    //         cb(value)
    //     }
    // });
}
const getData = (name, cb) => {
    // LocalForage.getItem(name, function (err, value) {
    //     if (err == null) {
    //         if (typeof cb == "function") {
    //             cb(value)
    //         }
    //     } else {
    //         alert('data_err');
    //     }
    // });
}
util.removeData = (name, cb) => {
    // LocalForage.removeItem(name, function () {
    //     if (typeof cb == "function") {
    //         cb(value)
    //     }
    // });
}


const ajax = options => {
    options.method = options.method != undefined ? options.method.toUpperCase() : 'GET';

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

            }
        },
        fail: function (res) {
            if (error != undefined) {
                error(res);
            } else {

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
    ajax: ajax,
    extend: extend
}
