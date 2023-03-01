//init code
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const database = require("./database")
const todoitemController = require("./controllers/todolist")
const userController = require("./controllers/userlist")
const cookies = require("cookie-parser")


const app = express()
const port = process.env.PORT || 5000


//middleware setup
app.use(cookies())
app.use(cors({ credentials: true, origin: `http://localhost:3000` }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/todoitem', todoitemController)
app.use('/api/user', userController)


// Showing build file
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./frontend/build"))
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}


//start server
app.listen(port, () => {
    console.log(`Server running at port : ${port}`)
})
