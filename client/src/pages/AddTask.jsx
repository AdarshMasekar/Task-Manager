import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskAsync, fetchTasks, selectTasks } from "../store/reducers/taskReducer";
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
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-card text-card-foreground rounded-2xl shadow-md glassmorphic">
            <div>
                <h4 className="text-xl font-medium text-center mb-6">Add Task</h4>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Priority</label>
                        <select
                            name="priority"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.priority}
                            onChange={(e) =>
                                setTask((prevTask) => ({ ...prevTask, priority: e.target.value }))
                            }
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Subtasks</label>
                        {task.subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Subtask Title"
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={subtask.title}
                                    onChange={(e) =>
                                        handleSubtaskChange(index, "title", e.target.value)
                                    }
                                    required
                                />
                                <select
                                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={subtask.status}
                                    onChange={(e) =>
                                        handleSubtaskChange(index, "status", e.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-colors"
                                    onClick={() => removeSubtask(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={addSubtask}
                        >
                            Add Subtask
                        </button>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Deadline</label>
                        <input
                            type="date"
                            name="deadLine"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={task.deadLine}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        Add Task
                    </button>
                    <ToastContainer />
                    {error && Array.isArray(error) && error.map((err, index) => {
                        return <p key={index} className="text-sm text-red-500">{err}</p>
                    })}
                    {error && typeof error === 'string' && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};
export default AddTask;
