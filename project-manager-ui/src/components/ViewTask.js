import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TaskGrid from './TaskGrid';
import EditTaskModal from './EditTaskModal';

export default class ViewTask extends React.Component {

  constructor(){
    super();
    this.state={
      taskList:[{
        taskName:"Task1",
        priority:5,
        startDate:"",
        endDate:"",
        parentTaskName:"ParentTask1"
      },
      {
        taskName:"Task2",
        priority:15,
        startDate:"",
        endDate:"",
        parentTaskName:"ParentTask1"
      }]//,
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
      <FormGroup row>
          <Label for="projectManagerLabel" style={{'paddingTop':'10px'}}>Project :</Label>
          <Col sm={4}>
            <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" value={""} onChange={e => this.onChange("projectManagerName",e.target.value)}/>
          </Col>
         
            <Button  color="secondary" onClick={()=>this.addProject()}>Search</Button>
       
          <b style={{'paddingTop':'10px'}}>Sort By:</b>
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Start Date</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>End Date</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Priority</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Completed</Button>{/* </Col> */}
   
        </FormGroup>

      </Form>
    
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