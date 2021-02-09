import axios from 'axios'
import store from '../../redux/store'

const post = async (props) => {
    try {
        if (props.title){ //Check if a new task has been entered
            await axios
            .post('http://localhost:3001/tasks', props)
            .then(response => {
                store.dispatch({ type: 'ADDTASK', payload: response.data })            
            })
        }
    } catch (err) {
        console.error(err);
    }    
}

const get = async () => {
    try {
        axios
        .get('http://localhost:3001/tasks')
        .then(response => {
            var x = response.data.sort( (a,b) => a.priority - b.priority ) //Sort by priority
            store.dispatch({ type: 'LISTENTASKS', payload: x })
            store.dispatch({ type: 'ISLOADED' })
        })
    } catch (err) {
        console.error(err)
    }        
}

export { post, get }