const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.user;

app.post('/declarations', function(req, res, next) {
    
})

app.get('/declarations/:declaration', function(req, res, next) {

})

app.put('/declarations/:declaration', function(req, res, next) {
    
})

app.post('/declarations/:declaration/support/message', function(req, res, next) {
    
})

app.post('/declarations/:declaration/support', function(req, res, next) {

})


module.exports = {
    path: "/api/",
    handler: app
};