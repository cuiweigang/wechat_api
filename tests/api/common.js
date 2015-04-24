var common = require("../../lib/api_common");


//common.AccessToken.get(function (err, body) {
//});

common.accessToken.get(function (result) {
    console.log(result);
});


common.Ips(function (result) {
    console.log(result);
});