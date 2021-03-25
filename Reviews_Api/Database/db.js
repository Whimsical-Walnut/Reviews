var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '172.31.24.52', //ec2 losthost ip address
    user: 'momo', //docker mysql container username
    password: '123', //mysql password 
    database: 'reviews_api' //database name
});

module.exports.connection = connection;

//MYSQL_HOST_IP: '192.168.2.8'