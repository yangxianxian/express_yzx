const {querySql} = require('../db/mysql')

const getList = (author,keyword) => {
    
    let sql = 'select * from blogs where 1=1 '
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and username='${keyword}' `
    }
    return querySql(sql)
}

const login = (username,password) => {
    if(username && password) {
        let sql = `select * from users where username = '${username}' and password='${password}'`
        return querySql(sql)
    }
}

module.exports = {
    getList,login
}