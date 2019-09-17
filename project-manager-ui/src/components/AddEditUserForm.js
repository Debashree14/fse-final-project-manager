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

const AddEditUserForm = (props) => {
    let formData=props.formData;
  
    function updateRecord(){
     
      props.updateUser(formData);
      var gridData=props.gridData;
      console.log("before update,",props.gridData);
      let objinstance=gridData.findIndex(obj=>obj.userId == formData.userId)
      gridData[objinstance]=formData;
      console.log("after update,",gridData);
     // props.updateGrid(gridData);
      props.close();
    }

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const containerStyle={
         'paddingTop':'20px',
         'width':'100%',
         'align':'left'
     }
     //moment(new Date(),'dd-mm-yyyy');
     //console.log("adduser",this.props);
   return (

    
     <div>
   <Container style={containerStyle}>
     <Form >
       <FormGroup row>
         <Label for="firstNameLabel" sm={4}>First Name :</Label>
        <Col sm={7}> 
           <Input type="text" name="firstName" id="firstName" placeholder="" value={formData.firstName ==null? "":formData.firstName } onChange={e => props.onChange("firstName",e.target.value)}/>
         </Col> 
       </FormGroup>
       <FormGroup row>
         <Label for="lastNameLabel" sm={4}>Last Name :</Label>
        <Col sm={7}> 
           <Input type="text" name="lastName" id="lastName" placeholder="" value={formData.lastName} onChange={e => props.onChange("lastName",e.target.value)}/>
         </Col> 
       </FormGroup>
       <FormGroup row>
         <Label for="employeeIdLabel" sm={4}>Employee ID :</Label>
        <Col sm={6}> 
           <Input type="text" name="employeeId" id="employeeId" placeholder="" value={formData.employeeId} onChange={e => props.onChange("employeeId",e.target.value)}/>
         </Col> 
       </FormGroup> 
     </Form>
     <div>
    
     <Button  color="secondary" onClick={()=>updateRecord()}>Update</Button>{' '}
     <Button color="secondary" onClick={props.close}>Cancel</Button>
       </div>
      </Container>
      </div>
   )
}
export default AddEditUserForm;