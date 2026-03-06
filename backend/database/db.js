const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://anaizafatima991_db_user:Tp8W3XpeHfVD2ZdK@cluster0.vihzt9u.mongodb.net/payment-user")

const userSchema = mongoose.Schema({
    userName: {
        type : String ,
        require : true ,
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
    allTransactions : Array
})

const User = mongoose.model("User" , userSchema)
const Account = mongoose.model("Account" , accountSchema)

module.exports = {
    User , Account
}