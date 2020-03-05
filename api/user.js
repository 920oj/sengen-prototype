const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

app.use(bodyParser.urlencoded({extended: false}));

//AWSのapikeyを入力
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    Bucket: '自分のバケット'
});

//multerおよびmulterS3の設定
const profileImgUpload = multer({
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
  }).single('フォーム上のnameのパラメータ');

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

const User = database.User;

//ポイント確認
app.get('users/:user/points', function(req, res, next) {
    
})

//自分の宣言一覧確認
app.get('users/:user/declarations', function(req, res, next) {

})

//自分の応援している一覧確認
app.get('users/:user/supports', function(req, res, next) {

})

module.exports = router