const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'kate1225kate@gmail.com',
      pass: 'dgkovtomvrtxnbvv'
    }
  });

module.exports = { transporter };