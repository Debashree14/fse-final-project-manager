import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
import { compose } from 'redux';


export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm:{
        taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0]
      }

    };

    this.addTask=this.addTask.bind(this);
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
    }

    this.setState({addForm})

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
          'width':'90%'
      }
    return (

    <Container style={containerStyle}>
      <Form>
        <FormGroup row>
          <Label for="taskLabel" sm={3}>Task :</Label>
          <Col sm={5}>
            <Input type="text" name="taskName" id="task" placeholder="" value={formData.taskName} onChange={e => this.onChange("taskName",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="priorityLabel" sm={3}>Priority :</Label>
           {/* <Col md={10}>
            <ReactBootstrapSlider
             id="priority"
             value={15} step={1} max={30} min={0} orientation="horizontal" reversed={true} disabled="disabled" />
            </Col>*/}
            {<Col sm={5}>
             <Range allowCross={false} min={0} max={30} name="priority" value={formData.slider} onChange={e => this.onChange("priority",e)} />
            </Col>}
        </FormGroup>
        <FormGroup row>
          <Label for="parentTaskLabel" sm={3}>Parent Task :</Label>
          <Col sm={5}>
            <Input type="text" name="parentTaskName" id="parentTask" placeholder="" value={formData.parentTaskName} onChange={e => this.onChange("parentTaskName",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startDateLabel" sm={3}>Start Date:</Label>
          <Col sm={5}>
            <Input type="date" name="startDate" id="startDate" placeholder="" value={formData.startDate} onChange={e => this.onChange("startDate",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="endDateLabel" sm={3}>End Date:</Label>
          <Col sm={5}>
            <Input type="date" name="endDate" id="endDate" placeholder="" value={formData.endDate} onChange={e => this.onChange("endDate",e.target.value)} />
          </Col>
        </FormGroup>
        
        
        
        
      
      </Form>
      <Button  color="secondary" onClick={()=>this.addTask()}>Add Task</Button>{' '}
        <Button color="secondary" onClick={()=>this.reset()}>Reset</Button>
       </Container>
    );
  }
}