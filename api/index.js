const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

let declaration = require('./declaration')
app.use('/', declaration);
let auth = require('./auth')
app.use('/', auth);

//トップ
app.get('/declarations', function(req, res, next) {
    let declarationCurrentLength = Declaration.find({}).count();
    Declaration.find({ _id: { $gte: declarationCurrentLength - 10, $lte: declarationCurrentLength}}, function(err, data) {
        res.send(result);
    })
});

//検索
app.post('/search/.+', function(req, res, next) {

});

//カテゴリー
app.post('/category/.+', function(req, res, next) {

});

module.exports = {
    path: "/api/",
    handler: app
};