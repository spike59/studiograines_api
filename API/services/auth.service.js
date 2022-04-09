const BaseService = require('./base.service');
const services = require('../services');

class AuthService extends BaseService{
    constructor(){
        super();
        this.usersService = new services['app_user'];
    }

}
module.exports  = AuthService;