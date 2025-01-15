import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchTasks, taskSelector, removeTaskAsync } from '../../store/reducers/taskReducer';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardBody,
    Typography,
    Progress,
    List,
    ListItem,
    Chip,
    Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { PencilIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser } from '../../store/reducers/userReducer';


const Tasks = () => {
    const { tasks } = useSelector(taskSelector);
    const dispatch = useDispatch();
    const notify = () => toast("task deleted successfully");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [logoutUser]);

    const handleDelete = (taskId) => {
        dispatch(removeTaskAsync(taskId));
        notify();
    };


    return (
        <div className="container mx-auto mt-8 p-4">
            {tasks && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(({ _id, title, description, priority, subtasks, deadLine }) => {
                        const completedSubtasks = subtasks ? subtasks.filter(task => task.status === "Completed").length : 0;
                        const totalSubtasks = subtasks ? subtasks.length : 0;
                        const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
                        return (
                            <Card key={_id} className="dark:bg-gray-800 dark:border-gray-700 shadow-md ">
                                <CardBody>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col items-start gap-2">
                                            <Chip
                                                value={priority}
                                                icon={<FlagIcon className="h-6 w-6 pe-1 pb-1 me-1 mb-1" />}
                                                variant="ghost"
                                                color={
                                                    priority === "High"
                                                        ? "red"
                                                        : priority === "Medium"
                                                            ? "yellow"
                                                            : "green"
                                                }
                                            />
                                            <Typography variant="h4" color="blue-gray" className="dark:text-white font-bold">
                                                {title}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography variant='h6' className=" dark:text-gray-300 text-base mb-4">
                                        {description}
                                    </Typography>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="progress flex gap-2">
                                            {completedSubtasks === totalSubtasks ?
                                                <CheckIcon className="h-6 w-6 bg-green-500 rounded-full text-white p-1" /> :
                                                <ListBulletIcon className="h-6 w-6 text-gray-500" />
                                            }
                                            <Typography variant="h4" color="gray" className=" dark:text-gray-400 text-sm">
                                                Progress
                                            </Typography>
                                        </div>
                                        <Typography variant="h6" color="gray" className="dark:text-gray-400 text-sm">
                                            {completedSubtasks} / {totalSubtasks}
                                        </Typography>
                                    </div>
                                    <Progress value={progress} color={
                                        priority === "High"
                                            ? "red"
                                            : priority === "Medium"
                                                ? "yellow"
                                                : "green"
                                    } className="mb-4 shadow-inner shadow-gray-300 inset-1 h-2" />

                                    <div className="flex items-center bg-secondary rounded-md w-fit px-2 py-1 mb-2 gap-2">

                                        <CalendarDaysIcon className="h-6 w-6 text-gray-500" />
                                        <Typography variant="h3" color="gray" className="dark:text-gray-400 text-sm">
                                            Due to : {new Date(deadLine).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                    {subtasks && subtasks.length > 0 && (
                                        <div className="mt-2">
                                            <details>
                                                < List className="mt-2">
                                                    {subtasks.map((stask) => (
                                                        <ListItem key={stask._id} className="p-0 mb-1 flex justify-between items-center border-b dark:border-gray-700">
                                                            <Typography color="gray" className="dark:text-gray-200 text-sm">
                                                                {stask.title}
                                                            </Typography>
                                                            <Chip
                                                                value={stask.status}
                                                                variant="ghost"
                                                                color={stask.status === "Completed" ? "blue" : "gray"}
                                                                size="sm"
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </details>
                                        </div>
                                    )}
                                    <div className="action-items flex justify-between">
                                        <Link to={`/edit-task/${_id}`} state={{ task: { _id, title, description, priority, subtasks, deadLine } }} >
                                            <Button variant="gradient" color="blue" className="flex items-center gap-4 mt-4">
                                                Edit
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                                variant="gradient"
                                                color="red"
                                                onClick={() => handleDelete(_id)}
                                                className="flex items-center gap-4 mt-4">
                                                Delete
                                                <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardBody>
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
                            </Card>

                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Tasks;
