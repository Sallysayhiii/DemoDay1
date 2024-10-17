var express = require('express');
var router = express.Router();

var sendMail = require('../untils/configMail');
var userModel = require('../models/user');
const JWT = require('jsonwebtoken');
const config = require("../untils/configENV");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/send-mail", async function (req, res, next) {
  try {
    const { to, subject, content } = req.body;

    const mailOptions = {
      from: "Noel <kate1225kate@gamil.com>",
      to: to,
      subject: subject,
      html: content
    };
    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Gửi mail thất bại" });
  }
});

router.post("/sign-in", async function (req, res) {
  try{
    const {username, password} = req.body;
    var checkUser = await userModel.findOne({username: username, password: password});
    if (checkUser){
      const token = JWT.sign({id: username},config.SECRETKEY,{expiresIn: '30s'});
      const refreshToken = JWT.sign({id: username},config.SECRETKEY,{expiresIn: '1d'});
      res.status(200).json({status: true, message: "Đăng nhập thành công", token: token, refreshToken: refreshToken});
    }else{
      res.status(400).json({status: true, message: "Không tìm thấy username"});
    }
  }catch(e){
      res.status(400).json({status: false, message: "Đăng nhập thất bại"});
  }
});
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
