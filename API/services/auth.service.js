const BaseService = require('./base.service');
const services = require('../services');

class AuthService extends BaseService{
    constructor(){
        super();
        this.usersService = new services['user_account'];
    }

}
module.exports  = AuthService;