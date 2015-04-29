var common = require("../../lib/api_common");

/**
 * 验证
 */
common.signature({},function ( result) {
    console.log(result);
});

/**
 * 获取accessToken
 */
common.accessToken.get(function (result) {
    console.log(result);
});

/**
 * 获取服务器ip列表
 */
common.Ips(function (result) {
    console.log(result);
});

