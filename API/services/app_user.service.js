const BaseService = require('./base.service');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const services = require('../services');
const {secret} = require('../../config')('app');

class App_userService extends BaseService{
    constructor(){
        super();
        //this.usersService = new services['app_user'];
    }

    async getOneUserByMail(mail){
        console.log("App_userService getOneUserByMail");
        let key = "email";
        let sql = `SELECT * from ${this.tableName} WHERE (${key} = '${mail}');`;
        console.log("sql",sql);
        const user =  await this.getOneBySql(sql);
        
        if (user){
            console.log("return user ok",user.email);
            const {password,...userWithoutPassword} = user;
            return userWithoutPassword;
        }
        else{
            console.log("return user null");
            return null;
        }
        
    }

    async authenticate({email,password}){
        console.log("user authenticate",email,password);
        
        //return rows[0];
        //return user

        const mail = "email",pass = "password";
        //let sql = `SELECT * from ${this.tableName} WHERE ( ${mail} = '${email}' AND ${pass} = '${password}' );`;
        let sql = `SELECT * from ${this.tableName} WHERE ( ${mail} = '${email}' );`;
        const user =  await this.getOneBySql(sql);
        //console.log("return user",user);
        
        //TODO creation de compte
        // let adminpwd;
        let adminpwd = Bcrypt.hashSync("user", 10, function(err, hash) {
            return hash;
        });
        console.log("hash",adminpwd);
        //adminpwd = adminpwd.replace("$2b$10$","");
        console.log("hash",adminpwd);
        if (user){
            //console.log("user"); 
            let userCompletePassword = "$2b$10$" + user.password;
            let usertest = Bcrypt.compareSync(password,userCompletePassword);
            //console.log("aprés b crypt",usertest);
            if (usertest){
                const token = jwt.sign({sub:user.id, mail:user.email,role:user.role},secret)
                const {password, ...userWithoutPassword } = user;
                //console.log("user final", {...userWithoutPassword});
                return ({
                    ...userWithoutPassword,
                    token
                });
            }
        }
        return null;
    } 
    async getAllUsers(){
        console.log("service get all users ");
        const users =  await this.getAll();
        console.log("return users",users);
        if (users){
            return users.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
        }
        else{
            return null;
        }
        
    }
}
module.exports  = App_userService;