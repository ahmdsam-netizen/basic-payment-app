const express = require("express") ;
const mainRoute = express.Router() ;
const signRoute = require("./sign")
const featureRoute = require("./feature") 

mainRoute.use("/sign" , signRoute) ;
mainRoute.use("/feature" , featureRoute) ;

module.exports = mainRoute ;