var express = require('express');
var router = express.Router();
var typeProduct = require('../models/type');

var JWT = require('jsonwebtoken');
const configENV = require('../configENV');

// router thêm loại sản phẩm
/**
 * @swagger
 * /type_product/addTypeProduct:
 *   post:
 *      summary: 'Thêm loại sản phẩm'
 *      parameters:
 *       - in: query
 *         name: name
 *         description: name loại sản phẩm
 *         required: true
 *         type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *        200:
 *          description: 'Thêm sản phẩm thành công'
 *        400:
 *          description: 'Thêm sản phẩm thất bại'
 */

router.post('/addTypeProduct', async (req, res) => {
    try {
        // Kiểm tra token
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, configENV.SECRETKEY, async (err, id) => {
                if (err) {
                    res.status(403).json({status: 403, "err": err});
                } else {
                    const { name } = req.query;
                    const objectType = { name };
                    await typeProduct.create(objectType);
                    res.status(200).json({ status: true, message: "Thêm thành công loại sản phẩm"});
                }
            })
        }else{
            res.status(401).json({status: false, message: "Không tìm thấy token"})
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Thêm thất bại" })
    }
});

// router lấy toàn bộ danh sách loại sản phẩm
/**
 * @swagger
 * /type_product/getAllType:
 *   get:
 *      summary: 'Lấy toàn bộ danh sách loại sản phẩm'
 *      security:
 *          - bearerAuth: []
 *      responses:
 *        200:
 *          description: 'Lấy thành công'
 *        400:
 *          description: 'Lấy thất bại'
 */

router.get('/getAllType', async (req, res) => {
    try{
        // Lấy token
        const token = req.header('Authorization').split(' ')[1];
        if(token){
            // Kiểm tra token
            JWT.verify(token, configENV.SECRETKEY, async (err, id) => {
                if(err){
                    // Lỗi token thì hiện err
                    res.status(403).json({status: 403, "err": err});
                }else{
                    // Ngược lại thì thực hiện chức năng
                    const listType = await typeProduct.find();
                    res.status(200).json({status: 404, data: listType});
                }
            })
        }else{
            res.status(401).json({status: false, message: "Không tìm thấy token"})
        }
    }catch(e){
        res.status(400).json({status: false, message: "Lấy thất bại"})
    }
});

// router xóa loại sản phẩm
/**
 * @swagger
 * /type_product/deleteType/{id}:
 *   delete:
 *      summary: 'Lấy toàn bộ danh sách loại sản phẩm'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: id loại sản phẩm
 *          required: true
 *          type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *        200:
 *          description: 'Lấy thành công'
 *        400:
 *          description: 'Lấy thất bại'
 */

router.delete('/deleteType/:id', async (req, res) => {
    try{
        const token = req.header('Authorization').split(' ')[1];
        if(token){
            JWT.verify(token, configENV.SECRETKEY, async (err, id) => {
                if(err){
                    res.status(403).json({status: 403, "err": err});
                }else{
                    const {id} = req.params;
                    await typeProduct.findByIdAndDelete(id);
                    res.status(200).json({status: true, message: "Xóa thành công"})
                }
            });
        }else{
            res.status(401).json({status: false, message: "Không tìm thất token"})
        }
    }catch(e){
        res.status(400).json({status: false, message: "Xóa thất bại"})
    }
})

// router sửa loại sản phẩm
/**
 * @swagger
 * /type_product/editType:
 *   put:
 *      summary: 'Sửa loại sản phẩm'
 *      parameters:
 *        - in: query
 *          name: id
 *          description: id loại sản phẩm
 *          required: true
 *          type: string
 *        - in: query
 *          name: name
 *          description: name loại sản phẩm
 *          required: true
 *          type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *        200:
 *          description: 'Thêm sản phẩm thành công'
 *        400:
 *          description: 'Thêm sản phẩm thất bại'
 */

router.put('/editType', async (req, res) => {
    try{
        // Lấy token
        const token = req.header('Authorization').split(' ')[1];
        // Kiểm tra token
        if(token){
            JWT.verify(token, configENV.SECRETKEY, async (err, id) => {
                if(err){
                    res.status(403).json({status: 403, "err": err});
                }else{
                    // Xử lý chức năng
                    const {id, name} = req.query;
                    const findType = await typeProduct.findById(id);

                    if(findType != null){
                        findType.name = name ? name : findType.name;
                        await findType.save();
                        res.status(200).json({status: true, message: 'Sửa thành công'});
                    }else{
                        res.status(404).json({status: false, message: 'Không tìm thất'});
                    }
                }
            });
         }else{
            res.status(401).json({status: false, message: "Không tìm thấy token"});
        }
    }catch(e){
        res.status(400).json({status: false, message: "Sửa thất bại"})
    }
})

module.exports = router