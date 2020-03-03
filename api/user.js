const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

//ポイント確認
app.get('users/.+/check', function(req, res, next) {
    
})

//自分の宣言一覧確認
app.get('users/.+/declarations', function(req, res, next) {

})

//自分の応援している一覧確認
app.get('users/.+/user', function(req, res, next) {

})

module.exports = {
    path: "/api/",
    handler: app
};