import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { tasksAtom,deleteTask } from '../../atoms/taskState';

const Todo = ({todo}) => {
    const [showsubtasks,setShowsubtasks] = useState(false);
    const [tasks,setTasks] = useRecoilState(tasksAtom)

  return (
    <div className='p-4 border border-gray-500 bg-gray-200 rounded-lg col-span-3'>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>{todo.priority}</p>
        <p>{todo.deadLine}</p>
        {showsubtasks ?
            <p>{todo.subtasks.map(subtask =>{
                return <p>{subtask.title}-{subtask.status}</p>
            })}</p> : <button onClick={()=>setShowsubtasks(!showsubtasks)}>view subtasks</button>
        }
        {showsubtasks ? <button onClick={()=>setShowsubtasks(!showsubtasks)}>hide subtasks</button> :""
        }
        <button onClick={async() =>{
            const response = await deleteTask(todo._id,{get:()=>tasks,set:setTasks});
            if(response.success){
                console.log("task deleted successfully!")
            }else{
                console.log(response.error)
            }
        }}>delete task</button>
    </div>
  )
}

export default Todo
