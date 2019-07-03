const {errorMoudle} = require('../db/moudle');
module.exports = (req,res,next) => {
    if(!req.session.username) {
        res.json(new errorMoudle('未登录'))
        return
    }
    next()
}