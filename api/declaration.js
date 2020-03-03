const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;
const Declaration = database.Declaration;

let dataCheck = (collection) => {
    collection.find({}, function(err, result) {
        console.log('全要素 : ' + result);
        console.log('要素数 : ' + Object.keys(result).length);
    });
};

//新規宣言作成
router.post('/declarations', function(req, res, next) {
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
router.get('/declarations/:declaration', function(req, res, next) {
    Declaration.findOne({ _id: '宣言の_id'}, function(err, result) {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

//宣言編集
router.put('/declarations/:declaration', function(req, res, next) {
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
router.post('/declarations/:declaration/support/message', function(req, res, next) {
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
router.post('/declarations/:declaration/support', function(req, res, next) {

});

//サンプルデータ取得用
router.get('/test', function(req, res, next) {
    let userName = 'コットン',
        mail = 'chinoknct@gmail.com';

    let newUser = new User({
        // _id: User.find({}).count() - 1,
        uid: 0,
        name: userName,
        mail: mail,
        point: 0,
        declarations: [],
        supports: []
    });

    dataCheck(User);
    
    newUser.save(function(err) {})
    Declaration.find({}, function(err, result) {
        let declarationLength = Object.keys(result).length,
        declarationTitle = 'サンプルプロジェクト',
        hasp = 1000;
        
        let newDeclaration = new Declaration({
            uid: declarationLength,
            name: declarationTitle,
            hasp: hasp,
            declarer: newUser._id,
            supporter: [],
            tag: 0
        });
        
        newDeclaration.save(function(err) {
            if(err) {
                console.log(err);
            }
            dataCheck(Declaration);
            res.send('OK');
        });
    });
})

module.exports = router