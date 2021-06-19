const jwt = require("jsonwebtoken")
const User = require("../models/userlist")

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootUser) { throw new Error("User not found") }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        next()

    } catch (error) {
        res.status(401).send("Unauthorized : No token provided")
        console.log("Unauthorized : No token provided")
    }
}

module.exports = Authenticate