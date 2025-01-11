const Task = require("../model/Task")

const getTask = async(userId,taskId) =>{
    try{
        const task = await Task.findOne({
            userId:userId,
            _id:taskId
        });
        if(!task){
            return {
                "success":fasle,
                 "error":"no task found"
            }
        }
        return {
            "success":true,
            task:task
        };
    }
    catch(error){
        return {
            "success":fasle,
            "error":"Something went wrong while fetching tasks! "+ error
        }
    }
}


const getTasks = async(userId) =>{
    try{
        const tasks = await Task.find({userId:userId});
        if(!tasks){
            return {
                "success":fasle,
                 "error":"no tasks found"
            }
        }
        return {
            "success":true,
            tasks:tasks
        };
    }
    catch(error){
        return {
            "success":fasle,
            "error":"Something went wrong while fetching tasks! "+ error
        }
    }
}

const createTask = async({title,description,priority,subtasks,deadLine,userId}) =>{
    try{
        const newTask = await Task.create({title,description,priority,subtasks,deadLine,userId});
        return{
            "success":true,
            task:newTask
        }
    }
    catch(error){
        return {
            "success":false,
            "error":"task creation failed!"+ error
        };
    }
}

// still needs some work to be done
const updateTask = async(taskId,updates) =>{
    try{
        const updatedTask = await Task.findByIdAndUpdate(taskId,updates,{new:true})
        return {
            "success":true,
            updateTask:updateTask
        };
    }catch(error){
        return {
            "success":false,
            "error":"failed to update the task! "+error
        };
    }
}

const deleteTask = async(taskId) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(taskId);
        return {
            "success": true,
            deletedTask: deletedTask
        }
    }catch(error){
        return {
            "success": fasle,
            "error": "failed to delete the task! "+err
        }
    }
}



module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
