const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.user;
const Declaration = database.declaration;

//新規宣言作成
app.post('/declarations', function(req, res, next) {
    let declarationTitle = req.body.declarationTitle,
        hasp = req.body.hasp,
        // 仮置き storeの値取得方法を確認してから修正
        // declarer = this.$store.state.user.uid,
        tag = req.body.tag

    let newDeclaration = new Declaration({
        //仮置き 固有の番号取得方法を用意してから
        // index: '',
        name: declarationTitle,
        hasp: hasp,
        supporter: '',
        tag: tag
    });

    newDeclaration.save(function(err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    })
})

//宣言詳細取得
app.get('/declarations/.+', function(req, res, next) {

})

//宣言編集
app.put('/declarations/.+', function(req, res, next) {
    
})

//編集完了
app.put('/declarations/.+', function(req, res, next) {
    
})

//応援メッセージ取得
app.post('/declarations/.+/support/message', function(req, res, next) {
    
})

//応援ボタン押下
app.post('/declarations/.+/support', function(req, res, next) {

})


module.exports = {
    path: "/api/",
    handler: app
};