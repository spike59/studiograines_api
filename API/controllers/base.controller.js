const services = require('../services');

class BaseController{
    
    constructor(standard = true){
        this.name = this.constructor.name.replace(`Controller`,``);
        this.table = this.name.toLowerCase();
        if (standard){
            this.service = new services[this.table];
        }     
        
    }

}
module.exports  = BaseController;