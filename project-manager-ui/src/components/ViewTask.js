import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TaskGrid from './TaskGrid';
import EditTaskModal from './EditTaskModal';
import Autocomplete from 'react-autocomplete';

export default class ViewTask extends React.Component {

  constructor(){
    super();
    this.state={
      taskList:[],
      projectNameValue:""
     // modal:false
  }
  this.getTasks=this.getTasks.bind(this);
  this.updateGrid=this.updateGrid.bind(this);
  this.onChange=this.onChange.bind(this);
  this.matchCountry=this.matchCountry.bind(this);
  this.onSelect=this.onSelect.bind(this);
}
updateGrid(data){
  
  this.setState({
    taskList:data
  })

}
getTasks(){
  //this.toggleModal();

  var url = 'http://localhost:8081/projectmanager/api/task';
  fetch(url)
  .then(res => {//console.log(res.json())
  //  console.log(res);
     // console.log(res.status);
    //  console.log(res.value);
      return res.json();
  })
  .then(data => {console.log('Success:', data)

    this.setState({
      taskList:data.taskResponseList
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
  onSelect(val){

    //this.props.closeCancelModal();
   // this.setState({show:false}
      this.onChange("projectName",val)

  }

  onChange(val){

    this.setState({
      value:val
    })
    
  }
  matchCountry(state, value) {
    //console.log(state);
    //console.log(value);
    return (
      state.projectName.toLowerCase().indexOf(value.toLowerCase()) !== -1 //||
      //state.key.toLowerCase().indexOf(value.toLowerCase()) !== -1
     //state.length >= 1
    // state.key.indexOf(value.toLowerCase()) !== -1
    );
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
          <Col sm={2}>
          <Label for="projectManagerLabel" style={{'paddingTop':'10px'}}>Project :</Label>
          </Col>
          <Col sm={4}>
           {/*  <Input type="text" name="projectManagerName" id="projectManagerName" placeholder="" value={""} onChange={e => this.onChange("projectManagerName",e.target.value)}/> */}
          
          <Autocomplete
              value={ this.state.projectNameValue }
             //inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              //items={ getCountry() }
              items={this.props.projectList}
              getItemValue={ item => item.projectName }
              shouldItemRender={ this.matchCountry }
              onChange={(event, projectNameValue) => this.setState({ projectNameValue }) }
              onSelect={ value => this.setState({ projectNameValue:value }) }
              //onSelect={(e)=>this.onSelect(e)}
              renderMenu={ children => (
                 <div className = "menu">
                  { this.state.projectNameValue!="" ?children:"" }
                </div> 
                           )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.key } >
                  { item.projectName }
                </div>
              )}
            />
            </Col>
            <Button  color="secondary" onClick={()=>this.getTasks()}>Search</Button>
       
          <b style={{'paddingTop':'10px'}}>Sort By:</b>
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Start Date</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>End Date</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Priority</Button>{' '}{/* </Col> */}
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