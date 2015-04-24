var request = require("../lib/request");

/**
 * 测试get请求
 */
request.get("http://www.baidu.com", function (err, body) {
    console.log(body);
});

