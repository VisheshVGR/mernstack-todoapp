//init code
const router = require('express').Router()
const Dbuser = require('./../models/userlist')
const DbTodoitem = require('./../models/todolist')
const { userSchema } = require('../models/validation_schema')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')



//middleware setup


//router goes here
router.get(
    "/userlogin",
    authenticate,
    (req, res) => {
        res.send(req.rootUser)
    }
)


router.post(
    "/createNew",
    async (req, res) => {
        try {
            await userSchema.validateAsync(req.body)

            const dbItem = await Dbuser.find({ email: req.body.email })
            if (dbItem[0] !== undefined) {
                throw { "type": "unique", "message": "Email address already registered" }
            }

            //hashing password
            req.body.password = await bcrypt.hash(req.body.password, 10)

            const result = await new Dbuser(req.body).save()

            console.log("DB new user : " + result)

            res.send(result)
        } catch (error) {
            console.log(error)
            if (error.isJoi) {
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
    "/login",
    async (req, res) => {
        try {
            const dbItem = await Dbuser.find({ email: req.body.email })
            if (dbItem[0] === undefined) {
                throw { "type": "invalid_cred", "message": "Invalid credentials." }
            }

            if (!(await bcrypt.compare(req.body.password, dbItem[0].password))) {
                throw { "type": "invalid_cred", "message": "Invalid credentials." }
            }

            const token = await dbItem[0].generateAuthToken();

            res.cookie("jwtoken", token, { maxAge: 86400000 })

            res.send("Login succesfull")

        } catch (error) {
            console.log(error)
            if (error.type === "invalid_cred") {
                return res.status(422).send(error)
            }
            res.status(520).send("Something went wrong")
        }
    }
)

router.get(
    "/logout",
    (req, res) => {
        try {
            res.clearCookie('jwtoken', { path: '/' })
            res.send("User Logout")
        } catch (error) {
            console.log(error)
            res.status(520).send("something went wrong")
        }
    }
)

router.post(
    "/forgetpass",
    async (req, res) => {
        try {
            const dbItem = await Dbuser.find(req.body)
            if (dbItem[0] === undefined) {
                throw { "type": "invalid_email", "message": "The email address you entered isn't connected to an account." }
            }
            return res.send(dbItem[0])
        } catch (error) {
            console.log(error)
            if (error.type === "invalid_email") {
                return res.status(422).send(error)
            }
            res.status(520).send("Something went wrong")
        }
    }
)

router.post(
    "/userdelete",
    async (req, res) => {
        try {
            const result = await Dbuser.findByIdAndDelete(req.body)
            const result2 = await DbTodoitem.deleteMany({ userid: req.body._id })
            console.log("DB deleted item : " + result2)

            res.send("User Deleted")
        } catch (error) {
            console.log(error)
        }


    }
)

router.post(
    "/update",
    async (req, res) => {
        try {
            await userSchema.validateAsync({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            })

            const result = await Dbuser.updateOne({ _id: req.body._id }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                }
            })
            res.send("User Updated")
        } catch (error) {
            console.log(error)
            if (error.isJoi) {
                return res.status(422).send(error.details[0])
            }
        }


    }
)


module.exports = router