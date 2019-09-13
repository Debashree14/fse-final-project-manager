import { ADD_USER,GET_USER } from "../actions/userActions.js";

function projectReducer(state={users: []}, action){
    switch(action.type) {
        case ADD_USER:
          return Object.assign({}, state, 
              {
                users: [...state.users, action.user]
               }); 
        case GET_USER:
          return Object.assign({},state,action.payload)
         default: 
           return state;
     }
}

export default projectReducer;