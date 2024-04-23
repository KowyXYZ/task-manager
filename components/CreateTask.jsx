"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo'
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(task.name.length < 3) return
        if(task.name.length > 100) return

        setTasks((prev) => {
            const list = [...prev, task]

            localStorage.setItem("tasks", JSON.stringify(list))

            return list
        })

        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
    }   
  return (
    <div>
        <form className='gap-2 flex' onSubmit={handleSubmit}>
            <input value={task.name} className='py-2 px-4 rounded-2xl outline-none' type="text" placeholder='Task goes here...' onChange={(e) => setTask({...task, id: uuidv4(), name:e.target.value})}/>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-2xl'>Create</button>
        </form>
    </div>
  )
}

export default CreateTask