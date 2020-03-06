const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;
const Declaration = database.Declaration;
const Category = database.Category;

//AWSのapikeyを入力
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    Bucket: '自分のバケット'
});

//multerおよびmulterS3の設定
const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: '自分のバケット',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    }),
    limits: { fileSize: 2000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
//   }).single('フォーム上のnameのパラメータ');
  }).single('file');

//ファイルチェック
function checkFileType (file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

let dataCheck = (collection) => {
    collection.find({}, function(err, result) {
        console.log('全要素 : ' + result);
        console.log('要素数 : ' + Object.keys(result).length);
    });
};

//新規宣言作成
router.post('/declarations', function(req, res, next) {
    
    Declaration.find({}, function(err, result) {
        let declarationLength = Object.keys(result).length,
            declarationTitle = req.body.title,
            tag = req.body.category,
            overview = req.body.overview,
            hasp = req.body.hasp,
            loginMail = req.body.mail,
            deadline = req.body.deadline;

        Category.findOne({ uid: tag }, function(err, result) {
            tag = result.name
            
            User.findOne({ mail: loginMail }, function(err, result) {
                if(err) {
                    console.log(err);
                }
                console.log(result)
                createDeclaration(result);
                res.send();
            });
        });
            
        function createDeclaration(result) {
            // imgUpload(req, res, function(err) {
                // if(err) {
                //   console.log(err);
                // } else {
                //     if (req.file === undefined) {
                //         console.log('No File');
                //     } else {
                        //ここで取得したデータをデータベースに保存
                        const imageName = req.file;
                        console.log(imageName)
                        console.log('result' + result)
                        // const imageLocation = req.file.location;
                        let newDeclaration = new Declaration({
                            index: declarationLength,
                            name: declarationTitle,
                            overview: overview,
                            tag: tag,
                            // thumbnail: imageLocation,
                            thumbnail: '/_nuxt/client/assets/img/png/ogp.png',
                            hasp: hasp,
                            declarer: result._id,
                            supporter: [],
                        });
                    
                        newDeclaration.save(function(err) {
                            if(err) {
                                console.log(err);
                            }
                            dataCheck(Declaration);
                        });
                    // }
                // }
            // });
        }
    });
});

//宣言一覧取得（トップページ）
router.get('/declarations/top', function(req, res, next) {
    Declaration.find({}, function(err, result) {
        let declarationLength = Object.keys(result).length;
        
        function postDeclarations (result, declarationLength) {
            let start = 0,
            end = 10,
            countPages = 1,
            pageDatas = new Map,
            tenCountLength = declarationLength,
            sendData = [];
            
            while(tenCountLength > 10) {
                pageDatas.set(countPages, result.slice(start, end));
                start += 10;
                end += 10;
                tenCountLength -= 10;
                countPages++;
            }
            end = declarationLength;
            pageDatas.set(countPages, result.slice(start, end));
            
            while(countPages > 0) {
                let setData = pageDatas.get(countPages);
                sendData[countPages - 1] = setData
                countPages--;
            }
            res.send(sendData);
        }

        if(declarationLength < 100) {
            Declaration.find({ index: { $gte: 0, $lte: declarationLength}})
                .populate('declarer')
                .exec( function(err, result) {
                    if(err) {
                        console.log(err);
                    }
                    postDeclarations(result, declarationLength);
                });
            } else {
                Declaration.find({ index: { $gte: declarationLength - 100, $lte: declarationLength}})
                    .populate('declarer')
                    .exec( function(err, result) {
                        if(err) {
                            console.log(err);
                        }
                        postDeclarations(result, declarationLength);
                    });
        }

    });
});

//宣言詳細取得
router.post('/declarations/:declaration', function(req, res, next) {
    let declarationIndex = req.params.declaration;
    Declaration.findOne({ index: declarationIndex })
        .populate('declarer')
        .exec( function(err, result) {
            console.log(result);
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

module.exports = router