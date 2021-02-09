import axios from 'axios'
import store from '../../redux/store'

const post = (props) => {
    console.log(props)
    if (props.title){ //Check if a new task has been entered
        axios
        .post('http://localhost:3001/tasks', props)
        .then(response => {
            store.dispatch({ type: 'ADDTASK', payload: response.data })            
        })
    }
}

const get = () => {
        axios
        .get('http://localhost:3001/tasks')
        .then(response => {
            var x = response.data.sort( (a,b) => a.priority - b.priority ) //Sort by priority
            store.dispatch({ type: 'LISTENTASKS', payload: x })
            store.dispatch({ type: 'ISLOADED' })
        })
}

export { post, get }