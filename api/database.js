const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    _id: Number,
    name: String,
    mail: String,
    point: Number,
    declarations: [{ type: Number, ref: 'Declaration' }],
    supports: [{ type: Number, ref: 'Declaration' }]
});

let Declaration = new Schema({
    _id: Number,
    name: String,
    hasp: Number,
    declarer: { type: Schema.Types.ObjectId, ref: 'User' },
    supporters: [{
        detail: { type: Number, ref: 'User' },
        comment: String
    }],
    tag: Number
});

let Category = new Schema({
    _id: Number,
    name: String,
    declarations: [{ type: Number, ref: 'Declaration' }]
});

mongoose.connect('mongodb://127.0.0.1/sengen');

exports.User = mongoose.model('User', User);
exports.Declaration = mongoose.model('Declaration', Declaration);
exports.Category = mongoose.model('Category', Category);