import React,{useEffect} from 'react'
import Todo from '../components/ui/Todo'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { fetchTasksSelector,tasksAtom } from '../atoms/taskState';


const Dashboard = () => {
    const [tasks,setTasks] = useRecoilState(tasksAtom);
    const tasksLoadable = useRecoilValueLoadable(fetchTasksSelector)


    useEffect(()=>{
        if(tasksLoadable.state ===  "hasValue"){
            setTasks(tasksLoadable.contents)
        }
    },[tasks,setTasks,tasksLoadable])

    return (
    <div className='grid grid-cols-12 gap-5 mt-10'>
    {tasksLoadable.state === 'loading' && <p>Loading tasks...</p>}
      {tasksLoadable.state === 'hasError' && (
        <p style={{ color: 'red' }}>Error: {tasksLoadable.contents.message}</p>
      )}
        {Array.isArray(tasks) && tasks.map(todo =>{
            return <Todo todo={todo} key={todo.title}/>
        })}
    </div>
    )
}

export default Dashboard
