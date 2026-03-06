const express = require("express") ;
const cors = require("cors") ;
const mainRoute = require("./route/index") ;
const app = express() ;

app.use(cors())
app.use(mainRoute , "/api/v1")

app.listen(3000 , () => {
    console.log("Started to run")
}) ;