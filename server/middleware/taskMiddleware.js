const {taskValidator} = require("../utils/validation")

const taskMiddeware = (req,res,next) =>{
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const userId = req.user.userId;
    const isValidInput = taskValidator({title,description,priority,userId});
    if(!isValidInput.success){
        return res.status(411).json({error:isValidInput.error.issues.map(issue => issue.message).join(" and ")});
    }
    next();
}

module.exports = taskMiddeware;
