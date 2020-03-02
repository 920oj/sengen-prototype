const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.user;

//トップ
app.get('/declarations', function(req, res, next) {
    res.end('疎通確認');
});

//検索
app.post('/search/.+', function(req, res, next) {

});

//カテゴリー
app.post('/category/.+', function(req, res, next) {

})

module.exports = {
    path: "/api/",
    handler: app
};