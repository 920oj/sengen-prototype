const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const database = require('./database.js');

app.use(bodyParser.urlencoded({extended: false}));

const User = database.User;
const Declaration = database.Declaration;

let declaration = require('./declaration');
let auth = require('./auth');
let sample = require('./sample');
let user = require('./user');
let point = require('./point');
app.use('/', declaration);
app.use('/', auth);
app.use('/', sample);
app.use('/', user);
app.use('/', point);

//検索
app.post('/search/:keyword', function(req, res, next) {
    let keyword = req.params.keyword;
    
    Declaration.find({name: new RegExp(`${keyword}`)}, function(err, result) {
        let declarationLength = Object.keys(result).length;
        postDeclarations(result, declarationLength);
        
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

        // if(declarationLength < 100) {
        //     Declaration.find({ index: { $gte: 0, $lte: declarationLength}})
        //         .populate('declarer')
        //         .exec( function(err, result) {
        //             if(err) {
        //                 console.log(err);
        //             }
        //         });
        //     } 
    })

            //条件が重複した回数をカウント（DISTINCT）
            // let resultLength = Object.keys(result).length;
            // while(resultLength > 0) {
            //     resultLegth--;
            // }

    // Declaration.find({ name: `/${keyword}/`}, function(err, result) {
    //     console.log(result);
    // })
});

//カテゴリーページ
app.post('/category/:category', function(req, res, next) {
    let category = req.params.category;
    category.findOne({ uid: category }, function(err, result) {
        res.send(result);
    });
});

module.exports = {
    path: "/api/",
    handler: app
};