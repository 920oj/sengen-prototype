const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;
const Declaration = database.Declaration;

//新規宣言作成
app.post('/declarations', function(req, res, next) {
    let declarationTitle = req.body.declarationTitle,
        hasp = req.body.hasp,
        // 仮置き storeの値取得方法を確認してから修正
        // declarer = this.$store.state.user._id,
        tag = req.body.tag;

    let newDeclaration = new Declaration({
        index: User.find({}).count() - 1,
        name: declarationTitle,
        hasp: hasp,
        declarer: {},
        supporter: [],
        tag: tag
    });

    newDeclaration.save(function(err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

//宣言詳細取得
app.get('/declarations/.+', function(req, res, next) {
    Declaration.findOne({ _id: '宣言の_id'}, function(err, result) {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

//宣言編集
app.put('/declarations/.+', function(req, res, next) {
    let declarationTitle = req.body.declarationTitle,
        hasp = req.body.hasp,
        // 仮置き storeの値取得方法を確認してから修正
        // declarer = this.$store.state.user._id,
        tag = req.body.tag;

    let updateDeclaration = new Declaration({
        index: User.find({}).count() - 1,
        name: declarationTitle,
        hasp: hasp,
        declarer: {},
        supporter: [],
        tag: tag
    });

    Declaration.update({ _id: '宣言の_id' }, updateDeclaration, {upsert: true}, function(err) {
            if(err) {
                console.log(err);
            }
            res.redirect('/');
        }
    );
});

//応援メッセージ取得
app.post('/declarations/.+/support/message', function(req, res, next) {
    Declaration.findOne({ _id: this.$store.state.user._id})
        .populate('supporters')
        .exec( function(err, result) {
            if(err) {
                console.log(err);
            }
            res.send(result.supporters);
        });
});

//応援ボタン押下
app.post('/declarations/.+/support', function(req, res, next) {

});

//サンプルデータ取得用
app.get('/test', function(req, res, next) {
    let declarationTitle = 'サンプルプロジェクト',
        hasp = 1000,
        declarer = 'コットン',
        tag = 'nuxt'

    let newDeclaration = new Declaration({
        index: User.find({}).count() - 1,
        name: declarationTitle,
        hasp: hasp,
        declarer: declarer,
        supporter: [],
        tag: tag
    });

    newDeclaration.save(function(err) {
        if(err) {
            console.log(err);
        }
        res.send();
    });
})

module.exports = {
    path: "/api/",
    handler: app
};