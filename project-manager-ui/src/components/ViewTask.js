import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TaskGrid from './TaskGrid';
import EditTaskModal from './EditTaskModal';

export default class ViewTask extends React.Component {

  constructor(){
    super();
    this.state={
      taskList:[]//,
     // modal:false
  }
  this.getTasks=this.getTasks.bind(this);
  this.updateGrid=this.updateGrid.bind(this);
}
updateGrid(data){
  
  this.setState({
    taskList:data
  })

}
getTasks(){
  //this.toggleModal();

  var url = 'http://localhost:8081/taskManager/tasks';
  fetch(url)
  .then(res => {//console.log(res.json())
  //  console.log(res);
     // console.log(res.status);
    //  console.log(res.value);
      return res.json();
  })
  .then(data => {console.log('Success:', data)

    this.setState({
      taskList:data.tasks
    });
  }).catch(error => console.error('Error:', error));

}
  componentDidMount(){

  /*var url = 'http://localhost:8081/taskManager/tasks';
  fetch(url)
  .then(res => {//console.log(res.json())
  //  console.log(res);
     // console.log(res.status);
    //  console.log(res.value);
      return res.json();
  })
  .then(data => {console.log('Success:', data)

    this.setState({
      taskList:data.tasks
    });
  }).catch(error => console.error('Error:', error));

 */
  }

  render() {
    const containerStyle={
          'paddingTop':'20px'
      }
    const gridContainerStyle={
          'paddingTop':'60px',
          'width':'auto',
          'height':'300px'
    }
    return (
      <div>
      <Container style={containerStyle}>
      <Form>
        <Row form>
          <Col md={6}>
             <FormGroup >
          <Label for="taskLabel" sm={2}>Task :</Label>
          <Col sm={10}>
            <Input type="text" name="email" id="task" placeholder="" />
       </Col>
        </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup >
          <Label for="parentTaskLabel" sm={2}>Parent Task :</Label>
           <Col sm={10}>
            <Input type="text" name="parentTask" id="parentTask" placeholder="" />
          </Col>
        </FormGroup>
          </Col>
        </Row>
       
        <Row form style={containerStyle}>
          <Col md={3}>
             <FormGroup >
          <Label for="startDateLabel" sm={4}>Priority From:</Label>
          <Col sm={8}>
            <Input type="text" name="startDate" id="startDate" placeholder="" />
          </Col>
        </FormGroup>
          </Col>
         <Col md={3}>
             <FormGroup >
          <Label for="startDateLabel" sm={4}>Priority To:</Label>
          <Col sm={8}>
            <Input type="text" name="startDate" id="startDate" placeholder="" />
          </Col>
        </FormGroup>
          </Col>
          <Col md={3}>
             <FormGroup >
          <Label for="startDateLabel" sm={4}>Start Date:</Label>
          <Col sm={8}>
            <Input type="text" name="startDate" id="startDate" placeholder="" />
          </Col>
        </FormGroup>
          </Col>
          <Col md={3}>
             <FormGroup >
          <Label for="startDateLabel" sm={4}>End Date:</Label>
          <Col sm={8}>
            <Input type="text" name="startDate" id="startDate" placeholder="" />
          </Col>
        </FormGroup>
          </Col>
        </Row>
        
       
      </Form>
      <Button  color="secondary" onClick={()=>this.getTasks()}>Search</Button>
    
      </Container>
      <Container hidden={this.state.taskList.length >0 ? false:true} className="gridContainer">
      < TaskGrid data={this.state.taskList} updateGrid={this.updateGrid}/>
      </Container>
     
{/*this.state.modal && 
  <EditTaskModal/>
*/} 
      
     
       
       </div>
    );
  }
}