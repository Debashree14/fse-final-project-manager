import { combineReducers } from "redux";
import taskReducer from './taskReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';



const rootReducer=combineReducers({
    taskReducer,
    projectReducer,
    userReducer
});

export default rootReducer;