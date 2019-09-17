import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
import { compose } from 'redux';
import TaskGrid from './TaskGrid';
import ProjectGrid from './ProjectGrid';
import SearchBar from  './SearchBar';
import Settings from '../Settings.js';
import GenericModalUser from './GenericModalUser';

export default class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked:false,
      modal:false,
      addProjectForm:{
        projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",projectManagerName:"",projectManagerUserId:"",projectPrioritySlider:[0,0],user:{userId:""}
      }
    };

    this.addNewProject=this.addNewProject.bind(this);
    this.onChange=this.onChange.bind(this);
    this.reset=this.reset.bind(this);
    this.searchManager=this.searchManager.bind(this);
    this.closeCancelModal=this.closeCancelModal.bind(this);
    this.fetchProjectList=this.fetchProjectList.bind(this);
    this.fetchParentTaskList=this.fetchParentTaskList.bind(this);
  }
  
  /*onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }*/
  searchManager(){

    this.setState({
      modalForUser:true,
      modal:true
    })
  }
  closeCancelModal(){

    this.setState({
      modal:false,
      modalForProject:false
    });
  }
  onChange(fieldName,value){
    // /console.log(fieldName,value);
    let addProjectForm=this.state.addProjectForm;
    if(fieldName=="projectName"){
      addProjectForm.projectName=value
    }else if(fieldName=="projectPriority"){
      addProjectForm.projectPriority=value[1];
      addProjectForm.projectPrioritySlider=[value[0],value[1]];
      console.log(addProjectForm.projectPrioritySlider);
    }else if(fieldName=="projectManagerName"){
      addProjectForm.projectManagerName=value
    }else if(fieldName=="projectStartDate"){
      addProjectForm.projectStartDate=value
    }else if(fieldName=="projectEndDate"){
      addProjectForm.projectEndDate=value
    }else if(fieldName=="check"){
      this.setState({ischecked:value})
    }

    this.setState({addProjectForm})

  }
  addNewProject(){
  
    var moment = require("moment");
    const addProject=this.state.addProjectForm;
  
    console.log("***************",addProject);
   
  
  

    if(addProject.projectName=="" || addProject.projectName==null || addProject.projectName==undefined){
      toast.error("Task cannot be blank");
      return;
    }
    if(addProject.projectStartDate=="" || addProject.projectStartDate==null || addProject.projectStartDate==undefined){
      toast.error("Start Date cannot be blank");
      return;
    }
    if((addProject.projectEndDate != null || addProject.projectEndDate!="" || addProject.projectEndDate!=undefined) && (addProject.endDate != null || addProject.endDate!="" || addProject.endDate!=undefined)){

      var str=addProject.projectStartDate;
      var end=addProject.projectEndDate;
      
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
    if(addProject.projectManagerName=="" || addProject.projectManagerName==null || addProject.projectManagerName==undefined){
      toast.error("Project Manager Name cannot be blank");
      return;
    }
 
    const project=addProject;
   
   const managerUserId= this.props.userList.find(user=>user.userName===addProject.projectManagerName).userId;
   /*console.log("***uId",uId);
   alert("test");
   console.log(this.props.userList.filter(user=>user.userName===addProject.projectManagerName));*/
  /*********************** */
  project.user.userId=managerUserId;
  var url = Settings.baseUrl+Settings.ADD_PROJECT;
  var newProjectList=this.props.projectList;
//var task = {username: 'example'};

console.log(JSON.stringify(project));
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(project), // data can be `string` or {object}!
  
  //mode: 'no-cors',
  headers:{
    'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }
}).then(res => {  return res.json();})
.then(response => {console.log('Success:', response)

console.log("newUserLnewProjectListist",newProjectList);
newProjectList.unshift(response.projectResponse);
      console.log("newProjectList after push",newProjectList);
      this.props.updateProjectGrid(newProjectList);
      var params = {
        force: true
        }
        //console.log("this",this);
        //console.log("this",this.refs);
        //console.log("this",this.refs.childProjectGrid);
      //  console.log("this",this.refs.childProjectGrid.gridApi);
    
      this.refs.childProjectGrid.gridApi.refreshCells(params);
toast.success("Project added successfully")})
.catch(error => console.error('Error:', error));
  }

  reset(){
    let addProjectForm=this.state.addProjectForm;
   
    addProjectForm.projectName="";
  addProjectForm.projectManagerName="";
  addProjectForm.projectPriority="";
    addProjectForm.projectStartDate="";
    addProjectForm.projectEndDate="";
   addProjectForm.projectPrioritySlider=[0,0];
   this.setState({addProjectForm})

  }
  fetchParentTaskList(){
     //this.props.getAllUsers();
  // getAllUsers(){

    var userResponse;
    var url = Settings.baseUrl+Settings.GET_ALL_PARENT_TASK
    console.log(url);
    fetch(url)
    .then(res => {//console.log(res.json())
     // console.log("userList",res.json());
       // console.log(res.status);
      //  console.log(res.value);
        return res.json();
        console.log("userList",res.json());
    })
    .then(data => {console.log('Success:', data)
  
     

      /* this.setState({
        userList:data.userResponseList
      }); */
      this.props.updateParentTaskList(data.parentTaskResponseList);
    }).catch(error => console.error('Error:', error));
    
// }
  }
  
  fetchProjectList(){
     //this.props.getAllUsers();
  // getAllUsers(){

    var userResponse;
    var url = Settings.baseUrl+Settings.GET_ALL_PROJECT
    console.log(url);
    fetch(url)
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
      this.props.updateProjectGrid(data.projectResponseList);
    }).catch(error => console.error('Error:', error));
    
// }
  }
  componentDidMount(){
   this.fetchProjectList();
   this.fetchParentTaskList();
  }
  render() {
    
      const formData=this.state.addProjectForm;
      const priorityUpperBound=formData.priority;
     // const valuePriority:[0,formData.priority];
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
            <Input type="checkbox" name="check" id="check" checked={this.state.ischecked} onChange={e=>this.onChange("check",e.target.checked)}/>
           <b>Set Start and End Date</b>
         {/*  </Label> */}
          </Col>
           <Col sm={3}>
        {/*    Start Date */}
        <Label for="projectStartDateLabel">Start Date</Label>
            <Input type="date" name="projectStartDate" id="projectStartDate" placeholder="Start Date" 
             disabled={this.state.ischecked?false:true}  value={formData.projectStartDate}
             //value={formData.projectStartDate==""?strDt:formData.startDate}
              //value={strDt}
             onChange={e => this.onChange("projectStartDate",e.target.value)}
           
             />
           
          </Col>
        
          <Col sm={3}>
          <Label for="projectEndDateLabel">End Date</Label>
            <Input type="date" name="projectEndDate" id="projectEndDate" placeholder="End Date" disabled={this.state.ischecked?false:true} value={formData.projectEndDate} onChange={e => this.onChange("projectEndDate",e.target.value)} />
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
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" readOnly={true} value={formData.projectManagerName} onChange={e => this.onChange("projectManagerName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="primary" onClick={()=>this.searchManager()}>Search</Button>
          </Col>
        </FormGroup>
      </Form>
      <div>
        <Button  color="secondary" onClick={()=>this.addNewProject()}>Add</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
        </div>
       </Container>
      

        <Container className="gridContainer">
        < ProjectGrid ref="childProjectGrid" data={this.props.projectList}  userList={this.props.userList} updateGrid={this.updateGrid}/>
        </Container>
        {<GenericModalUser
                    className="modal"
                    show={this.state.modal}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.addForm}
                    closeCancelModal={this.closeCancelModal}
                    onChange={this.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    projectList={this.props.projectList}
                    userList={this.props.userList}
                    role={"manager"}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </GenericModalUser> }
        </div>
    );
  }
}