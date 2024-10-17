var express = require('express');
var router = express.Router();
var customerModel = require('../models/custom');

var JWT = require('jsonwebtoken');
const configENV = require('../configENV');

 /**
  * @swagger
  * components:
  *   securitySchemes:
  *     bearerAuth:
  *       type: http
  *       scheme: bearer
  *       bearerFormat: JWT
  */

// router đăng ký
// Cấu hình api lên swagger
/**
 * @swagger
 * /customer/addCustomer:
 *      post:
 *          summary: 'Đăng ký thêm người dùng'
 *          requestBody:
 *              required: true,
 *              content:
 *                  application/json:
 *                      Schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: 'Thêm thành công'
 *              400:
 *                  description: 'Thêm thất bại'
 */

router.post('/addCustomer', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const objectCustomer = { name, email, password };
        await customerModel.create(objectCustomer);
        res.status(200).json({ status: true, message: 'Thêm người dùng thành công' });
    } catch (e) {
        res.status(404).json({ status: false, message: 'Thêm người dùng thất bại' });
    }
});

// router đăng nhập
// Cấu hình API lên swagger
/**
 * @swagger
 * /customer/loginCustomer:
 *      post:
 *          summary: 'Đăng nhập'
 *          requestBody:
 *              required: true,
 *              content:
 *                  application/json:
 *                      Schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: 'Đăng nhập thành công'
 *              400:
 *                  description: 'Đăng nhập thất bại'
 */

router.post('/loginCustomer', async function (req, res) {
    try {
        const { email, password } = req.body;
        var checkUser = await customerModel.findOne({
            email: email,
            password: password
        });

        if (checkUser) {
            // Tạo token
            const token = JWT.sign({ id: email }, configENV.SECRETKEY, { expiresIn: '30d' });
            const refreshToken = JWT.sign({ id: email }, configENV.SECRETKEY, { expiresIn: '1d' });

            res.status(200).json({ status: true, message: 'Thành Công', token: token, refreshToken: refreshToken });
        } else {
            res.status(400).json({ status: false, message: 'Không tìm thấy' });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: 'Thất bại' });
    }
})

// router lấy thông tin chi tiết người dùng
/**
 * @swagger
 * /customer/getCustomer:
 *   get:
 *     summary: 'Lấy thông tin chi tiết người dùng'
 *     parameters:
 *       - in: query
 *         name: id
 *         description: id người dùng
 *         required: true
 *         type: string
 *     security:
 *          - bearerAuth: []
 *     responses:
 *       200:
 *         description: 'Lấy thành công'
 *       400:
 *         description: 'Lấy thất bại'
 */

router.get('/getCustomer', async (req, res) => {
    try {
        // Kiểm tra token
        const token = req.header("Authorization").split(' ')[1];
        if (token) {
            JWT.verify(token, configENV.SECRETKEY, async (err, id) => {
                if (err) {
                    res.status(403).json({ status: 403, "err": err });
                } else {
                    // Xử lý chức năng router
                    const { id } = req.query;
                    const Customer = await customerModel.findById(id);
                    res.status(200).json({ status: true, message: "Tìm thấy thành công", data: Customer })
                }
            });
        } else {
            res.status(401).json({ status: false, message: "Không tìm thấy token" })
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Thất Bại" })
    }
})

module.exports = router;