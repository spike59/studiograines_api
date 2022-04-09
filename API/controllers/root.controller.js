const BaseController = require('./base.controller');

class RootController extends BaseController{
    constructor(){
        super(false);//le root n'utilise pas les actions par defaut
        this.addControllers();
    }
    addControllers = ()=>
    {

        this.index = async (req,res) => {
            //console.log("root index controller");
            return res.status(200).json({message:"homepage bienvenue !"})
        }
    }
}
module.exports = RootController;