var express = require('express');
var router = express.Router();

var productModel = require("../models/product");
var upload = require("../untils/configMulter");


router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });


    router.post('/uploads', [upload.array('image')],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
               return res.json({ status: 0, link : [] }); 
            } else {
              const url = [];
              for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
              }
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : [] });
        }
    });

    router.get("/data", function(req, res){
        res.json({"Data": "GET nè"});
    })
    
    router.post("/data", function(req, res){
        res.json({"Data": "POST nè"});
    })
    
    router.put("/data", function(req, res){
        res.json({"Data": "PUT nè"});
    })
    
    router.delete("/data", function(req, res){
        res.json({"Data": "DELETE nè"});
    })

// var productModel = require("../models/product");

// router.post("/add", async function (req, res) {
//     try{
//         const {name, image, quantity, price, category} = req.body;
//         const itemAdd = {name, image, quantity, price, category};
//         await productModel.create(itemAdd);
//         res.status(200).json({status: true, message: "Thành công"});
//     }catch(e){
//         res.status(200).json({status: false, message: "Thất bại"});
//     }
// });

// router.get("/list", async function (req, res) {
//     try{
//         var list = await productModel.fin({price: {$gt: 7000}}, "name image");
//         res.status(200).json({status: true, data: list});
//     }catch(e) {
//         res.status(400).json({status: false, message: "Thất bại"});
//     }
// })





// var list = [
//     {id:1, name: "banh", price: 4000},
//     {id:2, name: "keo", price: 5000},
// ]

// //localhost:3000/san-pham/list
// router.get("/list", function(req, res, next){ //req: data clien -> server, res: data server->clien
//     res.json(list)
// })

// //localhost:3000/san-pham/data?name=FPT
// router.get("/data", function(req, res){
//     const {name} = req.query;
//     res.json({data: name});
// })


// //localhost:3000/san-pham/add
// router.post("/add", function(req, res){
//     try{
//         const{id, name, price} = req.body;
//         list.push({id, name, price});
//         res.json({status:true, mess:"Thêm thành công"})
//         res.json(list);
//     }catch(e) {
//         res.json({status:false, mess:"Thêm thất bại"})
//     }
// })

// router.get("/detail", function(req, res){
//     try{
//         const {id} = req.query;
//         var item = list.find(p => p.id == id);
//         res.json(item);
//     }catch(e){
//         res.json({status:false, mess:"Thêm thất bại"}) 
//     }
// })

// router.put("/edit", function(req, res){
//     try{
//         const {id, name, price} = req.body;
//         var itemEdit = list.find(p => p.id == id);
//         itemEdit.name = name;
//         itemEdit.price = price;

//         res.json({status: true, mess:"Thành công"})
//     }catch(e){
//         res.json({status: true, mess:"Thất bại"})
//     }
// })

module.exports = router;
