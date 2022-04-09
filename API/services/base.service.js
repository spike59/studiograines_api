const mysql = require('mysql');
const {HOST,USER,PASS,NAME} = require('../../config')('db');
const models = require('../models');
const requests = require('./requests');

class BaseService{
    currentClass = this.constructor.name;
    modelName = this.currentClass.replace("Service", "");
    tableName = this.modelName.toLowerCase();
    table = this.tableName;
    ModelClass = models[this.tableName];

    static db;
    static #connect = ()=>{
        if(!BaseService.db){
            BaseService.db= mysql.createPool({
                host:HOST,
                user:USER,
                password:PASS,
                database:NAME
            })
        }
        return BaseService.db;
    }
    static query = async (sql) =>{
        return await new Promise((resolve,reject)=>{
            BaseService.#connect().query(sql,(err,rows)=>{
                if (err){
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }
    static executeQuery = async (sql, params) => {
        return await new Promise((resolve, reject) => {
          BaseService.#connect().query(sql, params, (err, rows) => {
            if (err) {
              return reject(err);
            }
            return resolve(rows);
          });
        });
      };
      executeQuery= async (sql, params) => {
        return await BaseService.executeQuery(sql, params)
      }    

    async getOne(){
        console.log("service get one");
        let sql = `SELECT * from ${this.tableName}`;
        const rows =  await BaseService.query(sql);
        console.log("return rows",rows[0]);
        return rows[0];
    }
    async getOneBySql(sql){
        console.log("service get one by sql");
        //let sql = `SELECT * from ${this.tableName}`;
        const rows =  await BaseService.query(sql);
        console.log("return rows",rows[0]);
        if (rows.length == 1){
            return rows[0]
        }
        else{
            return null
        }     
    }
    select = async (params) => {
        let sql = `SELECT * FROM ${this.table} WHERE deleted = ?`;
        if(params?.where){
            sql += ` AND (${params.where.replace('&&','AND').replace('||','OR')})`;
        }
        sql += ";"
        const rows = await BaseService.executeQuery(sql, [0]);
        return this.ModelClass.from(rows);
      };

    insert = async (params, forceId = false) => {
    if(Array.isArray(params)){
        if(params.length === 0) return null;
        const objects = this.ModelClass.from(params);
        const first = [...objects].pop().getProps();
        if(!forceId) delete first.id;
        const columns = Object.keys(first).join(',');
        let values = [];
        objects.forEach(object => {
        if(!forceId) delete object.id;
        values.push("(" + Object.values(object.getSqlProps()).join(',') + ")");
        })
        values = values.join(',');
        const sql = `INSERT INTO ${this.table} (${columns}) VALUES ${values};`;
        const result = await BaseService.executeQuery(sql);
        const rows = await this.select({where:`id >= ${result.insertId} && id < ${result.insertId + result.affectedRows}`});
        return rows;
    }
    else{
        const object = this.ModelClass.from(params);
        if(!forceId) delete object.id;
        const columns = Object.keys(object.getProps()).join(',');
        const values = Object.values(object.getSqlProps()).join(',')
        const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values});`;
        const result = await BaseService.executeQuery(sql);
        const rows = await this.select({where:`id=${result.insertId}`});
        return rows.length === 1 ? rows.pop() : null;
    
    }
    }
}
module.exports  = BaseService;