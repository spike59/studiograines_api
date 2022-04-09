const ejwt = require('express-jwt');
// const { secret } = require('./config.json');
const jwt = require('jsonwebtoken');
//const services = require('../services');
const {secret} = require('../../config')('app');
module.exports = authorize;

function authorize(roles = []) {
    //console.log("authorize route");
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return [
        // authenticate JWT token and attach user to request object (req.user)
        ejwt({ secret, algorithms: ['HS256'] }),
        //jwt.verify(token, secret), 
        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            console.log("auth success route");
            // authentication and authorization successful
            next();
        }
    ];
}