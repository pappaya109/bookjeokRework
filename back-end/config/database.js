const mysql = require('mysql2');
let conn = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    port: 3306,
    database: ''
})

conn.connect()
module.exports = conn;