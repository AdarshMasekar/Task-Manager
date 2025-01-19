const express = require('express');
const app = express();
const TaskRoutes = require("./routes/taskroutes")
const UserRoutes = require("./routes/userroutes")
const cors  = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use("/api/tasks",TaskRoutes)
app.use("/api/user",UserRoutes)


app.get("/",(req,res)=>{
    res.json({msg:"welcome to task manager backend"})
})

app.use((err,req,res,next)=>{
    if (err) {
        console.error("Error occurred:", err.stack);
        // Check if it's a 404 or a general server error
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    } else {
        next();
    }
})

module.exports = app;
