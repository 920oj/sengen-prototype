const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    uid: String,
    name: String,
    mail: String,
    point: Number,
    declarations: {
        index: Number
    },
    supports: {
        uid: Number
    },
});

let Declaration = new Schema({
    index: Number,
    name: String,
    hasp: Number,
    declarer: {
        uid: Number
    },
    supprters: {
        uid: Number
    },
    tags: {
        tag: Number
    }
});

let Category = new Schema({
    tag: Number,
    name: String,
    declarations: {
        index: Number
    }
});

mongoose.connect('mongodb://127.0.0.1/sengen');

exports.user = mongoose.model('user', User);
exports.declaration = mongoose.model('declaration', Declaration);
exports.category = mongoose.model('category', Category);