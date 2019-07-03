var express = require('express');
var router = express.Router();
const {login} = require('../controller/blog')

const {successMoudle,errorMoudle} = require('../db/moudle')
/* GET users listing. */
router.post('/login', function(req, res, next) {
  const {username,password} = req.body
  return login(username,password).then(result => {
    if(result.length > 0) {
      req.session.username = username
      req.session.password = password
      res.json(new successMoudle('登录成功！'))
    }else {
      res.json(new errorMoudle('登录失败'))
    }
  })
});



module.exports = router;
