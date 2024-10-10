var express = require('express');
var router = express.Router();

var sendMail = require('../untils/configMail');

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

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
