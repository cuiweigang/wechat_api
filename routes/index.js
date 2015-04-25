var express = require('express');
var router = express.Router();
var api = require("../lib/api");


router.get("/", function (req, res) {
    res.send("express");
});

/* GET home page. */
router.get('/weChat', function (req, res) {
    res.render('index', {title: 'Express'});
});

/**
 * 接受微信消息
 */
router.post("/weChat", function (req, res) {
    api.message.receive(req, function (obj) {
        switch (obj.MsgType) {
            case "text": //文本
                break;
            case "image": //图片
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

        res.send(obj.MsgType);
    })
});


module.exports = router;
