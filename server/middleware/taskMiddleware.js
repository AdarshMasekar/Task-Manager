const {taskValidator} = require("../utils/validation")

const taskMiddeware = (req,res,next) =>{
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const subtasks = req.body.subtasks;
    const deadLine = req.body.deadLine;
    const userId = req.user.userId;
    const isValidInput = taskValidator({title,description,priority,subtasks,deadLine,userId});
    if(!isValidInput.success){
        return res.status(411).json(isValidInput.error.issues.map(issue => issue.message));
    }
    next();
}

module.exports = taskMiddeware;
