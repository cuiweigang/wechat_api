var api = require("../../lib/api");

/**
 * 测试获取assess_token信息
 */
api.common.accessToken.get(function (token) {
    console.log(token);
});