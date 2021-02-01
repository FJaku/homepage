import React, { useState, useEffect } from 'react'
import axios from 'axios'
import store from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'

const TaskList = () => {

    //Load task list from local server
    useEffect(() => {
        axios
        .get('http://localhost:3001/tasks')
        .then(response => {
            dispatch({ type: 'LISTENTASKS', payload: response.data})
            dispatch({ type: 'ISLOADED' })
        })
    }, [])

    const dispatch = useDispatch()

    const [newTask, setNewTask] = useState ('')
    const [newNote, setNewNote] = useState ('')
    const [priority, setPriority] = useState ('')

    //Tasklist handlers
    const addTask = (event) => {
        event.preventDefault()
        const taskObject = {
            title: newTask,
            note: newNote,
            priority: priority
    }
    //POST task
    if (newTask){
        axios
        .post('http://localhost:3001/tasks', taskObject)
        .then(response => {
            dispatch({ type: 'ADDTASK', payload: response.data})
            //Clear data
            setNewTask('')
            setNewNote('')
            setPriority('')
        })
    }
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

    const removeTask = (event) => {
        event.preventDefault()
        var a = event.dataTransfer.getData("Text");
        var b = document.getElementById(a)
        b.classList.add('hidden')
        axios
            .delete(`http://localhost:3001/tasks/${a}`)
    }

    const onDragOver = (event) => {
        event.preventDefault()
    }

    const onDragStart = (event) => {
        event.dataTransfer.setData("Text", event.target.id)
        var x = document.getElementById('trash')
        x.classList.add('trashHighlight')
    }

    const onDragEnd = (event) => {
        event.preventDefault()
        var x = document.getElementById('trash')
        x.classList.remove('trashHighlight')
    }
        
    if (useSelector(state => state.taskLoadedReducer) === true){
        return (
            <div id="taskList" className="hidden">
                {Object.values(store.getState().taskReducer).map(task => 
                <div draggable="true" id={task.id} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <p className="taskTitle">{task.title}</p>
                    <p className="taskNote">{task.note}</p>
                </div> 
                )}
                <form onSubmit={addTask}>
                <input
                    value={newTask}
                    onChange={handleTaskChange}
                    placeholder='What has to be done?'
                />
                <input 
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder='Notes'
                />
                <select name="priority" onChange={handlePriorityChange}>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                </select>
                <button type="submit">
                    Save
                </button>
                </form>
                <i className="fa fa-trash" onDrop={removeTask} onDragOver={onDragOver} id='trash'
                ></i>
            </div>  
        )
        } else {
            return (
                <>
                </>
            )
        }
}



export default TaskList