const express = require("express") ;
const mongoose = require("mongoose")
const middleware = require("../middleware/auth")
const { User, Account , Transaction } = require("../database/db");

const featureRoute = express.Router() ;
featureRoute.use(express.json())

featureRoute.get("/my-data" , middleware , async (req , res) => {
    try{
        const myData = await User.findOne({_id : req.userId})
        const myAccount = await Account.findOne({userId : req.userId}) 
        const myTransactions = await Transaction.find({
            $or: [{ senderId: myData._id }, { counterParty: myData._id }]
        })

        return res.status(200).json({
            userId : req.userId ,
            userName : myData.userName ,
            firstName : myData.firstName ,
            lastName : myData.lastName ,
            amount : myAccount.balance ,
            transactionHistory : myTransactions ,
        })
    } catch(error){
        return res.status(500).json({
            "message" : "Not able to fetch data from database - Try again later" ,
            "success" : false 
        })
    }
})

featureRoute.get("/search" , async (req , res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        userName: { $regex: filter, $options: 'i' } // 'i' = case insensitive
    })
    res.json({
        user : users.map(user => ({
            userName : user.userName , 
            userId : user._id 
        }))
    })
})

featureRoute.patch("/send", middleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;

        const sender = await Account.findOne({ userId: req.userId }).session(session);
        if (amount > sender.balance) { 
            await session.abortTransaction();
            return res.json({ message: "Insufficient balance" });
        }

        const receiver = await User.findOne({ userName: to }).session(session);
        if (!receiver) {
            await session.abortTransaction();
            return res.json({ message: "User with receiver username doesn't exist" });
        }

        const [transaction] = await Transaction.create([{
            senderId : req.userId ,
            amount : amount ,
            date : new Date() ,
            counterParty : receiver._id
        }] , {session})

        await Account.updateOne(
            { userId: req.userId }, 
            { 
                $inc: { balance: -amount } ,
            }).session(session);

        await Account.updateOne(
            { userId: receiver._id }, 
            { 
                $inc: { balance: amount } ,
            }).session(session);


        await session.commitTransaction();
        return res.json({ message: "Transaction has been completed successfully" });

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Transaction failed" });
    }
});

module.exports = featureRoute