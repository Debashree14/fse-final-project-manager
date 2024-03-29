import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import EditTaskModal from './EditTaskModal.js';
import CustomModal from './Modal.js';
import SearchBar from  './SearchBar';
import ButtonCellRenderer from '../renderer/ButtonCellRenderer.js';

export default class TaskGrid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         modal:false,
         context: { 
           componentParent: this, 
           editModal: CustomModal,
           toggleTab:this.props.toggleTab,
           setEditTaskFormData:this.props.setEditTaskFormData,
           toggleTaskAction:this.props.toggleTaskAction
        },
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
        /**
         endDate: "2019-09-18T00:00:00.000+0000"
parentTaskId: 1001
parentTaskName: "ParentTask1"
priority: 9
projectId: 2007
projectName: "CITA"
startDate: "2019-09-03T00:00:00.000+0000"
taskId: 3004
taskName: "CITA Task"
userEmployeeId: "266219"
userFirstName: "Rudra"
userId: 4007
userLastName: "Majumdar"
userName: "Rudra Majumdar" 
          
         
         */
        this.columnDefs=[{
          headerName: "Task Id", field: "taskId",width:100,hide:true
        },{
          headerName: "Project Id", field: "projectId",width:100,hide:true
        },{
          headerName: "Project Name", field: "projectName",width:100,hide:true
        },{
          headerName: "User Id", field: "userId",width:100,hide:true
        }, {
          headerName: "User Name", field: "userName",width:100,hide:true
        },{
          headerName: "Task", field: "taskName",cellRenderer:cellRendertask,width:250
        },{
          headerName: "Parent Task Id", field: "parentTaskId",hide:true,width:100
        },{
          headerName: "Parent", field: "parentTaskName",cellRenderer:cellRendertask,width:250
        },{
          headerName: "Priority", field: "priority",width:120,cellRenderer:otherRendertask
        }, {
          headerName: "Start Date", field: "startDate",width:120,cellRenderer:otherRendertask,colId:"startDate"
        },{
          headerName: "End Date", field: "endDate",width:120,cellRenderer:otherRendertask,colId:"endDate"
        },
        {
          headerName: "Edit", field: "" ,width:100, cellRendererFramework:ButtonCellRenderer//,
       /*  cellRendererParams:{
            modal:{this.state.modal}
          }*/
         // cellRendererFramework: (props) => { return ( <Button color="secondary" onClick={this.editTask.bind(this)}>Click</Button> ); }//cellRenderer: TaskCellRenderer//
        },{
          headerName: "End Task", field: "", cellRendererFramework:ButtonCellRenderer,width:100
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
       //this.props.toggleModal();
     
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