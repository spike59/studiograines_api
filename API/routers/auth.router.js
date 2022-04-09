const BaseRouter = require('./base.router');
const services = require('../services');
const authorize = require('../auth/authorize');
const Role = require("../auth/role");
class AuthRouter extends BaseRouter{
    constructor(){
        super();
        this.add_routes();
    }
    add_routes = () => {
        this.router.post('/register',async (req,res)=>{
            const response = await this.ct.register(req,res);
            res.status(response.status||200).json(response.data);
        } );

        this.router.post('/validate',async (req,res)=>{
            console.log("start validate request");
            const response = await this.ct.validate(req,res);
            res.status(response.status||200).json(response.data);

        } );

        this.router.post('/login',this.ct.authenticate );
        // this.router.get('/validate',async (req,res)=>{
        //     return (res.status(404).json({message:"erreur get sur validate"}))
        //     }
        // );
        this.router.post('/refresh_token',async (req,res)=>{
            console.log("refresh router",req.body);
            const response = await this.ct.refresh(req,res);
            res.status(response.status||200).json(response.data);
        } );

        this.router.get('/users',authorize(Role.Admin),this.ct.getAllUsers);
        this.router.get('/user/:id',authorize(),this.ct.getUser);
    }
}
module.exports = AuthRouter;