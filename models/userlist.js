//init code
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")

//user schema
const userlistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    todoitems: [
        {
            todoitem:{
                type: String,
                required: true
            }
        }
    ]
})

// generating token
userlistSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}


//user model
mongoose.model('userlist', userlistSchema)

//module exports
module.exports = mongoose.model('userlist')