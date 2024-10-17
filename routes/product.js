var express = require('express');
var router = express.Router();

// gọi model
var model_product = require('../models/product');
const JWT = require('jsonwebtoken');
const config = require("../untils/configENV");
// Thêm sản phẩm
router.post('/add', async (req, res) => {
    try {
        const { name, price, quantity, category } = req.body;
        const objectProduct = { name, price, quantity, category };
        await model_product.create(objectProduct);
        res.status(200).json({ status: true, message: "Thêm thành công" });
    } catch (e) {
        res.status(404).json({ status: false, message: "Thêm thất bại" })
    }
});

// Hiển thị lấy danh sách sản phẩm
/**
 * @swagger
 * /san-pham/list:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *       400:
 *         description: Thất bại
 */
router.get('/list', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if(token){
            JWT.verify(token, config.SECRETKEY, async function (err, id){
              if(err){
                res.status(403).json({"status": 403, "err": err});
              }else{
                const list = await model_product.find().populate('category', 'name');
                res.status(200).json({ status: true, data: list });
              }
            });
          }else{
            res.status(401).json({"status": 401});
          }
        const list = await model_product.find().populate('category', 'name');
        res.status(200).json({ status: true, data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" })
    }
});


// - Lấy toàn bộ danh sách sản phẩm
router.get('/getAll', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if(token){
            JWT.verify(token, config.SECRETKEY, async function (err, id){
              if(err){
                res.status(403).json({"status": 403, "err": err});
              }else{
                const list = await model_product.find();
                res.status(200).json({ status: true, message: "Tìm thành công", data: list });
              }
            });
          }else{
            res.status(401).json({"status": 401});
          }
        const list = await model_product.find();
        res.status(200).json({ status: true, message: "Tìm thành công", data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" })
    }
});

// - Lấy toàn bộ danh sách sản phẩm thuộc loại "xxx" ( với xxx là do người dùng truyền vào)
router.get('/getCate', async (req, res) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if(token){
            JWT.verify(token, config.SECRETKEY, async function (err, id){
              if(err){
                res.status(403).json({"status": 403, "err": err});
              }else{
                const list = await model_product.find({ category: cateId });
                res.status(200).json({ status: true, message: "Tìm thành công", data: list });
              }
            });
          }else{
            res.status(401).json({"status": 401});
          }
        const { cateId } = req.query;
        const list = await model_product.find({ category: cateId });
        res.status(200).json({ status: true, message: "Tìm thành công", data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
});

// - Lấy danh sách sản phẩm có số lượng dưới 500
router.get('/getQuantity', async (req, res) => {
    try {
        const list = await model_product.find({ quantity: { $lt: 500 } });
        res.status(200).json({ status: true, message: "Tìm thành công", data: list })
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
});

// - Lấy danh sách sản phẩm có giá trên 5000 và số lượng dưới 50
router.get('/getPriceAndQuantity', async (req, res) => {
    try {
        const list = await model_product.find({ price: { $gt: 20000000 }, quantity: { $lt: 500 } })
        res.status(200).json({ status: true, message: "Tìm thành công", data: list })
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
});

// - Lấy danh sách sản phẩm có tên chứa chữ "xxx" (với xxx là do người dùng truyền vào)
router.get('/getNameProduct', async (req, res) => {
    try {
        const { nameProduct } = req.query;
        const list = await model_product.find({ name: nameProduct });
        res.status(200).json({ status: true, message: "Tìm thành công", data: list })
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
})

// - Thay đổi thông tin sản phẩm theo id,
router.put('/edit', async (req, res) => {
    try {
        const { id, name, price, quantity } = req.body;
        const findProduct = await model_product.findById(id);

        if (findProduct != null) {
            findProduct.name = name ? name : findProduct.name;
            findProduct.price = price ? price : findProduct.price;
            findProduct.quantity = quantity ? quantity : findProduct.quantity;
            await findProduct.save();

            res.status(200).json({ status: true, message: "Thành công" });
        } else {
            res.status(404).json({ status: false, message: "Không tìm thấy" });
        }

    } catch (e) {
        res.status(404).json({ status: false, message: "Thất bại" });
    }
})

// - Xóa một sản phẩm ra khỏi danh sách
router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.query;
        await model_product.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Xóa thành công" });
    } catch (e) {
        res.status(404).json({ status: false, message: "Xóa thất bại" });
    }
})

// - Lấy danh sách các sản phẩm có giá từ min đến max (với min và max là 2 số do người dùng truyền vào)
// - Và sắp xếp danh sách sản phẩm theo giá từ thấp đến cao
router.get('/MinMax', async (req, res) => {
    try {
        const { min, max } = req.query;
        const list = await model_product.find({
            $and: [
                { price: { $gt: min } },
                { price: { $lt: max } }
            ]
        }).sort({ price: -1 }); // 1: tăng dần, -1: giảm dần
        res.status(200).json({ status: true, message: "Lấy thành công", data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Lấy thất bại" });
    }
})

// - Lấy ra danh sách các sản phẩm thuộc loại xxx và có số lượng lớn hơn yyy
// (với xxx là id loại và yyy là số lượng do người dùng truyền vào)
router.get('/getIdandQuantity', async (req, res) => {
    try {
        const { cateId, quantity } = req.query;
        const list = await model_product.find({ quantity: {$gt: quantity}, category: cateId });
        res.status(200).json({ status: true, message: "Tìm thành công", data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
});


// - Tìm sản phẩm có giá cao nhất thuộc loại xxx (với xxx là id loại do người dùng truyền vào)
router.get('/getMostPrice', async (req, res) => {
    try {
        const { cateId } = req.query;
        const list = await model_product.find({ category: cateId }).sort({price: -1}).limit(1);
        res.status(200).json({ status: true, message: "Tìm thành công", data: list });
    } catch (e) {
        res.status(404).json({ status: false, message: "Không tìm thấy" });
    }
});

module.exports = router;


// var express = require('express');
// var router = express.Router();

// var productModel = require("../models/product");
// var upload = require("../untils/configMulter");


// router.post('/upload', [upload.single('image')],
//     async (req, res, next) => {
//         try {
//             const { file } = req;
//             if (!file) {
//                return res.json({ status: 0, link : "" }); 
//             } else {
//                 const url = `http://localhost:3000/images/${file.filename}`;
//                 return res.json({ status: 1, url : url });
//             }
//         } catch (error) {
//             console.log('Upload image error: ', error);
//             return res.json({status: 0, link : "" });
//         }
//     });


//     router.post('/uploads', [upload.array('image')],
//     async (req, res, next) => {
//         try {
//             const { files } = req;
//             if (!files) {
//                return res.json({ status: 0, link : [] }); 
//             } else {
//               const url = [];
//               for (const singleFile of files) {
//                 url.push(`http://localhost:3000/images/${singleFile.filename}`);
//               }
//                 return res.json({ status: 1, url : url });
//             }
//         } catch (error) {
//             console.log('Upload image error: ', error);
//             return res.json({status: 0, link : [] });
//         }
//     });

//     router.get("/data", function(req, res){
//         res.json({"Data": "GET nè"});
//     })
    
//     router.post("/data", function(req, res){
//         res.json({"Data": "POST nè"});
//     })
    
//     router.put("/data", function(req, res){
//         res.json({"Data": "PUT nè"});
//     })
    
//     router.delete("/data", function(req, res){
//         res.json({"Data": "DELETE nè"});
//     })




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

// module.exports = router;
