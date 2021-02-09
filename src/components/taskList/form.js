import React, { useState } from 'react'
import { removeTask, onDragOver } from './drag'
import { post } from './axiosMeth'

const Form = () => {

    const [newTask, setNewTask] = useState ('')
    const [newNote, setNewNote] = useState ('')
    const [priority, setPriority] = useState ('')

    const addTask = (event) => {
        event.preventDefault()
        const taskObject = {
            title: newTask,
            note: newNote,
            priority: priority
        }
        post(taskObject)
        //Clear inputs
        setNewTask('')
        setNewNote('')
        setPriority('')
    }

    const handleTaskChange = (event) => {
        setNewTask(event.target.value)
    }
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    const handlePriorityChange = (event) => {
        setPriority(event.target.value)
    }

    return (
        <>
        <form onSubmit={addTask}>
            <input
                className="taskTitleInput"
                value={newTask}
                onChange={handleTaskChange}
                placeholder='Task'
            />
            <input 
                className="taskNoteInput"
                value={newNote}
                onChange={handleNoteChange}
                placeholder='Notes'
                />
            <select 
                className="taskPrioritySelect"
                name="priority" 
                onChange={handlePriorityChange}
            >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <button type="submit">
                Add
            </button>
        </form>
        <i className="fa fa-trash" onDrop={removeTask} onDragOver={onDragOver} id='trash'></i>
        </>
    )
}  

export default Form