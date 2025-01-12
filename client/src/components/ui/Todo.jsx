import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { tasksAtom,deleteTask } from '../../atoms/taskState';
import { cn } from '../../lib/utils';

const Todo = ({todo}) => {
    const [showsubtasks,setShowsubtasks] = useState(false);
    const [tasks,setTasks] = useRecoilState(tasksAtom)
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

  return (
    <div className='p-4 border border-gray-500 bg-gray-200 rounded-lg col-span-3'>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>{todo.priority}</p>
        <p>{todo.deadLine}</p>
        {showsubtasks ?
            <p>{todo.subtasks.map((subtask,index) =>{
                return < p key={index}>{subtask.title}-{subtask.status}</p >
            })}</p> : <button onClick={()=>setShowsubtasks(!showsubtasks)}>view subtasks</button>
        }
        {showsubtasks ? <button onClick={()=>setShowsubtasks(!showsubtasks)}>hide subtasks</button> :""
        }
        <button
            disabled={isDeleting}
            onClick={async() =>{
                setIsDeleting(true);
                setDeleteError(null);
                const response = await deleteTask(todo._id,{get:()=>tasks,set:setTasks});
                if(response.success){
                    console.log("task deleted successfully!")
                }else{
                    console.log(response.error)
                    setDeleteError(response.error);
                }
                setIsDeleting(false);
            }}
        >
            {isDeleting ? "Deleting..." : "delete task"}
        </button>
        {deleteError && <p className="text-red-500">{deleteError}</p>}
    </div>
  )
}

export default Todo
