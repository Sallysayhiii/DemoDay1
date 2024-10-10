var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

[
  {
    "id": 1,
    "name": "bánh",
    "price": "4000",
    "categories":{ // Object Loại bánh
      "idCate": 2,
      "nameCate": "Bánh"
    }
  },
  
  {
    "id": 2,
    "name": "kẹo",
    "price": 5000,
  }
]