const jwt = require("jsonwebtoken")
const JWT_TOKEN = require("../config")

function middleware(req , res , next){
    try{
        const stringGot = req.headers.authorization
        
        // here authorization cannot be Authorization -> weather u r sending Authorization , AUTHORIZATION from the headers

        if(!stringGot || stringGot.split(" ")[0] != 'Bearer'){
            return res.status(404).json({
                "message" : "Incorrect token provided"
            })
        }
        const toCheck = stringGot.split(" ")[1] ;
        const result = jwt.verify(toCheck , JWT_TOKEN) ;
        req.userId = result.userId

        next() 
    } catch(error){
        return res.status(403).json({
            "message" : "Incorrect token provided"
        })
    }
}

module.exports = middleware