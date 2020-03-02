const express = require('express');
const app = express();
const database = require('./database.js');

const User = database.user;

app.get('/', function(req, res, next) {
    console.log('database.str : ' + database.str);
    res.end('疎通確認');
});

module.exports = {
    path: "/api/",
    handler: app
};