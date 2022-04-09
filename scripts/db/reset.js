const mysql = require('mysql');
const fs = require('fs');
const {HOST,PORT,USER,PASS,NAME} = require('../../config')('db');

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    multipleStatements:true
});


    const dbName = NAME;
    let sql = `DROP DATABASE IF EXISTS ${dbName} ;`;
    sql += ` CREATE DATABASE IF NOT EXISTS ${dbName} ;`;
    //sql += fs.readFileSync("./DB_DATA/create_tables.sql").toString();
    console.log("sql",sql)
    
    db.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);

    });


db.end(); 