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
import GenericModalParentTask from './GenericModalParentTask';
import GenericModalUser from './GenericModalUser';
import ViewTask from './ViewTask.js';
import Settings from '../Settings';


export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    /*   addForm:{
        taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0],projectName:"",taskUserName:"",
        project:{projectId:""},parentTask:{parentTaskId:""},user:{userId:""},status:"",isParentTask:false
      }, */
      modal:false,
      modalForProject:false,
      modalForParentTask:false,
      modalForUser:false,

    };

    this.addTask=this.addTask.bind(this);
    this.addParentTask=this.addParentTask.bind(this);
    this.addNormalTask=this.addNormalTask.bind(this);
    //this.onChange=this.onChange.bind(this);
    this.searchProject=this.searchProject.bind(this);
    this.searchParentTask=this.searchParentTask.bind(this);
    this.searchUser=this.searchUser.bind(this);
    this.closeCancelModal=this.closeCancelModal.bind(this);
    this.closeCancelProjectModal=this.closeCancelProjectModal.bind(this);
    this.closeCancelUserModal=this.closeCancelUserModal.bind(this);
    this.closeCancelParentTaskModal=this.closeCancelParentTaskModal.bind(this);
    this.isFieldDisabled=this.isFieldDisabled.bind(this);
    this.isdisableOnEdit=this.isdisableOnEdit.bind(this);
    this.updateTask=this.updateTask.bind(this);
   // this.reset=this.reset.bind(this);
  }
  
  closeCancelUserModal(){

    this.setState({
      modal:false,
      modalForUser:false
    });
  }
  closeCancelProjectModal(){

    this.setState({
      modal:false,
      modalForProject:false
    });
  }
  closeCancelParentTaskModal(){

    this.setState({
      modal:false,
      modalForParentTask:false
    });
  }
  
  
  /* onChange(fieldName,value){
    // /console.log(fieldName,value);
    let addForm=this.state.addForm;
    if(fieldName=="taskName"){
      addForm.taskName=value
    }else if(fieldName=="priority"){
      addForm.priority=value[1];
      addForm.slider=[value[0],value[1]];
      console.log( addForm.slider);
    }else if(fieldName=="startDate"){
      addForm.startDate=value
    }else if(fieldName=="endDate"){
      addForm.endDate=value
    }else if(fieldName=="projectName"){
      addForm.projectName=value;
    }else if(fieldName=="parentTaskName"){
      addForm.parentTaskName=value
    }else if(fieldName=="taskUserName"){
      addForm.taskUserName=value;
    }else if(fieldName=="check"){
      addForm.isParentTask=value;
    } 
   

    this.setState({addForm})

  } */
  searchProject(){

    this.setState({
      modalForProject:true,
      modal:true
    })
  }
  searchParentTask(){

    this.setState({
      modalForParentTask:true,
      modal:true
    })
  }
  searchUser(){

    this.setState({
      modalForUser:true,
      modal:true
    })
  }

  isFieldDisabled(){
    if(this.props.addForm.isParentTask){
      return true;
    }else{
      return false;
    }
  }
  isdisableOnEdit(){
    if(this.props.taskAction ==="edit"){
      return true;
    }else{
      return false;
    }
  }
  addTask(){
  
   if(this.props.addForm.isParentTask){
     this.addParentTask();
   }else{
     this.addNormalTask();
   }
  }
  addParentTask(){
   

    const addTaskForm=this.props.addForm;
    const addParentTask={}

    addParentTask.parentTaskName=addTaskForm.taskName;
    var url = Settings.baseUrl+Settings.ADD_PARENT_TASK;
    console.log("addParentTask",addParentTask);
    var newParentTaskList=this.props.parentTaskList;
//var task = {username: 'example'};



console.log(JSON.stringify(addParentTask));
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(addParentTask), // data can be `string` or {object}!
  
  //mode: 'no-cors',
  headers:{
    'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }
}).then(res => {  return res.json();})
.then(response => {console.log('Success:', response)
console.log("newParentTaskList",newParentTaskList);
newParentTaskList.unshift(response.parentTaskResponse);
      console.log("newParentTaskList after push",newParentTaskList);
newParentTaskList.unshift(response.parentTaskResponse);
      this.props.updateParentTaskList(newParentTaskList);
      var params = {
        force: true
        }
        /* console.log("this",this);
        console.log("this",this.refs);
        console.log("this",this.refs.childProjectGrid);
        console.log("this",this.refs.childProjectGrid.gridApi); */
    
    //  this.refs.childProjectGrid.gridApi.refreshCells(params);
toast.success("Task added successfully")})


.catch(error => console.error('Error:', error));


  }
  addNormalTask(){
    //alert("addNormalTask");
    var moment = require("moment");
    const addTask=this.props.addForm;
  
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
    if(addTask.parentTaskName=="" || addTask.parentTaskName==null || addTask.parentTaskName==undefined){
      toast.error("Parent Task cannot be blank");
      return;
    }
    if(addTask.taskUserName=="" || addTask.taskUserName==null || addTask.taskUserName==undefined){
      toast.error("User cannot be blank");
      return;
    }
    if(addTask.projectName=="" || addTask.projectName==null || addTask.projectName==undefined){
      toast.error("Project cannot be blank");
      return;
    }
    
 
    const task=addTask;
  /*********************** */

  const taskUserId= this.props.userList.find(user=>user.userName===addTask.taskUserName).userId;
  const parentTaskId= this.props.parentTaskList.find(parentTask=>parentTask.parentTaskName===addTask.parentTaskName).parentTaskId;
  const projectId= this.props.projectList.find(project=> project.projectName === addTask.projectName).projectId
  /*console.log("***uId",uId);
  alert("test");
  console.log(this.props.userList.filter(user=>user.userName===addProject.projectManagerName));*/
 /*********************** */
 task.status="InProgress";
 task.user.userId=taskUserId;
 task.parentTask.parentTaskId=parentTaskId;
 task.project.projectId=projectId;


  var url = Settings.baseUrl+Settings.ADD_TASK;
  var newTaskList=this.props.alltaskList;
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
console.log("newUserLnewProjectListist",newTaskList);
newTaskList.unshift(response.taskListResponse);
      console.log("newProjectList after push",newTaskList);
      this.props.updateAllTaskList(newTaskList);
      var params = {
        force: true
        }
        /* console.log("this",this);
        console.log("this",this.refs);
        console.log("this",this.refs.childProjectGrid);
        console.log("this",this.refs.childProjectGrid.gridApi); */
    
    //  this.refs.childProjectGrid.gridApi.refreshCells(params);
toast.success("Task added successfully")})


.catch(error => console.error('Error:', error));
  

  }
  
  updateTask(){
    //alert("addNormalTask");
    var moment = require("moment");
    const addTask=Object.assign({},this.props.addForm);
  
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
    if(addTask.parentTaskName=="" || addTask.parentTaskName==null || addTask.parentTaskName==undefined){
      toast.error("Parent Task cannot be blank");
      return;
    }
    if(addTask.taskUserName=="" || addTask.taskUserName==null || addTask.taskUserName==undefined){
      toast.error("User cannot be blank");
      return;
    }
    if(addTask.projectName=="" || addTask.projectName==null || addTask.projectName==undefined){
      toast.error("Project cannot be blank");
      return;
    }
    
   /* taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0],projectName:"",taskUserName:"",
        project:{projectId:""},parentTask:{parentTaskId:""},user:{userId:""},status:"",isParentTask:false
      } */
    const task=addTask;
  /*********************** */
let updateTask={};
let user={};
let  parentTask={}
let project={}

user.userId=task.userId;
parentTask.parentTaskId=task.parentTaskId;
project.projectId=task.projectId;

updateTask.taskId=task.taskId;
updateTask.taskName=task.taskName;
updateTask.endDate=task.endDate;
updateTask.startDate=task.startDate;
updateTask.priority=task.priority;
updateTask.parentTask=parentTask;
updateTask.user=user;
updateTask.project=project;
  const taskUserId= this.props.userList.find(user=>user.userName===addTask.taskUserName).userId;
  const parentTaskId= this.props.parentTaskList.find(parentTask=>parentTask.parentTaskName===addTask.parentTaskName).parentTaskId;
  const projectId= this.props.projectList.find(project=> project.projectName === addTask.projectName).projectId
  /*console.log("***uId",uId);
  alert("test");
  console.log(this.props.userList.filter(user=>user.userName===addProject.projectManagerName));*/
 /*********************** */
 updateTask.status="InProgress";
// task.user={};
 //task.parentTask={}
 //task.project={}
 //task.user.userId=taskUserId;
 //task.parentTask.parentTaskId=parentTaskId;
 //task.project.projectId=projectId;

  var url = Settings.baseUrl+Settings.UPDATE_TASK;
  var newTaskList=this.props.alltaskList;
//var task = {username: 'example'};

console.log("updateTask",updateTask);

console.log(JSON.stringify(updateTask));
fetch(url, {
  method: 'PUT', // or 'PUT'
  body: JSON.stringify(updateTask), // data can be `string` or {object}!
  
  //mode: 'no-cors',
  headers:{
    'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }
}).then(res => {  return res.json();})
.then(response => {console.log('Success:', response)
console.log("newUserLnewProjectListist",newTaskList);
newTaskList.unshift(response.taskListResponse);
      console.log("newProjectList after push",newTaskList);
      this.props.updateAllTaskList(newTaskList);
      var params = {
        force: true
        }
        /* console.log("this",this);
        console.log("this",this.refs);
        console.log("this",this.refs.childProjectGrid);
        console.log("this",this.refs.childProjectGrid.gridApi); */
    
    //  this.refs.childProjectGrid.gridApi.refreshCells(params);
toast.success("Task added successfully")})


.catch(error => console.error('Error:', error));
  
      }

  reset(){
  
    let addForm=this.props.addForm;
   
    addForm.taskName="";
  addForm.parentTaskName="";
  addForm.priority="";
    addForm.startDate="";
    addForm.endDate="";
   addForm.slider=[0,0];
   this.setState({addForm})

  }
  closeCancelModal(){

    this.setState({
      modal:false,
     
    });
  }
  render() {
      const props=this.props;
      const formData=props.addForm;
      const priorityUpperBound=formData.priority;
     // alert(this.props.taskAction);
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
          <Label for="projectNameLabel" sm={2}>Project :</Label>
          <Col sm={5}>
            <Input type="text" name="projectName" id="projectName" disabled={this.isFieldDisabled()} readOnly={true} placeholder="" value={formData.projectName} onChange={e => props.onChange("projectName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="secondary" disabled={this.isFieldDisabled() || this.isdisableOnEdit()}  onClick={()=>this.searchProject()}>Search</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="taskLabel" sm={2}>Task :</Label>
          <Col sm={6}>
            <Input type="text" name="taskName" id="task" placeholder="" value={formData.taskName} onChange={e => props.onChange("taskName",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm ={2}>
          </Col>
          <Col sm={3}>
        {/* <Label check> */}
            <br/>
            <Input type="checkbox" name="check" id="check" checked={formData.isParentTask} disabled={this.isdisableOnEdit()} onChange={e=>props.onChange("check",e.target.checked)}/>
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
             <Range allowCross={false} min={0} max={30} name="priority" disabled={this.isFieldDisabled()} value={formData.slider} onChange={e => props.onChange("priority",e)} />
            </Col>}
        </FormGroup>
        <FormGroup row>
          <Label for="parentTaskLabel" sm={2}>Parent Task :</Label>
          <Col sm={5}>
            <Input type="text" name="parentTaskName" id="parentTask" disabled={this.isFieldDisabled()} placeholder="" readOnly={true} value={formData.parentTaskName} onChange={e => props.onChange("parentTaskName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="secondary"  disabled={this.isFieldDisabled()} onClick={()=>this.searchParentTask()}>Search</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startDateLabel" sm={2}>Start Date:</Label>
          <Col sm={3}>
            <Input type="date" name="startDate" id="startDate" placeholder="" value={formData.startDate} disabled={this.isFieldDisabled()} onChange={e => props.onChange("startDate",e.target.value)}/>
          </Col>
          <Label for="endDateLabel" sm={2}>End Date:</Label>
          <Col sm={3}>
            <Input type="date" name="endDate" id="endDate" placeholder="" value={formData.endDate}  disabled={this.isFieldDisabled()}onChange={e => props.onChange("endDate",e.target.value)} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="taskUserLabel" sm={2}>User :</Label>
          <Col sm={5}>
            <Input type="text" name="taskUserName" id="taskUserName" placeholder="" readOnly={true} disabled={this.isFieldDisabled()} value={formData.taskUserName} onChange={e => props.onChange("taskUserName",e.target.value)}/>
          </Col>
          <Col sm={2}>
       
            <Button  color="primary"  /* disabled={this.isFieldDisabled()} */ onClick={()=>this.searchUser()}>Search</Button>
          </Col>
        </FormGroup>
        
        
        
        
      

      </Form>
        <Button  color="secondary" hidden={this.props.taskAction ==="add"?false:true} onClick={()=>this.addTask()}>Add Task</Button>{' '}
        <Button  color="secondary" hidden={this.props.taskAction ==="edit"?false:true}onClick={()=>this.updateTask()}>Update</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
       </Container>
       {<GenericModal
                    className="modal"
                    show={this.state.modalForProject}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.addForm}
                    closeCancelModal={this.closeCancelProjectModal}
                    onChange={props.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    projectList={this.props.projectList}
                    userList={this.props.userList}
                    parentTaskList={this.props.parentTaskList}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModal> }
    {<GenericModalParentTask
                    className="modal"
                    show={this.state.modalForParentTask}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.addForm}
                    closeCancelModal={this.closeCancelParentTaskModal}
                    onChange={props.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    projectList={this.props.projectList}
                    userList={this.props.userList}
                    parentTaskList={this.props.parentTaskList}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModalParentTask> }
    {<GenericModalUser
                    className="modal"
                    show={this.state.modalForUser}
                    close={this.closeCancelUserModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.addForm}
                    closeCancelModal={this.closeCancelUserModal}
                    onChange={props.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    projectList={this.props.projectList}
                    userList={this.props.userList}
                    parentTaskList={this.props.parentTaskList}
                    role={"taskuser"}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModalUser> }
    
       </div>
    );
  }
}