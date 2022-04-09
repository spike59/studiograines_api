const BaseController = require('./base.controller');
const services = require('../services');
const jwt = require('jsonwebtoken');
const {secret,HASH_PREFIX} = require('../../config')('app');
const MailerService = require('../services/mailer.service');
const Bcrypt = require('bcrypt');

class AuthController extends BaseController{
    constructor(){
        super();
        this.service = new services[this.table];
    }

    async register(req,res){
        let usersService = new  services["app_user"]();
        console.log("register user ",req.body);
        const user = await usersService.getOneUserByMail(req.body.email);
        console.log("user ",user);
        if (!user){
            console.log("appConfig",secret);
            const payload = {mail: req.body.email, role: "User", password: req.body.password};
            const token = jwt.sign(payload, secret, { expiresIn: '1d' });
            //SEND MAIL
            const strToken = encodeURIComponent(token);
            const url = "http://localhost:3000/account/validation?t=" + strToken;
            const html = 
            `
            <b>Confirmez votre inscription : </b>
            <a href="${url}" target="_blank">Confirmer</a>
            
            `;
            let mailerService = new MailerService();
            const mailed = await mailerService.sendMail({to: req.body.email, subject:"Confirmer votre inscription", html});
            console.log("mailed",mailed);
            if (mailed)
            {
                console.log("mailed");
                //TODO enlever le token ce n'est utile que pour la fake validation par mail
                return res.status(200).json({ status:200,message: 'creation de compte en attente',token:strToken });
            }
            else{
                return res.status(200).json({status:200, message: 'creation de compte mais erreur envoie du mail reessayer',token:strToken });
            }
            
        }
        return res.status(404).json({status:404, message: 'utilisateur existant' });
        
        //return res.status(200).json({ message: 'on est bon' });
    }

    async validate (req,res){
        console.log("auth controller validate");
        //if(req.method !== 'POST') return {status:405};
        
        const token = req.body.token;
        let payload;
        try{
            payload = jwt.verify(token, secret); 
        }
        catch{
            //return {data:{completed:false, message:"Une erreur est survenue ..."}};
            return res.status(400).json({message:"probleme de payload"})
        }
        if(payload){
            //const service = new UserServiceClass();
            console.log("payload",payload);
            let usersService = new  services["app_user"]();
            const password = (await Bcrypt.hash(payload.password,10)).replace(HASH_PREFIX,'')
            const user = await usersService.insert({email:payload.mail, password, role:payload.role}).catch(e=>{
                console.log("ERRRO SQL INSERT USER",e);
                return res.status(400).json({message:"erreur sql"})
            });
            console.log("user id",user.id);
            
            return user ?
                res.status(200).json({user_id:user.id}):
                res.status(400).json({message:"user undefined"})
            // return user ? 
            //     {data:{completed:true, message:"Bienvenu sur shoponline ! Votre compte est maintennant actif, vous pouvez vous connecter."}} :
            //     {data:{completed:false, message:"Une erreur est survenue ..."}};
        }
        return res.status(400).json({message:"L'activation de votre compte a expiré, réinscrivez vous ..."})
        //return {data:{completed:false, message:"L'activation de votre compte a expiré, réinscrivez vous ..."}};
    }
    
    authenticate(req,res,next){
        console.log("services",services);
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        usersService.authenticate(req.body)
            .then(user => user ? res.json(user):res.status(400).json({message:"username or password invalid"}))
            .catch(err => next(err));
    }
    async refresh(req,res){
        console.log("auth controller refresh",req.cookies.token);
        //if(req.method !== 'POST') return {status:405};
        
        //const token = req.body.token;
        const token =req.cookies.token
        console.log("token récupéré !!",token);
        let payload;
        try{
            payload = jwt.verify(token, secret); 
        }
        catch{
            //return {data:{completed:false, message:"Une erreur est survenue ..."}};
            return res.status(400).json({message:"probleme de payload"})
        }
        if(payload){
            //const service = new UserServiceClass();
            console.log("payload",payload);
            let user = {
                "email":payload.mail,
                "role":payload.role
            }
            //let usersService = new  services["app_user"]();
            //const password = (await Bcrypt.hash(payload.password,10)).replace(HASH_PREFIX,'')
            // const user = await usersService.insert({email:payload.mail, password, role:payload.role}).catch(e=>{
            //     console.log("ERRRO SQL INSERT USER",e);
            //     return res.status(400).json({message:"erreur sql"})
                
            // });
            console.log("user ",user);
            
            return user ?
                res.status(200).json({user:user}):
                res.status(400).json({message:"user undefined"})
            // return user ? 
            //     {data:{completed:true, message:"Bienvenu sur shoponline ! Votre compte est maintennant actif, vous pouvez vous connecter."}} :
            //     {data:{completed:false, message:"Une erreur est survenue ..."}};
        }
        return res.status(400).json({message:"user introuvable ..."})        
    }

    getAllUsers(req,res,next){
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        usersService.getAllUsers()
        .then(users => res.json(users))
        .catch(err=>next(err));
    }

    getUser(req,res,next){
        let usersService = new  services["app_user"]();
        console.log("this user service2",usersService);
        const currentUser = req.user;
        const id = parseInt(req.params.id)

        if ( id !== currentUser.sub ){
            return res.status(401).json({message:'unauthorized'});
        }
        
        // if (id !== currentUser.sub && currentUser.role !== Role.Admin){
        //     return res.status(401).json({message:'unauthorized'});
        // }
        usersService.getOneUser(req.params.id)
        .then(user => user ? res.json(user):res.sendStatus(404))
        .catch(err=>next(err));
    }
}
module.exports  = AuthController;