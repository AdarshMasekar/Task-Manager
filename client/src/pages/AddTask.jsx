import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskAsync, fetchTasks, selectTasks } from "../store/reducers/taskReducer";
import { toast } from 'react-toastify';

const AddTask = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(addTaskAsync(task));
    if(response.payload){
        toast.success("Task added successfully!");
        navigate("/");
    }
    else{
        toast.error("Failed to add task!");
    }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create New Task
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Enter task title"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description
              </label>
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                placeholder="Enter task description"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Priority
              </label>
              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 sm:mb-0">
                  Subtasks
                </label>
                <button
                  type="button"
                  onClick={addSubtask}
                  className="inline-flex items-center text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Add Subtask
                </button>
              </div>

              <div className="space-y-3">
                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={subtask.title}
                      onChange={(e) =>
                        setTask({
                          ...task,
                          subtasks: task.subtasks.map((st, i) =>
                            i === index ? { ...st, title: e.target.value } : st
                          ),
                        })
                      }
                      placeholder="Subtask title"
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                    <select
                      value={subtask.status}
                      onChange={(e) =>
                        setTask({
                          ...task,
                          subtasks: task.subtasks.map((st, i) =>
                            i === index ? { ...st, status: e.target.value } : st
                          ),
                        })
                      }
                      className="w-full sm:w-32 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSubtask(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full px-3 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Deadline
              </label>
              <input
                type="date"
                value={task.deadLine}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (selectedDate >= today) {
                    setTask({ ...task, deadLine: e.target.value });
                  } else {
                    alert("Please select a future date or today.");
                  }
                }}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {Array.isArray(error) ? error.join(", ") : error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-300 hover:bg-blue-400 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/80 px-4 py-2 rounded-xl transition-colors duration-200"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
