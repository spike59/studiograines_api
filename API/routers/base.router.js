const Router = require('express').Router;
const controllers = require('../controllers');
const models = require('../models');

class BaseRouter {
    constructor(standard = true){
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`,``);
        this.table = this.name.toLowerCase();
        if (standard){
            this.ct  = new controllers[this.table]();
        }
        
        if ( models[this.table]){
            this.initializeRoutes();
        }
    }

    initializeRoutes = () => {

        // /category ou /gender
        this.router.get('/',async (req, res) => {
            this.response = await this.ct.index();
            console.log("response",this.response)
            res.send(this.response);
            //res.send(`get all rows of ${this.table}`);
        })
        
        // /category/1
        this.router.get('/:id',(req, res) => {
            res.send(`get ${this.table} row with id=${req.params.id}`);
        })

        //create new
        this.router.post('/',(req, res) => {
            let response = this.ct.new();
            res.send(response);
            //res.send(`create new ${this.table} row with values : ${JSON.stringify(req.body)}`);
        })
        //update id
        this.router.put('/:id',(req, res) => {
            res.send(`update ${this.table} row with id=${req.params.id} with values : ${JSON.stringify(req.body)}`);
        })
        //soft delete id
        this.router.patch('/:id',(req, res) => {
            res.send(`soft delete ${this.table} row with id=${req.params.id}`);
        })
        //hard delete id
        this.router.delete('/:id',(req, res) => {
            res.send(`hard delete ${this.table} row with id=${req.params.id}`);
        })
    }
}
module.exports = BaseRouter;