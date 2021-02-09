import store from '../../redux/store'
import { onDragStart, onDragEnd } from './drag'
import { useEffect } from 'react'
import { get } from './axiosMeth'
import Form from './form'
import { useSelector } from 'react-redux'

const TaskList = () => {
    
    //Load tasks from server
    useEffect(() => {
        get()
    },[])

    var taskList = Object.values(useSelector(state => state.taskReducer))

    return (
        <div id="taskList" className="hidden"> {/*Shown after stage change*/}
            {taskList.map(task =>  //Map object values of the task list (stored in taskReducer)
                <div key={task.id} draggable="true" id={task.id} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <p className="taskTitle">{task.title}</p>
                    <p className="taskNote">{task.note}</p>
                </div> 
            )}
            <Form /> 
        </div>
    )
}

export default TaskList

