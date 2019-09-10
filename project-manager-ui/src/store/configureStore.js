import { createStore } from "redux";
import userReducer from "../reducers/userReducer.js";

export default function configureStore(initialState){
   return createStore(userReducer);
}; 