var request = require("request");


var httpRequest = {};

/**
 * 发送get请求
 * @param url url地址
 * @param callback(err,body) err:错误信息 body:消息体
 */
httpRequest.get = function (url, callback) {
    request.get(url, function (err, res, body) {
        return callback(err, body);
    });
};


/**
 * 发送post请求
 * @param url url地址
 * @param data 提交数据
 * @param callback(err,body) err:错误信息 body:消息体
 */
httpRequest.post = function (url, data, callback) {
    request.post({url: url, formData: data}, function (err, res, body) {
        return callback(err, body);
    });
};

module.exports = httpRequest;