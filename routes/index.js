/*
 * GET home page.
 */

var api = require("../lib/api");
var request = require("request");

exports.index = function (req, res) {

    res.render('index', {title: 'Express'});
};