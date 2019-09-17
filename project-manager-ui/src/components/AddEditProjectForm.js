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
import GenericModalUser from './GenericModalUser';

const AddEditProjectForm = (props) => {
    let formData=props.formData;
   /*  projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",projectManagerName:"",projectManagerUserId:"",projectPrioritySlider:[0,0],user:{userId:""} */
    // const formData=this.state.addProjectForm;
    const priorityUpperBound=formData.projectPriority;
   // const projectPrioritySlider:[0,priorityUpperBound];
    //formData.projectPrioritySlider=projectPrioritySlider;
const Range = Slider.Range;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const containerStyle={
        'paddingTop':'20px',
        'width':'75%',
        'align':'left'
    }
    var moment = require("moment");
    var strDt=new Date();
    //moment(new Date(),'dd-mm-yyyy');
   return (

    //const formData=this.state.addProjectForm;
     
<div>
    <Container style={containerStyle}>
      <Form >
        <FormGroup row>
          <Label for="projectNameLabel" sm={3}>Project :</Label>
         <Col sm={6}> 
            <Input type="text" name="projectName" id="projectName" placeholder="" value={formData.projectName} onChange={e => this.onChange("projectName",e.target.value)}/>
          </Col> 
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
        {/* <Label check> */}
            <br/>
            <Input type="checkbox" name="check" id="check" checked={formData.isSetStartDateEndDate} onChange={e=>this.onChange("check",e.target.checked)}/>
           <b>Set Start and End Date</b>
         {/*  </Label> */}
          </Col>
           <Col sm={3}>
        {/*    Start Date */}
        <Label for="projectStartDateLabel">Start Date</Label>
            <Input type="date" name="projectStartDate" id="projectStartDate" placeholder="Start Date" 
             disabled={formData.isSetStartDateEndDate?false:true}  value={formData.projectStartDate}
             //value={formData.projectStartDate==""?strDt:formData.startDate}
              //value={strDt}
             onChange={e => this.onChange("projectStartDate",e.target.value)}
           
             />
           
          </Col>
        
          <Col sm={3}>
          <Label for="projectEndDateLabel">End Date</Label>
            <Input type="date" name="projectEndDate" id="projectEndDate" placeholder="End Date" disabled={formData.isSetStartDateEndDate?false:true} value={formData.projectEndDate} onChange={e => this.onChange("projectEndDate",e.target.value)} />
          </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="projectPriorityLabel" sm={3}>Priority :</Label>
           {/* <Col md={10}>
            <ReactBootstrapSlider
             id="priority"
             value={15} step={1} max={30} min={0} orientation="horizontal" reversed={true} disabled="disabled" />
            </Col>*/}
            {<Col sm={6}>
             <Range allowCross={false} min={0} max={30} name="projectPriority" value={formData.projectPrioritySlider} onChange={e => this.onChange("projectPriority",e)} />
            </Col>}
        </FormGroup>
        <FormGroup row>
          <Label for="projectManagerLabel" sm={3}>Manager :</Label>
          <Col sm={5}>
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" readOnly={true} value={formData.managerName} onChange={e => this.onChange("managerName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="primary" onClick={()=>this.searchManager()}>Search</Button>
          </Col>
        </FormGroup>
      </Form>
      <div>
        <Button  color="secondary" onClick={()=>props.editProject()}>Update</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
        </div>
       </Container>
       {<GenericModalUser
                    className="modal"
                    show={true}
                    close={props.closeCancelModal}
                    //columnDefs={this.columnDefs}
                    //gridData={this.props.data}
                    //formData={this.state.addForm}
                    closeCancelModal={props.closeCancelModal}
                    //onChange={props.onChange}
                    //updateTask={this.updateTask}
                  //  updateGrid={this.updateGrid}
                    //projectList={this.props.projectList}
                    userList={props.userList}
                    role={"manager"}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModalUser> }
      </div>

        
    );

}
export default AddEditProjectForm;