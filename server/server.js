const app = require("./app")
const {connectDB} = require("./config/db")
const {PORT} = require("./config/dotenv")

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}).catch(error =>{
    console.log(error)
})
