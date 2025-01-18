import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateTaskAsync, selectTasks } from "../store/reducers/taskReducer";

const EditTask = () => {
    const { taskId } = useParams();
    const { state } = useLocation();
    const { task: initialTask } = state.task || { task: null };
    const { error } = useSelector(selectTasks);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "Medium",
        subtasks: [{ title: "", status: "Pending" }],
        deadLine: "",
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTaskAsync({ taskId, updates: task })).unwrap();
            navigate("/");
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-card text-card-foreground rounded-2xl shadow-md glassmorphic">
            <div className="p-4">
                <h4 className="text-center mb-6">Edit Task</h4>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Description</label>
                        <textarea
                            name="description"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={task.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Priority</label>
                        <select
                            name="priority"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={task.priority}
                            onChange={(e) => setTask((prevTask) => ({ ...prevTask, priority: e.target.value }))}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Subtasks</label>
                        {task.subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Subtask Title"
                                    className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 rounded-md"
                                    value={subtask.title}
                                    onChange={(e) => handleSubtaskChange(index, 'title', e.target.value)}
                                    required
                                />
                                <select
                                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 rounded-md"
                                    value={subtask.status}
                                    onChange={(e) => handleSubtaskChange(index, 'status', e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <button
                                    type="button"
                                    className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                    onClick={() => removeSubtask(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            onClick={addSubtask}
                        >
                            Add Subtask
                        </button>
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium">Deadline</label>
                        <input
                            type="date"
                            name="deadLine"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full p-2 rounded-md"
                            value={task.deadLine}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-primary text-primary-foreground w-full px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Update Task</button>
                    {error && Array.isArray(error) && error.map((err, index) => (
                        <p key={index} className="text-destructive">{err}</p>
                    ))}
                    {error && typeof error === 'string' && (
                        <p className="text-destructive">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditTask;
