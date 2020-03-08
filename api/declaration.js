const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const User = database.User;
const Declaration = database.Declaration;
const Category = database.Category;

//AWSのapikeyを入力
const s3 = new AWS.S3({
    accessKeyId: 'AKIASDNKRNVVQ3TRADHR',
    secretAccessKey: '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',
    Bucket: 'sengen-proto'
});

//multerおよびmulterS3の設定
const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sengen-proto',
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

router.post('/upload', function(req, res, next) {
    console.log(req.body);
    imgUpload(req, res, function(err) {
        if(err) {
            console.log(err);
        } else {
            if (req.file === undefined) {
                console.log('No File');
            } else {
                res.send();
            }
        }
    })
});

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
        console.log(req.body)

        Category.findOne({ uid: tag }, function(err, result) {
            tag = result.name
            
            User.findOne({ mail: loginMail }, function(err, result) {
                if(err) {
                    console.log(err);
                }
                createDeclaration(result, declarationLength);
            });
        });
            
        function createDeclaration(result, length) {
            const imageName = req.file;
            // const imageLocation = req.file.location;
            let newDeclaration = new Declaration({
                index: declarationLength,
                name: declarationTitle,
                overview: overview,
                tag: tag,
                // thumbnail: imageLocation,
                deadline: deadline,
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

            User.findOne({ mail: result.mail}, function(err, user) {
                Declaration.findOne({ index: length }, function(err, declara) {
                    result.declarations.push(declara._id)
                    result.save(function(err) {
                        res.send();
                    })
                    console.log(result);
                })
            })
            // imgUpload(req, res, function(err) {
                // if(err) {
                //   console.log(err);
                // } else {
                //     if (req.file === undefined) {
                //         console.log('No File');
                //     } else {
                        //ここで取得したデータをデータベースに保存
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
            console.log('1' + result)
            User.findOne({ mail: req.body.mail }, function(err, user) {
                if(err) {
                    console.log(err);
                }
                console.log(JSON.stringify(user._id))
                console.log(JSON.stringify(result.declarer._id))
                if(JSON.stringify(user._id) == JSON.stringify(result.declarer._id)) {
                // if(user._id == result.declarer._id) {
                    let updateData = result.toObject();
                    updateData.declarer.uid = null;
                    updateData.declarer.mail = null;
                    updateData.declarer.point = null;
                    updateData.declarer.supports = null;
                    updateData.status = 'declarer';
                    res.send(updateData);
                    console.log(toString(user._id))
                    console.log(toString(result.declarer._id))
                    console.log('いいか？お前はdeclarerだ')
                } else {
                    User.findOne({ supports: result._id }, function(err, supportUser) {
                        let updateData = result.toObject();
                        updateData.declarer.uid = null;
                        updateData.declarer.mail = null;
                        updateData.declarer.point = null;
                        updateData.declarer.supports = null;
                        if(err) {
                            console.log(err);
                        }
                        if(supportUser) {
                            updateData.status = 'supporter';
                            console.log('いいか？お前はsupporterだ')
                        } else {
                            updateData.status = 'login'
                            updateData['status'] = 'login'
                            console.log(typeof(updateData))
                            console.log('いいか？お前はloginだ')
                        }
                        res.send(updateData);
                    });
                }
            })
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
    let receiveComment = req.body.comment,
        receiveIndex = req.params.declaration,
        receiveMail = req.body.mail;
    
        Declaration.findOne({ index: receiveIndex })
        .populate('supporters')
        .exec( function(err, declaration) {
            User.findOne({ mail: receiveMail })
            .populate('supports')
            .exec( function(err, user) {
                let newSupporter = {}
                newSupporter.detail = user._id,
                newSupporter.name = user.name,
                newSupporter.thumbnail = '/_nuxt/client/assets/img/png/ogp.png',
                newSupporter.timestamp = Date.now(),
                newSupporter.comment = receiveComment
                declaration.supporters.push(newSupporter);
                declaration.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                })
                console.log(user)
                user.supports.push(declaration._id);
                user.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                })
            })
        })
        Declaration.findOne({ index: receiveIndex }, function(err, result) {
            res.send(result);
        })
});

module.exports = router