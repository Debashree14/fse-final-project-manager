import { ADD_USER,GET_USER } from "../actions/userActions.js";

function userReducer(state={users: [{employeeId:399512,
  firstName:'Debashree',
lastName:'Dutta'},{employeeId:2148818,
  firstName:'Subhamoy',
lastName:'Mandal'},{employeeId:399514,
  firstName:'Manajit',
lastName:'Ghoshal'

},{employeeId:399516,
  firstName:'Rupanjana',
lastName:'Mitra'

}]}, action){
    switch(action.type) {
        case ADD_USER:
          return Object.assign({}, state, 
              {
                users: [...state.users, action.user]
               }); 
        case GET_USER:
          return Object.assign({},state, { users: [...state.users]});
         default: 
           return state;
     }
}

export default userReducer;