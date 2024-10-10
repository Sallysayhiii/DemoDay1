const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const settingCategory = new Schema({
    id:{type: ObjectId},
    name:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.models.settingCategory || mongoose.model('category_lab3', settingCategory);