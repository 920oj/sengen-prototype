const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

//新規登録
router.post('/users', function(req, res, next) {
    User.find({}, function(err, result) {
        let userLength = Object.keys(result).length,
            newName = req.body.username,
            newMail = req.body.mail;

        let newUser = new User({
            uid: userLength,
            name: newName,
            mail: newMail,
            point: 0,
            declarations: [],
            supports: []
        });
        newUser.save(function(err) {
            if(err) {
                console.log(err);
            }
            res.send();
        });
    });
});

//以下のコードはnuxt側のmountedに移行

//ログアウト
// router.post('/logout/.+/logout', function(req, res, next) {
//     mapAction(['setUser']);
//     firebase.auth().signOut()
//     .then(() => {
//         this.setUser(null)
//     }).catch((error) => {
//         console.log(error);
//     });
// })

module.exports = router