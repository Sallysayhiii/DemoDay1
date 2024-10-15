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
        ref: 'category'
    }
});

module.exports = mongoose.models.settingProduct || mongoose.model('product', settingProduct);



// const mongoose = require('mongoose');
// const category = require('./category');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const product = new Schema({
//     id: { type: ObjectId }, // khóa chính
//     name: {
//         type: String, // kiểu dữ liệu
//         unique: true, // không được trùng
//         default: 'Cook' // giá trị mặc định
//     },
//     image: { type: String },
//     quantity: { type: Number},
//     price: { type: Number},
// });
// module.exports = mongoose.models.product || mongoose.model('product', product);