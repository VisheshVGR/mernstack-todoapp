const Joi = require('joi')

const todoSchema = Joi.object({
    description : Joi.string().required().trim(),
    userid : Joi.string().required().trim(),
})

const userSchema = Joi.object({
    firstName : Joi.string().required().trim(),
    lastName : Joi.string().required().trim(),
    email : Joi.string().trim().lowercase().required().email(),
    password : Joi.string().required().trim(),

})
module.exports = {
    todoSchema, userSchema, 
}