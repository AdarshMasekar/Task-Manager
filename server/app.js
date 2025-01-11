const express = require('express');
const app = express();
const TaskRoutes = require("./routes/taskroutes")
const UserRoutes = require("./routes/userroutes")

app.use(express.json());
app.use("/api/tasks",TaskRoutes)
app.use("/api/user",UserRoutes)

app.get("/",(req,res)=>{
    res.json({msg:"hello"})
})

app.use((err,req,res,next)=>{
    if (err) {
        // Log the error
        console.error("Error occurred:", err.stack);
        // Check if it's a 404 or a general server error
        if (err.status === 404) {
            res.status(404).json({
                success: false,
                message: "Not Found"
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } else {
        next();
    }
})

module.exports = app;
