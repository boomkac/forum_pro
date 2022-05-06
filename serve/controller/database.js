
const mysql = require('mysql')
const db = mysql.createConnection({
    host: '127.0.0.1',
    post: '3306',
    user: 'root',
    password: '123456',
    database: 'sc_forum',

})
db.connect((err)=>{
    if(err){
        console.log('数据库连接失败')
        return
    }
    console.log('数据库sc_forum连接成功')
})

module.exports = db