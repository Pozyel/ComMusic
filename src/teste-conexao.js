const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'remotemysql.com',
    port     : '3306',
    user     : 'kqqU4yPhkU',
    password : 'mqb4P3hWq9',
    database : 'kqqU4yPhkU'
});
connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
});

