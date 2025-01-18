import { Link } from 'react-router-dom';
import { PlusIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTasks, selectTasks } from '../store/reducers/taskReducer';
import 'react-toastify/dist/ReactToastify.css';
import TaskCard from '../components/tasks/TaskCard';


export default function Homepage() {
    const { tasks } = useSelector(selectTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

  return (
    <div className="bg-background text-foreground mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Task List
        </h2>
        <Link to="/add-task" className='bg-primary flex items-center justify-center px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600'>
          <button className="px-4 py-2 bg-primary text-primary-foreground border-none">
            Add Task
          </button>
        <PlusIcon className="h-6 w-6 text-primary-foreground" />
        </Link>
      </div>
        <section>
            <div className="filters"></div>
            <div className="search"></div>
        </section>
        <div className="container mx-auto px-3 py-1">
            {tasks && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => {
                        return (
                            <TaskCard key={task._id} task={task}/>
                            );
                    })}
                </div>
            )}
        </div>
    </div>
  );
}
