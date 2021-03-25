var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: '123456789',
    database: 'reviews_api'
});

module.exports.connection = connection;

//MYSQL_HOST_IP: '192.168.2.8'