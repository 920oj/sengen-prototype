const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.user;

//新規登録
app.post('users', function(req, res, next) {

});

//ログイン
app.post('users/:user/login', function(req, res, next) {
    mapState(['user']);

    mapGetters([isAuthenticated]);
    firebase.auth().onAuthStateChanged((user) => {
        this.setUser(user)
    });

    mapAction(['setUser']);
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user => {
        this.$router.push("#")
    }).catch((error) => {
        console.log(error);
    });
});

//ログアウト
app.post('logout/:user/logout', function(req, res, next) {
    mapAction(['setUser']);
    firebase.auth().signOut()
    .then(() => {
        this.setUser(null)
    }).catch((error) => {
        console.log(error);
    });
})

app.post('login_check', function(req, res, next) {

});

module.exports = {
    path: "/api/",
    handler: app
};