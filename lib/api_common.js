var log = require("./log");
var config = require("config");
var request = require("./request");
var fs = require("fs");
var async = require("async");

var accessTokenFileName = "access_token.txt";

var common = function () {
};

common.accessToken = {
    /**
     *
     * @param callback
     */
    get: function (callback) {
        async.waterfall([
            function (cb) {
                getLocalAccessToken(function (obj) {
                    cb(null, obj);
                });
            },
            function (obj, cb) {
                if (isValid(obj)) {
                    cb(null, obj);
                }
                else {
                    console.log("http");
                    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + config.wechat.appId + "&secret=" + config.wechat.secret;
                    request.get(url, function (err, body) {
                        var obj = JSON.parse(body);
                        save_AccessToken(obj);
                        cb(null, obj);
                    });
                }
            }
        ], function (err, result) {

            callback(result.access_token);
        });
    }
};

var save_AccessToken = function (obj) {

    obj.expireTime = (new Date().getTime()) + obj.expires_in * 1000;
    console.log("save_accessToken", obj);
    fs.writeFile(accessTokenFileName, JSON.stringify(obj));
};

/**
 * 验证access的有效性
 * @param obj
 */
var isValid = function (obj) {

    var result = obj.access_token && (new Date().getTime()) < obj.expireTime;
    return result;
};

/**
 * 获取本地access_token
 * @param callback
 */
var getLocalAccessToken = function (callback) {
    fs.readFile(accessTokenFileName, function (err, body) {
        body = body || "{}";
        var obj = JSON.parse(body);

        callback(obj);
    });
};


/**
 * ips列表
 * @param callback
 * @constructor
 */
common.Ips = function (callback) {

    async.waterfall([function (cb) {

        common.accessToken.get(function (access_token) {

            cb(null, access_token);
        });

    }, function (val, cb) {
        var url = "https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=" + val;

        request.get(url, function (err, body) {

            cb(null, body);
        });

    }], function (err, result) {
        callback(result);
    });
};

module.exports = common;