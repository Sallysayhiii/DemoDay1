const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    id:{type: ObjectId},
    username:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    fullname:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.models.user || mongoose.model('user', user);