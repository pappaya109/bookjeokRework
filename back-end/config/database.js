const mysql = require('mysql2');
let conn = mysql.createConnection({
    host: 'project-db-stu3.smhrd.com',
    user: 'Insa4_JSB_hacksim_6',
    password: 'aishcool6',
    port: 3307,
    database: 'Insa4_JSB_hacksim_6'
})

conn.connect()
module.exports = conn;