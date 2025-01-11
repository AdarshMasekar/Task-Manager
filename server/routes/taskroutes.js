const {Router} = require("express")
const router = Router();
const taskMiddeware = require("../middleware/taskMiddleware")
const authMiddleware = require("../middleware/authMiddleware");
const { getTask,getTasks,createTask,deleteTask,updateTask } = require("../controller/taskController");

router.get("/",authMiddleware,async(req,res)=>{
    const userId = req.user.userId;
    const tasks = await getTasks(userId);
    if(!tasks.success){
        return res.status(400).json({"error":tasks.error})
    }
    res.status(200).json(tasks.tasks)
})

router.get("/:taskId",authMiddleware,async(req,res)=>{
    const userId = req.user.userId;
    const taskId = req.params.taskId;
    const task = await getTask(userId,taskId);
    if(!task.success){
        return res.status(400).json({"error":task.error})
    }
    res.status(200).json(task.task)
})

router.post("/",authMiddleware,taskMiddeware,async(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const deadLine = req.body.deadLine;
    const subtasks = req.body.subtasks;
    const userId = req.user.userId;

    const newTask = await createTask({title,description,priority,subtasks,deadLine,userId});
    if(!newTask.success){
        return res.status(400).json({error:"task creation failed!"})
    }
    res.status(201).json(newTask.task)
})

router.patch("/:taskId",authMiddleware,async(req,res)=>{
    const taskId = req.params.taskId;
    const updates = req.body;
    const updatedTask = await updateTask(taskId,updates);
    if(!updatedTask.success){
        return res.status(400).json({error:updatedTask.error})
    }
    res.status(201).json(updatedTask)
})

router.delete("/:taskId",authMiddleware,async(req,res)=>{
    const taskId = req.params.taskId;
    const deletedTask = await deleteTask(taskId);
    if(!deletedTask.success){
        return res.status(400).json({error:deletedTask.error})
    }
    res.status(200).json(deletedTask.deletedTask)
})

module.exports = router
