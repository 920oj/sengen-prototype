const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;

//ポイント購入
router.post('/point/purchase/:price', function(req, res, next) {
    
})

//ポイント交換
router.post('/point/exchange/:giftcard', function(req, res, next) {

})

module.exports = router