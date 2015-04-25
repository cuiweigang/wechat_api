var log = require("./log");
var config = require("config");
var request = require("./request");
var fs = require("fs");
var async = require("async");

var common = require("./api_common");
var xml2json = require("xml2json");

var message = {};


message.receive = function (req, callback) {

    req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });

    var options = {
        object: true,
        reversible: false,
        coerce: true,
        sanitize: true,
        trim: true,
        arrayNotation: false
    };

    req.on('end', function () {
        json = xml2json.toJson(req.rawBody, options);
        return callback(json.xml);
    });
};

// 文本消息模板
var textTemplate = "<xml>" +
    "<ToUserName><![CDATA[<%- ToUserName %>]]></ToUserName>" +
    "<FromUserName><![CDATA[<%- FromUserName%>]]></FromUserName>" +
    "<CreateTime><% -CreateTime%></CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[<%- Content%>]]></Content>" +
    "</xml> ";


// 图片消息模板
var imageTemplate = "<xml>" +
    " <ToUserName><![CDATA[ToUserName]]></ToUserName>" +
    "<FromUserName><![CDATA[FromUserName]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[image]]></MsgType>" +
    "<PicUrl><![CDATA[this is a url]]></PicUrl>" +
    "<MediaId><![CDATA[media_id]]></MediaId>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

// 语音消息模板
var voiceTemplate = "<xml>" +
    "<ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[fromUser]]></FromUserName>" +
    "<CreateTime>1357290913</CreateTime>" +
    "<MsgType><![CDATA[voice]]></MsgType>" +
    "<MediaId><![CDATA[media_id]]></MediaId>" +
    "<Format><![CDATA[Format]]></Format>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";

// 链接消息模板
var linkTemplate = "<xml>" +
    "<ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[fromUser]]></FromUserName>" +
    "<CreateTime>1351776360</CreateTime>" +
    "<MsgType><![CDATA[link]]></MsgType>" +
    "<Title><![CDATA[公众平台官网链接]]></Title>" +
    "<Description><![CDATA[公众平台官网链接]]></Description>" +
    "<Url><![CDATA[url]]></Url>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml> ";

// 编译后的模板
var textCompileTemplate = ejs.compile(textTemplate);
var imageCompileTemplate = ejs.compile(imageTemplate);
var voiceCompileTemplate = ejs.compile(voiceTemplate);
var linkCompileTemplate = ejs.compile(linkTemplate);

/**
 * 文本消息
 * @param obj
 *
 * obj
 * {}
 */
message.replay.text = function (obj) {

    var obj = {
        "ToUserName": "",
        "FromUserName": "",
        "CreateTime": "",
        "Content": ""
    }
};

module.exports = message;