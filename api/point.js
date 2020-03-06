const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

//ポイント購入
router.post('/point/purchase/:price', function(req, res, next) {
    let purchasePrice = req.params.price,
        loginMail = req.body.mail;

    User.findOne({ mail: loginMail }, function(err, result) {
        result.point += purchasePrice;
        result.save((err) => {
            if(err) {
                console.log(err);
            }
            res.redirect('/');
        });
    });
});

//ポイント交換
router.post('/point/exchange/:giftcard/:price', function(req, res, next) {
    let exchangePrice = req.body.exchangePrice,
        loginMail = req.body.mail;
    
    User.findOne({ mail: loginMail },function(err, result) {
        result.point -= exchangePrice;
        result.save((err) => {
            if(err) {
                console.log(err);
            }
            res.redirect('/');
        });
    });
});

module.exports = router