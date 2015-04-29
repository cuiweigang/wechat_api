var express = require('express');
var router = express.Router();
var api = require("../lib/api");

router.get("/", function (req, res) {
    res.send("express");
});


/* GET home page. */
router.get('/weChat', function (req, res) {
    api.common.signature(req.query, function (result) {
        res.send(result);
    });
});

/**
 * 接受微信消息
 */
router.post("/weChat", function (req, res) {
    var message;
    api.message.receive(req, function (obj) {
        console.log(obj);
        switch (obj.MsgType) {
            case "text": //文本
                message = api.message.replay.text(obj, "你好,主人不在,回来后,会第一时间回复您");
                break;
            case "image": //图片
                message = api.message.replay.text(obj, "你好,主人不在,回来后,会第一时间回复您");
                break;
            case "voice": //语音
                break;
            case "video": //视频
                break;
            case "shortvideo": //短视频
                break;
            case "location": //地理位置
                break;
            case "link": //连接消息
                break;
        }
        message = api.message.replay.text(obj, "你好,主人不在,回来后,会第一时间回复您");
        res.send(message);
    })
});


module.exports = router;
