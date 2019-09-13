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

export default class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked:false,
      addProjectForm:{
        projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",projectManagerName:"",projectPrioritySlider:[0,0]
      },
      projectList:[{projectId:5,
        projectName:'PR1',
        totalTasks:5,
        tatalCompletedTasks:3,
        projectStartDate:"23/06/2019",
        projectEndDate:"23/08/2019",
        projectPriority:20},
        {projectId:8,
          projectName:'PR2',
          totalTasks:5,
          tatalCompletedTasks:3,
          projectStartDate:"03/04/2019",
          projectEndDate:"12/06/2019",
          projectPriority:25},{projectId:5,
            projectName:'PR3',
            totalTasks:15,
            tatalCompletedTasks:13,
            projectStartDate:"03/06/2018",
            projectEndDate:"23/10/2019",
            projectPriority:2}]

    };

    this.addProject=this.addProject.bind(this);
    this.onChange=this.onChange.bind(this);
    this.reset=this.reset.bind(this);
  }
  
  /*onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }*/
  
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
  addProject(){
  
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
    if(addProject.projectName=="" || addProject.projectName==null || addProject.projectName==undefined){
      toast.error("Task cannot be blank");
      return;
    }
 
    const project=addProject;
  /*********************** */

  var url = 'http://localhost:8081/taskManager/addProject';
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
toast.success("Task added successfully")})
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
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" value={formData.projectManagerName} onChange={e => this.onChange("projectManagerName",e.target.value)}/>
          </Col>
          <Col sm={2}>
            <Button  color="primary" onClick={()=>this.addProject()}>Search</Button>
          </Col>
        </FormGroup>
      </Form>
      <div>
        <Button  color="secondary" onClick={()=>this.addProject()}>Add</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
        </div>
       </Container>
      

        <Container className="gridContainer">
        < ProjectGrid data={this.state.projectList} updateGrid={this.updateGrid}/>
        </Container>
        </div>
    );
  }
}