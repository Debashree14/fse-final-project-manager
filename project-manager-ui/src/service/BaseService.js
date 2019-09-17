import Settings from '../Settings.js';
import 'babel-polyfill';

class BaseService{


    postWithParams(config,filter,request,recievedSuccess,recievedFailure){
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(task), // data can be `string` or {object}!
        
        //mode: 'no-cors',
        headers:{
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      }).then(res => {  return res.json();})
      .then(response => {console.log('Success:', response)
      toast.success("Task added successfully")})
      .catch(error => console.error('Error:', error));
        }

         getAllUsers(){

        var userResponse;
        var url = Settings.baseUrl+Settings.GET_ALL_USER;
        fetch(url)
        .then(res => {//console.log(res.json())
        //  console.log(res);
           // console.log(res.status);
          //  console.log(res.value);
            return res.json();
        })
        .then(data => {console.log('Success:', data)
      
          userResponse=data;

          this.setState({
            taskList:data.tasks
          });
        }).catch(error => console.error('Error:', error));
        return userResponse;
    }

   async getAllUsers1(){
       //console.log(Settings);
    var url = Settings.baseUrl+Settings.GET_ALL_USER;
    console.log(url);
    var response = await fetch(url);
    console.log(response);
    var userList=await response.json();
    console.log(userList);

    return userList;
  
    
}
    async  getDataset() {
        var response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        console.log(response.json()); // this line will "wait" for the previous to be completed
      }
}

export default BaseService;

