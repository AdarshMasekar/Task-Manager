import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateTaskAsync, selectTasks } from "../store/reducers/taskReducer";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
    Textarea
} from "@material-tailwind/react";

const EditTask = () => {
    const { taskId } = useParams();
    const { state } = useLocation();
    const { task: initialTask } = state || { task: null };
    const { error } = useSelector(selectTasks);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [task, setTask] = useState(() => ({
        title: "",
        description: "",
        priority: "Medium",
        subtasks: [{ title: "", status: "Pending" }],
        deadLine: "",
    }));

    useEffect(() => {
        if (initialTask) {
            setTask({
                ...initialTask,
                deadLine: initialTask.deadLine ? new Date(initialTask.deadLine).toISOString().split('T')[0] : '',
            });
        }
    }, [initialTask]);

    const handleChange = (e) => {
        if (!e || !e.target) return;
        const { name, value } = e.target;
        if (name === "deadLine") {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                alert("Please select a future date or today.");
                return;
            }
        }
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };
    const handleSubtaskChange = (index, field, value) => {
        const updatedSubtasks = [...task.subtasks];
        updatedSubtasks[index][field] = value;
        setTask((prevTask) => ({ ...prevTask, subtasks: updatedSubtasks }));
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
        dispatch(updateTaskAsync({ taskId, updates: task }));
        navigate("/");
    };

    return (
        <Card className="max-w-2xl mx-auto mt-8 p-6 dark:bg-gray-800 dark:border-gray-700">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="text-center mb-6 dark:text-white">Edit Task</Typography>
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
                        <Typography variant="small" color="gray" className="font-medium dark:text-gray-300">Priority</Typography>
                        <Select
                            name="priority"
                            color="blue"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.priority}
                            onChange={(value) =>
                                setTask((prevTask) => ({ ...prevTask, priority: value }))
                            }
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
                                    onChange={handleChange}
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
                    <Button type="submit" color="blue" className="w-full">Update Task</Button>
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
}
export default EditTask;
