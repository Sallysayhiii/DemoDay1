var express = require('express');
var router = express.Router();

// gọi model
var model_category = require('../../models/Lab3_models/category_lab3');
// Thêm loại sản phẩm
router.post('/add', async (req, res) => {
    try{
        const {name, image} = req.body;
        const objectCategory = {name, image};
        await model_category.create(objectCategory);

        res.status(200).json({status: true, message: 'Thêm thành công'});
    }catch(e){
        res.status(404).json({status: false, message: 'Thêm thất bại'})
    }
});

module.exports = router;