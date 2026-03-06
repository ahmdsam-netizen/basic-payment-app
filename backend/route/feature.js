const express = require("express") ;
const mongoose = require("mongoose")
const { User, Account } = require("../database/db");

const featureRoute = express.Router() ;

featureRoute.get("/search" , async (req , res) => {
    const filter = req.query.filter || ""

    const users = await User.find() 
    res.json({
        user : users.map(user => ({
            userName : user.userName , 
            userId : user._id 
        }))
    })
})

featureRoute.patch("/send" , middleware , async (req , res) => {
    const session = await mongoose.startSession() ;

    session.startTransaction() ;

    const {amount , to} = req.body 
    const sender = await Account.findOne({userId : req.userId}).session(session)
    if(amount < sender.balance){
        await session.abortTransaction() 
        return res.json({
            message : "Insufficient balance"
        })
    }
    const receiver = await User.findOne({userName : to}).session(session)
    if(!receiver){
        await session.abortTransaction() 
        return res.json({
            message : "User with receiver userName doesn't exists"
        })
    }
    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session)
    await Account.updateOne({userName : to} , {$inc : {balance : amount}}).session(session)

    // Add transaction history for both sender and receiver

    await session.commitTransaction() 

    return res.json({
        message : "Transaction has been completed successfully"
    })
})

featureRoute.get("/history" , async (req , res) => {
    const history = await Account.find({})
    return res.json({
        transactions : history.map((cur) => ({
            message : cur
        }))
    })
}) 

module.exports = featureRoute