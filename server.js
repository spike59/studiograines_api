//dependencies
const shared = require("./shared");
console.log("shared",shared);
require('./helpers/string.helper');
const db = require('./scripts/db/db_connect');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');

//express server config
const server = express();
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
};

server.use(cors(corsOptions))
server.use(express.json());
server.use(cookieParser());

//routing init
require ('./API/routers/start_routing')(server);
//auth config
server.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized:true,
}))
server.use(passport.initialize());
server.use(passport.session);

const authUser = require('./API/auth/auth_user');
passport.use(new LocalStrategy(authUser));




//launch
const PORT = process.env.PORT ||5000;
server.listen(PORT,()=>{
    console.log("server start on port ",PORT);
})