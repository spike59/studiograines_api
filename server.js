//dependencies
const shared = require("./shared");
console.log("shared",shared);
require('./helpers/string.helper');
const db = require('./scripts/db/db_connect');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');


//express server config
const server = express();
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
};
server.use(cors(corsOptions))
server.use(express.json());
server.use(cookieParser());
require ('./API/routers/start_routing')(server);


//launch
const PORT = process.env.PORT ||5000;
server.listen(PORT,()=>{
    console.log("server start");
})