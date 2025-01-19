import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CircleCheckBig, FlagTriangleRight, ListTodo, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeTaskAsync } from '../../store/reducers/taskReducer';

const TaskCard = React.memo(({ task }) => {
  const dispatch = useDispatch();
  const notify = () => toast("Task deleted successfully");

  const completedSubtasks = task.subtasks?.filter(task => task.status === "Completed").length ?? 0;
  const totalSubtasks = task.subtasks?.length ?? 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const handleDelete = (taskId) => {
    dispatch(removeTaskAsync(taskId));
    notify();
  };

  const priorityStyles = {
    High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 ring-rose-500/20',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-amber-500/20',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-emerald-500/20',
  };

  const progressBarStyles = {
    High: 'bg-rose-500 dark:bg-rose-400',
    Medium: 'bg-amber-500 dark:bg-amber-400',
    Low: 'bg-emerald-500 dark:bg-emerald-400',
  };

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-200 dark:border-gray-800">
      <div className={`absolute top-0 right-0 w-20 h-20 -translate-x-10 translate-y-[-40px] rotate-45 ${progressBarStyles[task.priority]} opacity-10`} />

      <div className="flex flex-col space-y-4">

        <div className={`w-fit rounded-full px-3 py-1 flex items-center gap-1.5 ring-1 ${priorityStyles[task.priority]}`}>
          <FlagTriangleRight className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{task.priority}</span>
        </div>
        <div>
          <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
            {task.title.length <= 25 ? task.title : `${task.title.substring(0, 25)}...`}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {task.description.length <= 35 ? task.description : `${task.description.substring(0, 35)}...`}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {completedSubtasks === totalSubtasks && totalSubtasks > 0 ? (
                <CircleCheckBig className="h-4 w-4 text-emerald-500" />
              ) : (
                <ListTodo className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
              {completedSubtasks}/{totalSubtasks}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className={`h-full rounded-full transition-all duration-300 ${progressBarStyles[task.priority]}`}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            Due: {new Date(task.deadLine).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        {task.subtasks && task.subtasks.length > 0 && (
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-medium text-gray-600 dark:text-gray-400">
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              Subtasks ({completedSubtasks}/{totalSubtasks})
            </summary>
            <ul className="mt-3 space-y-2 pl-6">
              {task.subtasks.map((stask) => (
                <li key={stask._id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stask.title.length <= 20 ? stask.title : `${stask.title.substring(0, 20)}...`}
                  </span>
                  <span className={`px-2 py-1 rounded-xl text-xs font-medium ${
                    stask.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {stask.status}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}
        <div className="flex gap-3 pt-2">
          <Link
            to={`/edit-task/${task._id}`}
            state={{ task: { task } }}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2 rounded-xl transition-colors duration-200 ">
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </Link>
          <button
            onClick={() => handleDelete(task._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskCard;
