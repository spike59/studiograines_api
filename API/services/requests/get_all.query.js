const BaseService = require('../base.service');

async function getAll(){
    console.log("service get all");
    let sql = `SELECT * from ${this.tableName}`;
    const rows =  await BaseService.query(sql);
    console.log("return rows",rows);
    return rows;
}
module.exports = getAll;