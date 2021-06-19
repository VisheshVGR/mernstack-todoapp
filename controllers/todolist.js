//init code
const router = require('express').Router();
const DbTodoitem = require('./../models/todolist')
const Dbuser = require('./../models/userlist')
const { todoSchema } = require('../models/validation_schema')
const Joi = require('joi')

//middleware setup


//router goes here
router.post(
    "/getAll",
    async (req, res) => {
        try {
            const result = await DbTodoitem.find(req.body)
            console.log("DB previous item restored")

            res.send(result)
        } catch (error) {
            console.log(error)
        }

    }
)

router.post(
    "/createNew",
    async (req, res) => {
        try {
            await todoSchema.validateAsync(req.body)

            // DO THIS

            const allItems = await DbTodoitem.find({userid : req.body.userid})
            allItems.forEach((item)=>{
                if(item.description === req.body.description){
                    throw { "type": "unique", "message": "Item already exists" }
                }
            })

            //validation succesful
            const result = await new DbTodoitem(req.body).save()

            const user = await Dbuser.findById({ _id: req.body.userid })
            await Dbuser.updateOne({ _id: req.body.userid }, { todoitems: user.todoitems.concat({ todoitem: result._id }) })

            console.log("DB new item : " + result)

            res.send(result)
        } catch (error) {
            console.log(error)
            if (error.isJoi) {
                error.details[0].message = "Todo item cannot be empty"
                return res.status(422).send(error.details[0])
            }
            if (error.type === "unique") {
                return res.status(422).send(error)
            }
            res.status(520).send("Something went wrong")

        }

    }
)



router.post(
    "/delete",
    async (req, res) => {
        try {
            const result = await DbTodoitem.findByIdAndDelete(req.body)

            console.log("DB deleted item : " + result)

            res.send(result)
        } catch (error) {
            console.log(error)
        }


    }
)

router.post(
    "/toggle",
    async (req, res) => {
        try {
            const checkedStatus = await DbTodoitem.findById(req.body)

            const result = await DbTodoitem.updateOne(req.body, {
                $set: {
                    checked: !(checkedStatus.checked)
                }
            })

            res.send(!(checkedStatus.checked))
        } catch (error) {
            console.log(error)
        }


    }
)
//module exports
module.exports = router