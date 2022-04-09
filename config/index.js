module.exports = (name) => {
    require('dotenv').config();
    try{
        return require(`./${process.env.NODE_ENV}/${name}.config`);
    }catch{
        return null
    }
}