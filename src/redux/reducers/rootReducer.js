const taskReducer = ( state = (''), action) => {
    switch(action.type){
        case 'LISTENTASKS':
            return action.payload   
        case 'ADDTASK':
            return state.concat(action.payload) 
        default:
            return state
    }
}

const taskLoadedReducer = (state = false, action) => {
    switch(action.type){
        case 'ISLOADED':
            return true
        default:
            return state
    }
}

const isStage2Reducer = (state = false, action) => {
    switch(action.type){
        case 'ISSTAGE2':
            return true
        default:
            return state
    }
}

export { isStage2Reducer, taskReducer, taskLoadedReducer }