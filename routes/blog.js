const express = require('express');
const router = express.Router()
const {getList} = require('../controller/blog')

const {successMoudle,errorMoudle} = require('../db/moudle')

const loginCheck = require('../middleWare/loginCheck');

router.get('/list',loginCheck,(req,res,next) => {
    const {keyword} = req.query
    const author = req.session.username ? req.session.username : ''
    if(author) {
        return getList(author,keyword).then(result => {
            if(result.length > 0) {
                res.json(new successMoudle(result))
            }
        })
    }else {
        res.json(new errorMoudle('为获取登录作者的信息'))
    }
})



module.exports = router
