var log = require("./log");
var config = require("config");
var request = require("./request");
var fs = require("fs");
var async = require("async");
var crypto= require("crypto");

var accessTokenFileName = "access_token.txt";

var common = function () {
};

/**
 * accessToken相关信息
 * @type {{get: Function}}
 */
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

/**
 * 验签操作
 * @param query 提交参数
 * @param callback 回调函数
 * @returns   echostr 字符
 */
common.signature=function(query,callback)
{
    // 获取参数
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;
    var echostr = query.echostr;

    // 数组排序
    var arr = [nonce, timestamp, config.wechat.token].sort();

    var sha1 = crypto.createHash('sha1');
    sha1.update(arr.join(''));
    var sign = sha1.digest("hex");

    log.info("echostr:%s \r\n signatur:%s \r\n timestamp:%s \r\n nonce:%s \r\n echostr:%s \r\n sha1:%s \r\n token:%s", echostr, signature, timestamp, nonce, echostr, sign, config.wechat.token);

    if (sign != signature) {
        echostr = "error";
    }

    return callback(echostr);
};

/**
 * 获取微信服务器ip列表
 *
 * @param callback 回掉函数
 *
 * callback:
 * - `result`, 调用正常时得到的对象
 *
 * result:
 * {
 *	"ip_list":["127.0.0.1","127.0.0.1"]
 * }
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


/**
 * 存储access_token到文件中
 * @param obj
 */
var save_AccessToken = function (obj) {

    obj.expireTime = (new Date().getTime()) + obj.expires_in * 1000;
    console.log("save_accessToken", obj);
    fs.writeFile(accessTokenFileName, JSON.stringify(obj));
};

/**
 *
 * @param obj access_token对象 {"access_token":"","expires_in":7200,"expireTime":1429898273282}
 * @returns bool access_token是否有效 true:有效 false:无效
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

module.exports = common;