const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    uid: Number,
    name: String,
    mail: String,
    point: Number,
    thumbnail: String,
    declarations: [{ type: String, ref: 'Declaration' }],
    supports: [{ type: String, ref: 'Declaration' }]
});

let Declaration = new Schema({
    index: Number,
    name: String,
    tag: String,
    thumbnail: String,
    overview: String,
    deadline: String,
    detail: String,
    declarer: { type: String, ref: 'User' },
    supporters: [{
        detail: { type: String, ref: 'User' },
        name: String,
        thumbnail: String,
        timestamp: String,
        comment: String
    }],
    hasp: Number,
    report: String
});

let Category = new Schema({
    uid: Number,
    name: String,
    declarations: [{ type: Number, ref: 'Declaration' }]
});

mongoose.connect('mongodb://127.0.0.1/sengen');

exports.User = mongoose.model('User', User);
exports.Declaration = mongoose.model('Declaration', Declaration);
exports.Category = mongoose.model('Category', Category);