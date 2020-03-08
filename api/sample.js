const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;
const Declaration = database.Declaration;
const Category = database.Category;

let dataCheck = (collection) => {
    collection.find({}, function(err, result) {
        console.log('全要素 : ' + result);
        console.log('要素数 : ' + Object.keys(result).length);
    });
};

//サンプルデータ取得用
router.get('/testdeclaration', function(req, res, next) {
    let userName = 'コットン',
        mail = 'sample@gmail.com';

    let newUser = new User({
        uid: 0,
        name: userName,
        mail: mail,
        point: 0,
        declarations: [],
        supports: []
    });

    newUser.save(function(err) {
        dataCheck(User);
    })

    Declaration.find({}, function(err, result) {
        let declarationLength = Object.keys(result).length,
        declarationTitle = 'サンプルプロジェクト',
        hasp = 1000;
        
        let newDeclaration = new Declaration({
            index: declarationLength,
            name: declarationTitle,
            tag: 0,
            thumbnail: '/_nuxt/client/assets/img/png/ogp.png',
            hasp: hasp,
            declarer: newUser._id,
            supporters: [],
            deadline: Date.now(),
        });
        
        newDeclaration.save(function(err) {
            if(err) {
                console.log(err);
            }
            dataCheck(Declaration);
            res.send();
        });
    });
})

router.get('/testcategory', function(req, res, next) {
    // クソコード注意！
    addCategory(0, 'アート');
    addCategory(1, 'プロダクト');
    addCategory(2, 'テクノロジー');
    addCategory(3, '音楽');
    addCategory(4, 'ゲーム');
    addCategory(5, '書籍');
    addCategory(6, '映像');
    addCategory(7, 'スポーツ');
    addCategory(8, 'ビジネス');
    addCategory(9, 'ファッション');
    addCategory(10, 'アニメ');
    addCategory(11, '飲食');
    addCategory(12, 'ヘルスケア');
    addCategory(13, 'その他')
    
    res.send();

    function addCategory(c_uid, c_name) {
        let newCategory = new Category({
            uid: c_uid,
            name: c_name,
            declarations: []
        });

        newCategory.save(function(err) {
            if(err) {
                console.log(err);
            }
            dataCheck(Category);
        })
    }

});

router.get('/token', function(req, res, next) {
    
})

module.exports = router