import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskAsync, fetchTasks, selectTasks } from "../store/reducers/taskReducer";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Textarea,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {

    const { error } = useSelector(selectTasks);
    const navigate = useNavigate();
    const notify = () => toast("task added successfully!")

    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        subtasks: [{ title: "", status: "Pending" }],
        deadLine: "",
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        if (!e || !e.target) return;
        const { name, value } = e.target;

        setTask((prevTask) => {
            let updatedValue = value;
            if (name === "deadLine") {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    alert("Please select a future date or today.");
                    updatedValue = prevTask.deadLine;
                }
            }
            return { ...prevTask, [name]: updatedValue };
        });
    };

    const handleSubtaskChange = (index, field, value) => {
        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[index][field] = value;
        setTask((prevTask) => {
            const updatedTask = { ...prevTask, subtasks: updatedSubtasks };
            return updatedTask;
        });
    };
    const addSubtask = () => {
        setTask({
            ...task,
            subtasks: [...task.subtasks, { title: "", status: "Pending" }],
        });
    };

    const removeSubtask = (index) => {
        const updatedSubtasks = task.subtasks.filter((_, i) => i !== index);
        setTask({ ...task, subtasks: updatedSubtasks });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Task data:", task);
        dispatch(addTaskAsync(task));
        dispatch(fetchTasks());
        notify();
        navigate("/")

    };
    return (
        <Card className="max-w-2xl mx-auto mt-8 p-6 dark:bg-gray-800 dark:border-gray-700 glassmorphic">   <CardBody>
                <Typography variant="h4" color="blue-gray" className="text-center mb-6 dark:text-white">Add Task</Typography>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Typography variant="small" color="gray" className="font-medium dark:text-gray-300">Title</Typography>
                        <Input
                            type="text"
                            name="title"
                            color="blue"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Typography variant="small" color="gray" className="font-medium dark:text-gray-300">Description</Typography>
                        <Textarea
                            name="description"
                            color="blue"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            name="priority"
                            color="blue"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <Option value="Low">Low</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="High">High</Option>
                        </Select>

                    </div>
                    <div className="space-y-2">
                        <Typography variant="small" color="gray" className="font-medium dark:text-gray-300">Subtasks</Typography>
                        {task.subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <Input
                                    type="text"
                                    placeholder="Subtask Title"
                                    color="blue"
                                    className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={subtask.title}
                                    onChange={(e) =>
                                        handleSubtaskChange(index, "title", e.target.value)
                                    }
                                    required
                                />
                                <Select
                                    color="blue"
                                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={subtask.status}
                                    onChange={(value) =>
                                        handleSubtaskChange(index, "status", value)
                                    }
                                >
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Completed">Completed</Option>
                                </Select>
                                <Button
                                    variant="gradient"
                                    color="red"
                                    onClick={() => removeSubtask(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="text"
                            color="blue-gray"
                            onClick={addSubtask}
                        >
                            Add Subtask
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Typography variant="small" color="gray" className="font-medium dark:text-gray-300">Deadline</Typography>
                        <Input
                            type="date"
                            name="deadLine"
                            color="blue"
                             className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.deadLine}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" color="blue" className="w-full">Add Task</Button>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {error && Array.isArray(error) && error.map((err, index) => {
                        return <Typography key={index} variant="small" color="red">{err}</Typography>
                    })}
                     {error && typeof error === 'string' && (
                        <Typography variant="small" color="red">{error}</Typography>
                    )}
                </form>
            </CardBody>
        </Card>
    );
};
export default AddTask;
