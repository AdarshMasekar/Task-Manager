import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-toastify';
import { removeTaskAsync } from '../../store/reducers/taskReducer';
import { useDispatch } from 'react-redux';

let TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const notify = () => toast("task deleted successfully");

    const completedSubtasks = task.subtasks ? task.subtasks.filter(task => task.status === "Completed").length : 0;
    const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
    const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

    const handleDelete = (taskId) => {
        dispatch(removeTaskAsync(taskId));
        notify();
    };

    return (
        <div className="bg-card text-card-foreground border border-glass-border backdrop-blur-md rounded-lg shadow-lg p-4 mb-4">
            <div className='flex flex-col space-y-3'>
                <div
                    className={`w-fit rounded-md px-2 py-1 flex items-center ${
                        task.priority === 'High' ? 'bg-red-200 text-red-900' :
                        task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-green-200 text-green-900'
                    }`}
                >
                    <FlagIcon className="h-5 w-5 mr-1 inline-block" />
                    <span className="text-sm">{task.priority}</span>
                </div>
                <div className="dark:text-white font-bold text-xl">
                    {task.title.length <= 15 ? task.title : `${task.title.substring(0, 15)}...`}
                </div>
                <div className="dark:text-gray-300 text-base mb-4">
                    {task.description.length <= 25 ? task.description : `${task.description.substring(0, 25)}...`}
                </div>
                <div className="flex justify-between items-center mb-2">
                    <div className="progress flex gap-2 items-center">
                        {completedSubtasks === totalSubtasks ? (
                            <CheckIcon className="h-5 w-5 bg-green-500 rounded-full text-white p-1" />
                        ) : (
                            <ListBulletIcon className="h-5 w-5 text-gray-500" />
                        )}
                        <div className="dark:text-gray-400 text-sm">
                            Progress
                        </div>
                    </div>
                    <div className="dark:text-gray-400 text-sm">
                        {completedSubtasks} / {totalSubtasks}
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            task.priority === 'High' ? 'bg-red-500' :
                            task.priority === 'Medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                        }`}></div>
                    </div>
                </div>
                <div className="flex items-center bg-secondary rounded-md w-fit px-2 py-1 mb-2 gap-2">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                    <div className="dark:text-gray-400 text-sm">
                        Due to :{' '}
                        {new Date(task.deadLine).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </div>
                </div>
                {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-2">
                        <details>
                            <summary className="cursor-pointer">Subtasks</summary>
                            <ul className="mt-2">
                                {task.subtasks.map((stask) => (
                                    <li key={stask._id} className="p-0 mb-1 flex justify-between items-center">
                                        <div className="dark:text-gray-200 text-sm">
                                            {stask.title.length <= 15 ? stask.title : `${stask.title.substring(0, 15)}...`}
                                        </div>
                                        <div className={stask.status === 'Completed' ? 'bg-blue-200 text-blue-900 w-fit rounded-md px-2 py-1' : 'bg-gray-200 text-gray-900 w-fit rounded-md px-2 py-1'}>
                                            {stask.status}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                )}
                <div className="action-items flex justify-between">
                    <Link to={`/edit-task/${task._id}`} state={{ task: { task } }}>
                        <button className="flex items-center gap-2 mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                            Edit
                            <PencilIcon className="h-4 w-4" />
                        </button>
                    </Link>
                    <button onClick={() => handleDelete(task._id)} className="flex items-center gap-2 mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                        Delete
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

TaskCard = React.memo(TaskCard);

export default TaskCard;
