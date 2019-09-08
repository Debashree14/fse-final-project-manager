import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
/* import { compose } from 'redux';
import { connect,bindActionCreators } from "react-redux";
import addUser from "../actions/userActions.js"; */

export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked:false,
      addUserForm:{
        fisrtName:"",lastName:"",employeeId:"",
      }

    };

    this.addUser=this.addUser.bind(this);
    this.onChange=this.onChange.bind(this);
   // this.reset=this.reset.bind(this);
  }
  
  /*onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }*/
  
  onChange(fieldName,value){
    // /console.log(fieldName,value);
    let addUserForm=this.state.addUserForm;
    if(firstName=="firstName"){
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
      toast.error("Task cannot be blank");
      return;
    }
    if(addUserForm.lastName=="" || addUserForm.lastName==null || addUserForm.lastName==undefined){
      toast.error("Start Date cannot be blank");
      return;
    }
    if(addUserForm.employeeId=="" || addUserForm.employeeId==null || addUserForm.employeeId==undefined){
      toast.error("Start Date cannot be blank");
      return;
    }
 
    const addUser=addUserForm;
  /*********************** */

  var url = 'http://localhost:8081/taskManager/addTask';
//var task = {username: 'example'};

console.log(JSON.stringify(task));
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

  reset(){
  
    let addUserForm=this.state.addUserForm;
   
    addUserForm.firstName="";
    addUserForm.lastName="";
    addUserForm.employeeId="";
    this.setState({addUserForm})

  }
  render() {
    
      const formData=this.state.addUserForm;
  

     const createSliderWithTooltip = Slider.createSliderWithTooltip;
     const containerStyle={
          'paddingTop':'20px',
          'width':'75%',
          'align':'left'
      }
      //moment(new Date(),'dd-mm-yyyy');
    return (

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
    );
  }
}
/* const mapStateToProps = state => {
  const users = state.userDataReducer;
  return users;
}
const  mapDispatchToProps = (dispatch) => {
  return bindActionCreators(this.addUser, dispatch);
}
export default connect(mapStateToProps, {addUser} )(AddUser); 
export default connect(mapStateToProps, mapDispatchToProps)(AddUser); */