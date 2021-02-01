import { taskReducer, taskLoadedReducer, isStage2Reducer } from './rootReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    taskReducer,
    taskLoadedReducer,
    isStage2Reducer    
})

export default rootReducer;