const mysql = require('mysql');
const fs = require('fs');
const {HOST,USER,PASS,NAME} = require('../../config')('db');

const dataSql = fs.readFileSync("./DB_DATA/populate_tables.sql").toString();
const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    database: NAME,
    multipleStatements:true
});

db.query(dataSql,function(error,results,fields){
    if (error){
        throw error;
    }
});

db.end(); 