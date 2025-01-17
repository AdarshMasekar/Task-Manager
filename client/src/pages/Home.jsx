import ViewTasks from '../components/tasks/Tasks';
import { Link } from 'react-router-dom';
import { PlusIcon } from "@heroicons/react/16/solid";

export default function Homepage() {
  return (
    <div className="bg-background mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Task List
        </h2>
        <Link to="/add-task" className='bg-primary flex items-center justify-center px-2 py-1 rounded-lg'>
          <button className="px-4 py-2 bg-primary text-white border-none">
            Add Task
          </button>
        <PlusIcon className="h-6 w-6 bg-primary text-white" />
        </Link>
      </div>
      <ViewTasks />
    </div>
  );
}
