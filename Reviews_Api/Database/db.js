var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', //ec2 172.31.24.52
    user: 'root', //momo
    password: '123456789', //123
    database: 'reviews_api'
});

module.exports.connection = connection;

//MYSQL_HOST_IP: '192.168.2.8'