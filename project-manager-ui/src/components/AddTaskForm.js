
import React from 'react';
import AddTask from './AddTask';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';


const AddTaskForm = (props) => {


  //  console.log(props);
    var formData=props.formData;
    console.log("formData in addtask fi=orm=",formData);
    const priorityUpperBound=formData.priority;
    // const valuePriority:[0,formData.priority];
const Range = Slider.Range;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
     const containerStyle={
         'paddingTop':'20px',
         'paddingright':'50px',
         'width':'600px'
     }
    function updateRecord(){
     
      props.updateTask(formData);
      var gridData=props.gridData;
      console.log("before update,",props.gridData);
      let objinstance=gridData.findIndex(obj=>obj.taskId == formData.taskId)
      gridData[objinstance]=formData;
      console.log("after update,",gridData);
     // props.updateGrid(gridData);
      props.close();
    }

     //var updatedDataprops.formData;

     
    return (

        
        <Container style={containerStyle}>
          <Form>
            <FormGroup row>
              <Label for="taskLabel" sm={3}>Task :</Label>
              <Col sm={5}>
                <Input type="text" name="taskName" id="task" placeholder="" value={formData.taskName==null?"":formData.taskName} onChange={e => props.onChange("taskName",e.target.value)}/>
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
                 <Range allowCross={false} min={0} max={30} name="priority" value={formData.slider} onChange={e => props.onChange("priority",e)} />
                </Col>}
            </FormGroup>
            <FormGroup row>
              <Label for="parentTaskLabel" sm={3}>Parent Task :</Label>
              <Col sm={5}>
                <Input type="text" name="parentTaskName" id="parentTask" placeholder="" value={formData.parentTaskName==null?"":formData.parentTaskName} onChange={e => props.onChange("parentTaskName",e.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="startDateLabel" sm={3}>Start Date:</Label>
              <Col sm={5}>
                <Input type="date" name="startDate" id="startDate" placeholder="" value={formData.startDate ==null ? "":formData.startDate} onChange={e => props.onChange("startDate",e.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="endDateLabel" sm={3}>End Date:</Label>
              <Col sm={5}>
                <Input type="date" name="endDate" id="endDate" placeholder="" value={formData.endDate ==null ? "":formData.endDate} onChange={e => props.onChange("endDate",e.target.value)} />
              </Col>
            </FormGroup>
          </Form>

          <Button className="buttonStyle" color="secondary" onClick={()=>updateRecord()}>Update</Button>{' '}
            <Button className="buttonStyle" color="secondary" onClick={props.close}>Cancel</Button>
           
            </Container>
        )
    }

    

export default AddTaskForm;