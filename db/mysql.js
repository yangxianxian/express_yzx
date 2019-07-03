const mysql = require('mysql')
const sqlServer = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'password',
    database:'myblog'
})

function querySql (sql) {
    return new Promise((resolve,reject) => {
        sqlServer.query(sql,(err,data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = {
    querySql
}