var express = require('express');
var router = express.Router();

var categoryModels = require("../models/category");
router.post("/add", async function(req, res, next){ 
    try{
        const {name, image} = req.body;

        const addItem = {name, image}; // tạo object
    
        await categoryModels.create(addItem);
        res.status(200).json({status: true, message: "OK"});
    }catch(e){
        res.status(400).json({status: false, message: "Fail"});
    }
    

    // xử lý database
});

router.put('/edit', async function (req, res){
    try{
        const {id, name, image} = req.body;
        var itemUpdate = await categoryModels.findById(id); //findById: tìm object theo id

        if(itemUpdate != null){
            itemUpdate.name = name ? name : itemUpdate.name;
            itemUpdate.image = image ? image : itemUpdate.image;
            await itemUpdate.save();
            res.status(200).json({status: true, message: "Thành công"})
        }else{
            res.status(200).json({status: false, message: "Không tìm thấy"})
        }
    }catch(e){
        res.status(400).json({status: false, message: "Thất bại"})
    }
})

module.exports = router;