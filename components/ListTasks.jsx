"use client"

import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const ListTasks = ({tasks, setTasks}) => {

    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setClosed] = useState([])

    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === 'todo')
        const fProgress = tasks.filter((task) => task.status === 'inprogress')
        const fClosed = tasks.filter((task) => task.status === 'closed')

        setTodos(fTodos)
        setInProgress(fProgress)
        setClosed(fClosed)
    }, [tasks])

    const statuses = ['todo', 'inprogress', 'closed']

  return (
    <div>
        <div className='flex gap-12 justify-center items-start'>
            {statuses.map((status, index) => {
                return (
                    <Section status={status} key={index} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed}/>
                )
            })}
        </div>
    </div>
  )
}

export default ListTasks

const Section = ({status, key, tasks, setTasks, todos, inProgress , closed}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

    let text = 'todo'
    let bg = 'bg-slate-500'
    let tasksToMap = todos

    if(status === 'inprogress') {
        text = 'In Progress'
        bg = 'bg-purple-500'
        tasksToMap = inProgress
    }

    if(status === 'closed') {
        text = 'Closed'
        bg = 'bg-green-500'
        tasksToMap = closed
    }

    const addItemToSection = (id) => {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if(t.id === id) {
                    return {...t, status: status}
                }
                return t
            })

            localStorage.setItem('tasks', JSON.stringify(mTasks))

            return mTasks
        })
    }

    return (
        <div ref={drop} className={`w-64 gap-4 p-2 flex flex-col ${isOver ? 'bg-gray-600 rounded-2xl' : ''}`}>
            <Header text={text} bg={bg} count={tasksToMap.length}/> 
            {tasksToMap.length > 0 && tasksToMap.map((task, index) => {
                return(
                    <SingleTask key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>
                )
            })}
        </div>
    )
}

const Header = ({text, bg, count}) => {
    return (
        <div className={`${bg} flex items-center px-4 gap-5 py-2 uppercase rounded-xl`}>
            <h1 className='text-[18px] '>{text}</h1>
            <h2 className='bg-[#fff] text-[#000] py-1 px-3 rounded-full'>{count}</h2>
        </div>
    )
}

const SingleTask = ({task, tasks, setTasks}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    const handleRemove = (id) => {
        const fTasks = tasks.filter(task => task.id !== id)
        localStorage.setItem('tasks', JSON.stringify(fTasks))
        setTasks(fTasks)
    }

    return (
        <div ref={drag} className={` relative p-4 bg-[#121212] text-[#fff] shadow-md rounded-md ${isDragging ? 'opacity-25' : 'opacity-100'} cursor-grab`}>
            <p>{task.name}</p>
            <button className='absolute bottom-3.5 right-1 text-slate-400' onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}