const routers = require('../routers');
const errorHandler = require('../../helpers/error_handler');
class StartRouting {
    static initialize = (server)=>{
        //route administrées
        for(const route in routers){
            server.use(`/${route}`,new routers[route]().router)
        }
        //sinon public main route root /:root_request
        server.use('/', new routers['root']().router)
        //sinon erreur gérée
        server.use(errorHandler);
        //sinon
        server.get('/*',(req,res)=>{
            res.status(400).json({'message':'page introuvable'});
        });
    }
}
module.exports = StartRouting.initialize;