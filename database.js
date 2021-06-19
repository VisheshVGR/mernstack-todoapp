//init code
const mongoose = require("mongoose")
const db_url = process.env.DB_URL_ONLINE

//connection code
const connect = async () => {
    try {
        await mongoose.connect(
            db_url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            },
            console.log("DB Connect Success...!!!")
        )
    }
    catch {
        (err) => console.log(err)
    }
}
connect()