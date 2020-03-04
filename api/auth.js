const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

//新規登録
router.post('/users', function(req, res, next) {
    // const parse = querystring.parse

    console.log(req.body.mail)
    console.log(req.body.username)
    console.log(req.body.uid)

    // let newName = req.body.username,
        // localstorageからemail,uidを取得
    //     newMail = req.body.email,
    //     newUid = req.body.uid;
    // console.log(newName)
    // let newUser = new User({
    //     uid: newUid,
    //     name: newName,
    //     mail: newMail,
    //     point: 0,
    //     declarations: [],
    //     supports: []
    // });

    // newUser.save(function(err) {
    //     if(err) {
    //         console.log(err);
    //     }
    // });
    res.send();
});


//以下のコードはnuxt側のmountedに移行


//ログイン
// router.post('/users/.+/login', function(req, res, next) {

// });

//ログアウト
router.post('/logout/.+/logout', function(req, res, next) {
    mapAction(['setUser']);
    firebase.auth().signOut()
    .then(() => {
        this.setUser(null)
    }).catch((error) => {
        console.log(error);
    });
})

router.post('/login_check', function(req, res, next) {
    setTimeout(() => {
        if (!this.isAuthenticated) {
            // ログインしていなかったら飛ぶページを設定
            this.$router.push('/login')
        } else {
            this.loaded = true
            console.log('OK')
        }
    }, 0)
});

module.exports = router