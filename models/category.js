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

module.exports = mongoose.models.settingCategory || mongoose.model('category', settingCategory);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const category = new Schema({
//     id:{type: ObjectId},
//     name:{
//         type: String,
//         require: true,
//     },
//     image:{
//         type: String,
//         require: true,
//     }
// });

// // const category = new Schema({
// //     id: { type: ObjectId }, // khóa chính
// //     name: {
// //         type: String, // kiểu dữ liệu
// //         unique: true, // không được trùng
// //         default: 'Cook' // giá trị mặc định
// //     },
// //     image: { type: String }
// // });
// module.exports = mongoose.models.category || mongoose.model('category', category);





// // const category = new Schema({
// //     id: { type: ObjectId }, // khóa chính
// //     name: {
// //         type: String, // kiểu dữ liệu
// //         required: true, // bắt buộc phải có //lưu dữ liệu
// //         unique: true, // không được trùng
// //         trim: true, // bỏ khoảng trắng 2 đầu
// //         minlength: 3, // độ dài tối thiểu
// //         maxlength: 50, // độ dài tối đa
// //         default: 'No name' // giá trị mặc định
// //     },
// //     image: { type: String }
// // });
// // module.exports = mongoose.models.category || mongoose.model('category', category);