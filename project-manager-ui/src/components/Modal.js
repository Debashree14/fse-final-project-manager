import React from 'react';
import AddTask from './AddTask';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
import AddTaskForm from './AddTaskForm.js';



const modal = (props) => {

    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(-800px)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    paddingRight:'150px'
                }}>
                <div className="modal-header">
                    <h4>Update Task</h4>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                   <AddTaskForm formData={props.formData}
                    close={props.close}
                    onChange={props.onChange}
                    updateTask={props.updateTask}
                    updateGrid={props.updateGrid}
                    gridData={props.gridData}
                    />
               {/*  <Container style={containerStyle}>
      <Form>
        <FormGroup row>
          <Label for="taskLabel" sm={3}>Task :</Label>
          <Col sm={5}>
            <Input type="text" name="taskName" id="task" placeholder="" value={formData.taskName} onChange={e => this.onChange("taskName",e.target.value)}/>
          </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="priorityLabel" sm={3}>Priority :</Label>
         
            {<Col sm={5}>
             <Range allowCross={false} min={0} max={150} name="priority" value={formData.slider} onChange={e => this.onChange("priority",e)} />
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
       </Container> */}
                
               {/*  <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue">CONTINUE</button>
                    
                </div> */}
                {/*  <div className="modal-footer"></div>
                <Button className="buttonStyle" color="secondary" onClick={()=>this.addTask()}>Update</Button>{' '}
            <Button className="buttonStyle" color="secondary" onClick={props.closer}>Cancel</Button>
            </div>  */}
            </div>
            </div>
        </div>
    )
}

export default modal;