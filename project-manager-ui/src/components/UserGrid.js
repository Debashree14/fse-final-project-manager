import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import EditTaskModal from './EditTaskModal.js';
import CustomModal from './Modal.js';
import SearchBar from  './SearchBar';
import ButtonCellRenderer from '../renderer/ButtonCellRenderer.js';

export default class UseGrid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         modal:false,
         context: { componentParent: this, editModal: CustomModal},
         modalUpdateForm:{
          taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0]
        }
          //frameworkComponents: { taskCellRenderer: TaskCellRenderer },
        // loadingCellRenderer: "taskCellRenderer"
        }
        const buttonRender=function(params){
          if (params.colDef.headerName === 'Edit'){
          return '<Button  color="secondary"> onClick={'+this.editTask.bind(this)+'}'+params.colDef.headerName+'</Button>';
          }else{
            return '<Button  color="secondary"> onClick={'+this.endTask.bind(this)+'}'+params.colDef.headerName+'</Button>';
          }
          //return '<Button  color="secondary" onClick={()=>this.addTask()}>Add Task</Button>
          //cellRendererFramework: (props) => { return ( <button onClick{this.handleClick.bind(this)>Click</button> } ); }
        }
        const  cellRendertask=function(params){
          // console.log(params);
           return '<span><b>'+params.colDef.headerName+'</b></span>'+
           '<br/>'+
           '<div class="task">'+
           '<span class="gridContent">'+params.value+
           '</span></div>';
         // 'Value is <b>'+params.value+'</b></div>';
       }
       const  otherRendertask=function(params){
         //console.log(params);
         return '<span><b>'+params.colDef.headerName+'</b></span>'+
         '<br/>'+
         '<span>'+params.value+'</span>'
       // 'Value is <b>'+params.value+'</b></div>';
     }
        
        this.columnDefs=[{
          headerName: "Employee Id", field: "employeeId",width:100
        }, {
          headerName: "First Name", field: "firstName",cellRenderer:cellRendertask,width:250
        },{
          headerName: "Last Name", field: "lastName",width:100,cellRenderer:otherRendertask
        },
        {
          headerName: "Update", field: "" ,width:130, cellRendererFramework:ButtonCellRenderer//,
       /*  cellRendererParams:{
            modal:{this.state.modal}
          }*/
         // cellRendererFramework: (props) => { return ( <Button color="secondary" onClick={this.editTask.bind(this)}>Click</Button> ); }//cellRenderer: TaskCellRenderer//
        },{
          headerName: "Suspend", field: "", cellRendererFramework:ButtonCellRenderer,width:130
          //cellRenderer: "taskCellRenderer",//cellRenderer:buttonRender
        }]

        this.editTask=this.editTask.bind(this);
        this.endTask=this.endTask.bind(this);
        this.onGridReady=this.onGridReady.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.setModalData=this.setModalData.bind(this);
        this.closeCancelModal=this.closeCancelModal.bind(this);
        this.onChange=this.onChange.bind(this);
        this.updateTask=this.updateTask.bind(this);
        this.onChangeOfSearchText=this.onChangeOfSearchText.bind(this);


    }
    onChangeOfSearchText(value){

      this.gridApi.setQuickFilter(value);

    }
     editTask(params){
       this.props.toggleModal();
     
     // alert("edit task in task grid");
    }
    updateTask(updatedData) {
      //alert("endTask");
      console.log("updatedData",updatedData);
      var url = 'http://localhost:8081/taskManager/updateTask';
      //var task = {username: 'example'};
      var updateTask=Object.assign({},updatedData)
      console.log("updateTask",JSON.stringify(updateTask));
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(updateTask), // data can be `string` or {object}!
        
        //mode: 'no-cors',
        headers:{
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      }).then(res =>{ return res.json()})
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));
      
      //this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
  }
    endTask(params){
    
      ///alert("end task  in task grid");
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    };
    onChange(fieldName,value){
      // /console.log(fieldName,value);
      let modalUpdateForm=this.state.modalUpdateForm;
      if(fieldName=="taskName"){
        modalUpdateForm.taskName=value
      }else if(fieldName=="priority"){
        modalUpdateForm.priority=value[1];
        modalUpdateForm.slider=[value[0],value[1]];
        console.log( modalUpdateForm.slider);
      }else if(fieldName=="parentTaskName"){
        modalUpdateForm.parentTaskName=value
      }else if(fieldName=="startDate"){
        modalUpdateForm.startDate=value
      }else if(fieldName=="endDate"){
        modalUpdateForm.endDate=value
      }
      this.setState({modalUpdateForm})
    }
    toggleModal(event){

     
      this.setState({
        modal:true
       });
      //alert("Inside toggle modal");
    
    }
    closeCancelModal(){

      this.setState({
        modal:false
      });
    }
    setModalData(data){

      this.setState({
        modalUpdateForm:data
      });
    }
    sortByStartDate(){
      var sortType;
      //alert(this.state.startDateSort);
      var sort = [
        {
          colId: "projectStartDate",
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
          colId: "projectEndDate",
          sort: "asc"
        }
      ];
      console.log(this.gridApi);
      this.gridApi.setSortModel(sort);
    }
    sortByProjectPriority(){
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
    render(){
      var columnDefs=this.columnDefs;
        return(
          <div>
            { /*this.state.modal && 
  <EditTaskModal isOpen={this.state.modal}/> */} 
 
 <FormGroup row>
         <SearchBar onChangeOfSearchText={this.onChangeOfSearchText}/>
         <b>Sort By:</b>
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByStartDate.bind(this)}>Start Date {this.state.startDateSort}</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByEndtDate.bind(this)}>End Date</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByProjectPriority.bind(this)}>Priority</Button>{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Completed</Button>{/* </Col> */}
   
         </FormGroup>
    <div  className="ag-theme-balham gridAg" >
        <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.data}
            rowHeight={100}
            frameworkComponents={this.state.frameworkComponents}
            headerHeight={0}
            onGridReady={this.onGridReady}
            context={this.state.context}
          
            //suppressHorizontalScroll={true}
            >
              
        </AgGridReact>
        
    </div>
    {<CustomModal
                    className="modal"
                    show={this.state.modal}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.modalUpdateForm}
                    closeCancleModal={this.closeCancelModal}
                    onChange={this.onChange}
                    updateTask={this.updateTask}
                    updateGrid={this.updateGrid}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </CustomModal> }
   </div>
        );

    }
}