const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.user;

//ポイント購入
app.post('/point/purchase/:price', function(req, res, next) {
    
})

//ポイント交換
app.post('/point/exchange/:giftcard', function(req, res, next) {

})

module.exports = {
    path: "/api/",
    handler: app
};