import React, { useEffect } from 'react'
import Todo from '../components/ui/Todo'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { fetchTasksSelector, tasksAtom } from '../atoms/taskState';
import { cn } from '../lib/utils';

const Dashboard = () => {
    const [tasks, setTasks] = useRecoilState(tasksAtom);
    const tasksLoadable = useRecoilValueLoadable(fetchTasksSelector)


    useEffect(() => {
        if (tasksLoadable.state === "hasValue") {
            setTasks(tasksLoadable.contents)
        }
    }, [tasks, setTasks, tasksLoadable])

    return (
        <div className={cn('grid grid-cols-12 gap-5 mt-10')}>
            {tasksLoadable.state === 'loading' && <p>Loading tasks...</p>}
            {tasksLoadable.state === 'hasError' && (
                <p className="text-red-500">Error: {tasksLoadable.contents.message}</p>
            )}
            {tasks.map(todo => {
                return <Todo todo={todo} key={todo._id} />
            })}
        </div>
    )
}

export default Dashboard
