import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container ,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TaskGrid from './TaskGrid';
import EditTaskModal from './EditTaskModal';
import Autocomplete from 'react-autocomplete';
import Settings from '../Settings.js';

export default class ViewTask extends React.Component {

  constructor(){
    super();
    this.state={
      taskList:[],
      projectNameValue:"",
      gridApi:[],
      gridColumnApi:[]
     // modal:false
  }
  this.getTasks=this.getTasks.bind(this);
  this.updateGrid=this.updateGrid.bind(this);
  this.onChange=this.onChange.bind(this);
  this.matchCountry=this.matchCountry.bind(this);
  this.onSelect=this.onSelect.bind(this);
  this.onGridReady=this.onGridReady.bind(this);
}
onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  //params.api.sizeColumnsToFit();
  this.setState({
    gridApi:params.api,
    gridColumnApi:params.columnApi
  })
};
updateGrid(data){
  
  this.setState({
    taskList:data
  })

}
getTasks(){
  //this.toggleModal();
  var url="";
  //var url1="";
 //var url2="";
  let projectId;
 
  var url2 = Settings.baseUrl+Settings.GET_ALL_TASK;
 // console.log("url1",url1);
 // console.log("url2",url2);
  url=url2;
  //alert(this.state.projectNameValue);
  if(this.state.projectNameValue != ""){
    var url1 = Settings.baseUrl+Settings.GET_ALL_TASK_BT_PROJECT_ID;
  projectId = this.props.projectList.find(project=> project.projectName === this.state.projectNameValue).projectId;
  url=url1.concat('/').concat(projectId);  
  
}
  
  console.log("url",url);
  
 
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
  sortByStartDate(){
    var sortType;
    //alert(this.state.startDateSort);
    var sort = [
      {
        colId: "startDate",
        sort: this.state.startDateSort
      }
    ];
        
    this.gridApi.setSortModel(sort);
    if(this.state.startDateSort === "asc")
       sortType="desc";
    else
       sortType="asc";


    this.setState({
      startDateSort:sortType
    })
  }

  sortByEndtDate(){
    var sort = [
      {
        colId: "endDate",
        sort: "asc"
      }
    ];
    console.log(this.gridApi);
    this.gridApi.setSortModel(sort);
  }
  sortByTaskPriority(){
    var sort = [
      {
        colId: "projectPriority",
        sort: "asc"
      }
    ];
    console.log(this.gridApi);
    this.gridApi.setSortModel(sort);
  }
   dateComparator(date1, date2) {
    var date1Number = monthToComparableNumber(date1);
    var date2Number = monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
    return date1Number - date2Number;
  }
   monthToComparableNumber(date) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
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
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByStartDate.bind(this)}>Start Date</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByEndtDate.bind(this)}>End Date</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByTaskPriority.bind(this)}>Priority</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByStartDate.bind(this)}>Completed</Button>{/* </Col> */}
   
        </FormGroup>

      </Form>
    
      </Container>
      <Container hidden={this.state.taskList.length >0 ? false:true} className="gridContainer">
      < TaskGrid data={this.state.taskList} 
         updateGrid={this.updateGrid} 
         onGridReady={this.onGridReady} 
         toggleTab={this.props.toggleTab}
         setEditTaskFormData={this.props.setEditTaskFormData}
         toggleTaskAction={this.props.toggleTaskAction}
         />
      </Container>
     
{/*this.state.modal && 
  <EditTaskModal/>
*/} 
      
     
       
       </div>
    );
  }
}