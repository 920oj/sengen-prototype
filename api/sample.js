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
        mail = 'chinoknct@gmail.com';

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
    let newCategory = new Category({
        uid: 2,
        name: 'テクノロジー',
        declarations: []
    });

    newCategory.save(function(err) {
        if(err) {
            console.log(err);
        }
        dataCheck(Category);
        res.send();
    })
});

module.exports = router