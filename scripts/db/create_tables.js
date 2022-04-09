const mysql = require('mysql');
const fs = require('fs');
const {HOST,USER,PASS,NAME} = require('../../config')('db');

const createSql = fs.readFileSync("./DB_DATA/create_tables.sql").toString();
const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    database: NAME,
    multipleStatements:true
});

db.query(createSql,function(error,results,fields){
    if (error){
        throw error;
    }
});

db.end(); 