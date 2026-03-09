const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://anaizafatima991_db_user:Tp8W3XpeHfVD2ZdK@cluster0.vihzt9u.mongodb.net/payment-data")

const userSchema = mongoose.Schema({
    userName: {
        type : String ,
        required : true ,
        unique : true ,
        minLength : 3 ,
        maxLength : 50 ,
    } ,
    firstName : String ,
    lastName : String ,
    password : {
        type : String ,
        required : true ,
        maxLength : 30
    }
})

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' , 
        required : true 
    } ,
    balance : Number ,
})

const transactionSchema = mongoose.Schema({
    senderId :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true ,
    }  ,
    amount : Number ,
    date: {
        type: Date,
        default: Date.now
    } ,
    counterParty : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true ,
    },
})

const User = mongoose.model("User" , userSchema)
const Account = mongoose.model("Account" , accountSchema)
const Transaction = mongoose.model("Transaction" , transactionSchema)

module.exports = {
    User , Account , Transaction
}