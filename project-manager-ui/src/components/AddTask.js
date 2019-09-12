import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container,Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
import { compose } from 'redux';
import EditTaskModal from './EditTaskModal';
import CustomModal from './Modal.js';
import GenericModal from './GenericModal.js';
import ViewTask from './ViewTask.js';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm:{
        taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0],projectManagerName:""
      },
      modal:false,
      isOpen:true

    };

    this.addTask=this.addTask.bind(this);
    this.onChange=this.onChange.bind(this);
    this.searchProject=this.searchProject.bind(this);
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
    let addForm=this.state.addForm;
    if(fieldName=="taskName"){
      addForm.taskName=value
    }else if(fieldName=="priority"){
      addForm.priority=value[1];
      addForm.slider=[value[0],value[1]];
      console.log( addForm.slider);
    }else if(fieldName=="parentTaskName"){
      addForm.parentTaskName=value
    }else if(fieldName=="startDate"){
      addForm.startDate=value
    }else if(fieldName=="endDate"){
      addForm.endDate=value
    }else if(fieldName=="projectManagerName"){
      addForm.projectManagerName=value;
    }

    this.setState({addForm})

  }
  searchProject(){

    this.setState({
      modal:true
    })
  }
  addTask(){
  
    var moment = require("moment");
    const addTask=this.state.addForm;
  
    console.log("***************",addTask);
   
  
  

    if(addTask.taskName=="" || addTask.taskName==null || addTask.taskName==undefined){
      toast.error("Task cannot be blank");
      return;
    }
    if(addTask.startDate=="" || addTask.startDate==null || addTask.startDate==undefined){
      toast.error("Start Date cannot be blank");
      return;
    }
    if((addTask.startDate != null || addTask.startDate!="" || addTask.startDate!=undefined) && (addTask.endDate != null || addTask.endDate!="" || addTask.endDate!=undefined)){

      var str=addTask.startDate;
      var end=addTask.endDate;
      
     // console.log(str,end)
      //console.log(strDate,endDate);
      //console.log(moment());
      var strtDate=moment(str,'yyyy-MM-dd');
      var endDate =moment(end,'yyyy-MM-dd');
      //console.log("strtDate=",strtDate);
      //console.log("endDate",endDate);
      //console.log(strtDate > endDate);
      //console.log(endDate > strtDate);
      var duration=moment.duration(endDate.diff(strtDate));
      //console.log(duration.asHours());
     if(duration.asHours()<0){
       toast.warn("End Date cannot be earlier/smaller than the Start Date");
     }
    }
    if(addTask.taskName=="" || addTask.taskName==null || addTask.taskName==undefined){
      toast.error("Task cannot be blank");
      return;
    }
 
    const task=addTask;
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
  
    let addForm=this.state.addForm;
   
    addForm.taskName="";
  addForm.parentTaskName="";
  addForm.priority="";
    addForm.startDate="";
    addForm.endDate="";
   addForm.slider=[0,0];
   this.setState({addForm})

  }
  render() {
    
      const formData=this.state.addForm;
      const priorityUpperBound=formData.priority;
     // const valuePriority:[0,formData.priority];
const Range = Slider.Range;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
      const containerStyle={
          'paddingTop':'20px',
          'width':'75%',
          'align':'left'
      }
    return (
<div>
    <Container style={containerStyle}>
      <Form>
      <FormGroup row>
          <Label for="projectManagerLabel" sm={2}>Project :</Label>
          <Col sm={5}>
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" value={formData.projectManagerName} onChange={e => this.onChange("projectManagerName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="secondary" onClick={()=>this.searchProject()}>Search</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="taskLabel" sm={2}>Task :</Label>
          <Col sm={6}>
            <Input type="text" name="taskName" id="task" placeholder="" value={formData.taskName} onChange={e => this.onChange("taskName",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm ={2}>
          </Col>
          <Col sm={3}>
        {/* <Label check> */}
            <br/>
            <Input type="checkbox" name="check" id="check" checked={this.state.ischecked} onChange={e=>this.onChange("check",e.target.checked)}/>
           <b>Parent Task</b>
          </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="priorityLabel" sm={2}>Priority :</Label>
           {/* <Col md={10}>
            <ReactBootstrapSlider
             id="priority"
             value={15} step={1} max={30} min={0} orientation="horizontal" reversed={true} disabled="disabled" />
            </Col>*/}
            {<Col sm={6}>
             <Range allowCross={false} min={0} max={30} name="priority" value={formData.slider} onChange={e => this.onChange("priority",e)} />
            </Col>}
        </FormGroup>
        <FormGroup row>
          <Label for="parentTaskLabel" sm={2}>Parent Task :</Label>
          <Col sm={5}>
            <Input type="text" name="parentTaskName" id="parentTask" placeholder="" value={formData.parentTaskName} onChange={e => this.onChange("parentTaskName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="secondary" onClick={()=>this.addProject()}>Search</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startDateLabel" sm={2}>Start Date:</Label>
          <Col sm={3}>
            <Input type="date" name="startDate" id="startDate" placeholder="" value={formData.startDate} onChange={e => this.onChange("startDate",e.target.value)}/>
          </Col>
          <Label for="endDateLabel" sm={2}>End Date:</Label>
          <Col sm={3}>
            <Input type="date" name="endDate" id="endDate" placeholder="" value={formData.endDate} onChange={e => this.onChange("endDate",e.target.value)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="projectManagerLabel" sm={2}>Manager :</Label>
          <Col sm={5}>
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" value={formData.projectManagerName} onChange={e => this.onChange("projectManagerName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="secondary" onClick={()=>this.addProject()}>Search</Button>
          </Col>
        </FormGroup>
        
        
        
        
      
      </Form>
      <Button  color="secondary" onClick={()=>this.addTask()}>Add Task</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
       </Container>
       {<GenericModal
                    className="modal"
                    show={this.state.modal}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.addForm}
                    closeCancleModal={this.closeCancelModal}
                    onChange={this.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModal> }
    {/* <Modal className="open-modal" isOpen={this.state.isOpen}  backdrop={false} >
            <ModalHeader className="modal-header">Modal title</ModalHeader> }
            <ModalBody className="modal-body">
           
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
             <ModalFooter className="modal-footer">
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter> 
  </Modal> */}
      {/*  <MDBContainer>
       
        <MDBModal isOpen={this.state.modal} centered>
          <MDBModalHeader>MDBModal title</MDBModalHeader>
          <MDBModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={alert("test2")}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer> */}
       </div>
    );
  }
}