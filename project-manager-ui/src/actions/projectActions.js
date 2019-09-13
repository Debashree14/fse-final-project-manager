export const ADD_USER = 'ADD_USER' // action types
export const GET_USER = 'GET_USER'

export function addUser(user) {
  return
     {     
        type: ADD_USER,
        user   // action payload
     }
}
export function getAllUsers(){

   return{
      type:GET_USER,
      payload:response
   }

}