const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

let declaration = require('./declaration');
let auth = require('./auth');
let sample = require('./sample');
let user = require('./user');
let point = require('./point');
app.use('/', declaration);
app.use('/', auth);
app.use('/', sample);
app.use('/', user);
app.use('/', point);

//検索
app.post('/search/:keyword', function(req, res, next) {
    let keyword = req.params.keyword;

    // Declaration.find({
    //     name: `/${keyword}/`,
    //     overview: `/${keyword}/`,
    //     detail: `/${keyword}/` },
    //     function(err, result) {
    //         //条件が重複した回数をカウント（DISTINCT）
    //         let resultLength = Object.keys(result).length;
    //         while(resultLength > 0) {
    //             resultLegth--;
    //         }
    //     }
    // );
    console.log(keyword);
    // Declaration.find({ name: `/${keyword}/`}, function(err, result) {
    //     console.log(result);
    // })
        res.send();
});

//カテゴリーページ
app.post('/category/:category', function(req, res, next) {
    let category = req.params.category;
    category.findOne({ uid: category }, function(err, result) {
        res.send(result);
    });
});

module.exports = {
    path: "/api/",
    handler: app
};