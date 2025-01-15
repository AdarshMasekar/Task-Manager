import { useState } from "react";
import "./Tasks.css"; // Add this line for CSS import.
import { addTaskAsync, fetchTasks } from "../reducers/taskReducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../reducers/userReducer";

export default function Tasks() {
  const { user } = useSelector(userSelector);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    subtasks: [{ title: "", status: "Pending" }],
    deadLine: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, field, value) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index][field] = value;
    setTask({ ...task, subtasks: updatedSubtasks });
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
  };
  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Add Task</h2>
      <form className="tasks-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            className="form-select"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Subtasks</label>
          {task.subtasks.map((subtask, index) => (
            <div key={index} className="subtask">
              <input
                type="text"
                placeholder="Subtask Title"
                className="form-control subtask-input"
                value={subtask.title}
                onChange={(e) =>
                  handleSubtaskChange(index, "title", e.target.value)
                }
                required
              />
              <select
                className="form-select subtask-select"
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
                className="btn btn-danger subtask-remove"
                onClick={() => removeSubtask(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary add-subtask-btn"
            onClick={addSubtask}
          >
            Add Subtask
          </button>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadLine"
            className="form-control"
            value={task.deadLine}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}
