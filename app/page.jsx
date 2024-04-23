"use client"

import CreateTask from '@/components/CreateTask'
import ListTasks from '@/components/ListTasks'
import React, { useEffect, useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const page = () => {

    const [tasks, setTasks] = useState([
      {
        id: '111',
        name: 'Give a Star',
        status: 'todo'
      }
    ])

    useEffect(() => {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    }, [])
    

  return (
    <DndProvider backend={HTML5Backend}>
    <div className='w-full py-24'>
        <div className='flex justify-center flex-col gap-12 items-center container mx-auto'>
             <h1 className='uppercase text-[32px] font-black'>Task Manager</h1>

            <CreateTask tasks={tasks} setTasks={setTasks}/>
            <ListTasks tasks={tasks} setTasks={setTasks}/>
           
        </div>
    </div>
    </DndProvider>
  )
}

export default page