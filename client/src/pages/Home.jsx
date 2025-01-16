import ViewTasks from '../components/tasks/Tasks';
import { Link } from 'react-router-dom';
import { PlusIcon } from "@heroicons/react/16/solid";

export default function Homepage() {
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Task List
        </h2>
        <Link to="/add-task" className='bg-blue-500 flex items-center justify-center px-2 py-1 rounded-md'>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800">
            Add Task
          </button>
        <PlusIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
      <ViewTasks />
    </div>
  );
}
