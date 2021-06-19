//init code
const mongoose = require("mongoose")

//user schema
const todolistSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    checked: {
        type: Boolean,
        default: false,
        trim: true,
    },
    userid: {
        type: String,
        required: true,
        trim: true,
    }
})

//user model
mongoose.model('todolist', todolistSchema)

//module exports
module.exports = mongoose.model('todolist')
