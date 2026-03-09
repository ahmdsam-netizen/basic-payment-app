const express = require("express") 
const jwt = require("jsonwebtoken") 
const zod = require("zod")
const JWT_TOKEN = require("../config")
const middleware = require("../middleware/auth")
const { User, Account } = require("../database/db")

const signupInput = zod.object({
    userName : zod.string().min(3).max(20) ,
    firstName : zod.string().optional() ,
    lastName : zod.string().optional() ,
    password : zod.string()
})

const signRoute = express.Router() ;

signRoute.use(express.json())

signRoute.post("/signup" , async (req , res) => {
    const {success , data} = signupInput.safeParse(req.body)
    if(!success){
        return res.json({
            message : "Invalid inputs provided" ,
            success : false 
        })
    }
    const finding = await User.findOne({userName : req.body.userName})
    if(finding) {
        return res.json({
            message : "User already exists with such Username",
            success : false ,
        })
    }
    const user = await User.create(req.body)
    await Account.create({
        userId : user._id ,
        balance : 1 + Math.random() * 10000
    })
    const wToken = jwt.sign({
        userId : user._id
    } , JWT_TOKEN) 
    return res.status(200).json({
        message : "User has been created successfully" ,
        success : true ,
        token : wToken
    })
})

const signinInput = zod.object({
    userName : zod.string().min(3).max(20),
    password : zod.string() 
})


signRoute.post("/signin" , async (req , res) => {
    const {success , data} = signinInput.safeParse(req.body) ;
    if(!success){
        return res.json({
            message : "Invalid inputs provided" ,
            success : false
        })
    }
    const finding = await User.findOne({userName : req.body.userName})
    if(!finding){
        return res.json({
            message : "User with this userName doesn't exists" ,
            success : false
        })
    }
    const wToken = jwt.sign({
        userId : finding._id
    } , JWT_TOKEN) 
    return res.json({
        message : "User has been verified for signin" ,
        success : true ,
        token : wToken
    })
})

const updateInput = zod.object({
    firstName : zod.string().optional() ,
    lastName : zod.string().optional() ,
    password : zod.string().optional()
})

signRoute.put("/update" , middleware , async (req , res) => {
    const {result} = updateInput.safeParse(req.body) 
    if(!result.success){
        return res.json({
            message : "Invalid inputs provided" 
        })
    }
    const updating = await User.updateOne( req.body , {
        id : req.userId
    })
    return res.json({
        message : "User's information is updated successfully" ,
    })
})

signRoute.get("/signout" , (req , res) => {

})

module.exports = signRoute 