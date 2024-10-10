const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const settingProduct = new Schema({
    id: {type: ObjectId},
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    quantity:{
        type: Number
    },
    category:{
        type: ObjectId,
        ref: 'category_lab3'
    }
});

module.exports = mongoose.models.settingProduct || mongoose.model('product_lab3', settingProduct);