const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://purnashankar3:zr0W7mugdUtwGKHk@cluster0.uti62tx.mongodb.net/paytm-db')

const User_Schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const User =  mongoose.model('User',User_Schema);

const Account_Schema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //reference to user model
        ref:'User'
    },
    balance:{
        type:Number,
        required:true
    }

})

const Account = mongoose.model("Account",Account_Schema)


module.exports = {
    User,
    Account
}

