import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
 import { compose } from 'redux';
import { connect,bindActionCreators } from "react-redux";
import {addUser,getAllUsers} from "../actions/userActions.js";
import UserGrid from './UserGrid';
import Settings from '../Settings.js';


class AddUser extends React.Component {
  //export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked:false,
      addUserForm:{
        firstName:"",lastName:"",employeeId:""
      },
      action:"add"
    

    };

    this.addUser=this.addUser.bind(this);
    this.onChange=this.onChange.bind(this);
    this.fetchUserList=this.fetchUserList.bind(this);
    this.editUser=this.editUser.bind(this);
   // this.reset=this.reset.bind(this);
  }
  
  /*onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }*/
  editUser(formData){

    this.setState({addUserForm:formData});

  }
  fetchUserList(){

    var userResponse;
    var url = Settings.baseUrl+Settings.GET_ALL_USER;
    console.log(url);
    fetch(url/*,{
      method: 'GET',
      headers:{
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    }*/)
    .then(res => {//console.log(res.json())
     // console.log("userList",res.json());
       // console.log(res.status);
      //  console.log(res.value);
        return res.json();
        console.log("userList",res.json());
    })
    .then(data => {console.log('Success:', data)
  
      userResponse=data;

      /* this.setState({
        userList:data.userResponseList
      }); */
      this.props.updateUserGrid(data.userResponseList);
    }).catch(error => console.error('Error:', error));
    

  }
  componentDidMount(){
      this.fetchUserList();

     
 // }
  }
  onChange(fieldName,value){
    // /console.log(fieldName,value);
    let addUserForm=this.state.addUserForm;
    console.log(fieldName,value);
    if(fieldName=="firstName"){
      addUserForm.firstName=value
    }else if(fieldName=="lastName"){
      addUserForm.lastName=value
    }else if(fieldName=="employeeId"){
      addUserForm.employeeId=value
    }

    this.setState({addUserForm})

  }
  addUser(){
  
    var moment = require("moment");
    const addUserForm=this.state.addUserForm;
  
    console.log("***************",addUserForm);
   
  
  

    if(addUserForm.firstName=="" || addUserForm.firstName==null || addUserForm.firstName==undefined){
      toast.error("First Name cannot be blank");
      return;
    }
    if(addUserForm.lastName=="" || addUserForm.lastName==null || addUserForm.lastName==undefined){
      toast.error("Last Name cannot be blank");
      return;
    }
    if(addUserForm.employeeId=="" || addUserForm.employeeId==null || addUserForm.employeeId==undefined){
      toast.error("Employee ID cannot be blank");
      return;
    }
 
    const addUser=addUserForm;
  /*********************** */

  var url = Settings.baseUrl+Settings.ADD_USER;
//var task = {username: 'example'};
var newUserList=this.props.userList;
console.log(JSON.stringify(addUser));
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(addUser), // data can be `string` or {object}!
  
  //mode: 'no-cors',
  headers:{
    'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }
}).then(res => { 
  
  return res.json();

})
.then(response => {console.log('Success:', response)
    //if(response != null){
   
      console.log("newUserList",newUserList);
      newUserList.unshift(response.userResponse);
      console.log("newUserList after push",newUserList);
      this.props.updateUserGrid(newUserList);
   // }
toast.success("User added successfully")})
.catch(error => console.error('Error:', error));


  }

  reset(){
  
    let addUserForm=this.state.addUserForm;
   
    addUserForm.firstName="";
    addUserForm.lastName="";
    addUserForm.employeeId="";
    this.setState({addUserForm})

  }
  render() {
    
      let formData=this.state.addUserForm;
  

     const createSliderWithTooltip = Slider.createSliderWithTooltip;
     const containerStyle={
          'paddingTop':'20px',
          'width':'75%',
          'align':'left'
      }
      //moment(new Date(),'dd-mm-yyyy');
      //console.log("adduser",this.props);
    return (

     
      <div>
    <Container style={containerStyle}>
      <Form >
        <FormGroup row>
          <Label for="firstNameLabel" sm={3}>First Name :</Label>
         <Col sm={6}> 
            <Input type="text" name="firstName" id="firstName" placeholder="" value={formData.firstName} onChange={e => this.onChange("firstName",e.target.value)}/>
          </Col> 
        </FormGroup>
        <FormGroup row>
          <Label for="lastNameLabel" sm={3}>Last Name :</Label>
         <Col sm={6}> 
            <Input type="text" name="lastName" id="lastName" placeholder="" value={formData.lastName} onChange={e => this.onChange("lastName",e.target.value)}/>
          </Col> 
        </FormGroup>
        <FormGroup row>
          <Label for="employeeIdLabel" sm={3}>Employee ID :</Label>
         <Col sm={3}> 
            <Input type="text" name="employeeId" id="employeeId" placeholder="" value={formData.employeeId} onChange={e => this.onChange("employeeId",e.target.value)}/>
          </Col> 
        </FormGroup> 
      </Form>
      <div>
      <Button  color="secondary" onClick={()=>this.addUser()}>Add</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
        </div>
       </Container>
        <Container className="gridContainer">
          {/*console.log("aggrid",this.props.userList)*/}
        < UserGrid data={this.props.userList} updateGrid={this.updateGrid} editUser={this.editUser}/>
        </Container>
        </div>
      
    );
  }
}
 const mapStateToProps = state => {
  const users = state.userReducer;
  //console.log("state,userreducer",state.userReducer);
  return users;
}
/*  const  mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addUser}, dispatch);
}  */
//export default connect(mapStateToProps, {addUser} )(AddUser); 

//export default connect(mapStateToProps, {addUser} )(User);
export default connect(mapStateToProps, {getAllUsers})(AddUser); 