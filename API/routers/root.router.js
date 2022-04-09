const BaseRouter = require('./base.router');
const services = require('../services');

class RootRouter extends BaseRouter{
    constructor(){
        super();
        this.add_routes();
    }
    add_routes = () => {
        this.router.get('/',async (req,res)=>{
            console.log("root router index");
            const response = await this.ct.index(req,res);
            response?
                res.status(response.status||200).json(response.data):
                res.status(500).json({message : "erreur server"});
        } );

 
    }
}
module.exports = RootRouter;