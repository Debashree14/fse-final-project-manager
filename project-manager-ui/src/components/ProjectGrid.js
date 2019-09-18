import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import ProjectModal from './ProjectModal.js';
import SearchBar from  './SearchBar';

import ProjectButtonCellRenderer from '../renderer/ProjectButtonCellRenderer.js';

export default class ProjectGrid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         modal:false,
         prioritySort:"asc",
         startDateSort:"asc",
         endDateSort:"asc",
         completedSort:"asc",

         context: { componentParent: this, 
           editModal: ProjectModal,
           //toggleTab:this.props.toggleTab,
           setEditProjectFormData:this.props.setEditProjectFormData,
           toggleProjectAction:this.props.toggleProjectAction
        },
         editProjectModalForm:{
          projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",managerName:"",projectManagerUserId:"",projectPrioritySlider:[0,0],user:{userId:""},isSetStartDateEndDate:false
        }
          //frameworkComponents: { taskCellRenderer: TaskCellRenderer },
        // loadingCellRenderer: "taskCellRenderer"
        }
        const buttonRender=function(params){
          if (params.colDef.headerName === 'Edit'){
          return '<Button  color="secondary"> onClick={'+this.editProject.bind(this)+'}'+params.colDef.headerName+'</Button>';
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
     const dateComparator=function(date1, date2) {
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
    const monthToComparableNumber=function(date) {
      if (date === undefined || date === null || date.length !== 10) {
        return null;
      }
      var yearNumber = date.substring(6, 10);
      var monthNumber = date.substring(3, 5);
      var dayNumber = date.substring(0, 2);
      var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
      return result;
    }
        this.defaultColDef={ sortable: true }
        this.columnDefs=[{
          headerName: "Project Id", field: "projectId",width:100,hide:true,colId:'projectId'
        }, {
          headerName: "Project", field: "projectName",cellRenderer:cellRendertask,width:250,colId:'projectName'
        },{
          headerName: "Project Manager Name", field: "managerName",cellRenderer:otherRendertask,width:250,colId:'managerName'
        },
        {
          headerName: "No. Of Tasks", field: "totalTasks",width:100,cellRenderer:otherRendertask,
        },{
          headerName: "Completed", field: "tatalCompletedTasks",cellRenderer:cellRendertask,width:250
        }, {
          headerName: "Start Date", field: "projectStartDate",width:120,cellRenderer:otherRendertask,colId:'projectStartDate',comparator:dateComparator
        },{
          headerName: "End Date", field: "projectEndDate",width:120,cellRenderer:otherRendertask,colId:'projectEndDate',comparator:dateComparator
        },
        {
          headerName: "Priority", field: "projectPriority",width:120,cellRenderer:otherRendertask,colId:'projectPriority'
        },
        {
          headerName: "Edit", field: "" ,width:130, cellRendererFramework:ProjectButtonCellRenderer//,
       /*  cellRendererParams:{
            modal:{this.state.modal}
          }*/
         // cellRendererFramework: (props) => { return ( <Button color="secondary" onClick={this.editTask.bind(this)}>Click</Button> ); }//cellRenderer: TaskCellRenderer//
        },{
          headerName: "Suspend", field: "", cellRendererFramework:ProjectButtonCellRenderer,width:130
          //cellRenderer: "taskCellRenderer",//cellRenderer:buttonRender
        }]

        this.editProject=this.editProject.bind(this);
        this.endTask=this.endTask.bind(this);
        this.onGridReady=this.onGridReady.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.setModalData=this.setModalData.bind(this);
        this.closeCancelModal=this.closeCancelModal.bind(this);
        this.onChange=this.onChange.bind(this);
        this.updateTask=this.updateTask.bind(this);
        this.sortByStartDate=this.sortByStartDate.bind(this);
        this.onChangeOfSearchText=this.onChangeOfSearchText.bind(this);
    }
     editProject(params){
      // this.props.toggleModal();
     
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
    onChangeOfSearchText(value){

      this.gridApi.setQuickFilter(value);

    }
    onChange(fieldName,value){
      // /console.log(fieldName,value);
      let editProjectModalForm=this.state.editProjectModalForm;
      if(fieldName=="projectName"){
        editProjectModalForm.projectName=value
      }else if(fieldName=="projectPriority"){
        editProjectModalForm.projectPriority=value[1];
        editProjectModalForm.projectPrioritySlider=[value[0],value[1]];
        console.log(editProjectModalForm.projectPrioritySlider);
      }else if(fieldName=="projectManagerName"){
        editProjectModalForm.managerName=value
      }else if(fieldName=="projectStartDate"){
        editProjectModalForm.projectStartDate=value
      }else if(fieldName=="projectEndDate"){
        editProjectModalForm.projectEndDate=value
      }else if(fieldName=="isSetStartDateEndDate"){
        editProjectModalForm.isSetStartDateEndDate=value
      }
  
      this.setState({editProjectModalForm})
  
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
     /* console.log(data);
      key: 2002
managerEmployeedId: "399512"
managerFirstName: "Debashree"
managerId: 4005
managerLastName: "Dutta Mandal"
managerName: "Debashree Dutta Mandal"
projectEndDate: null
projectId: 2002
projectName: "Project2"
projectPriority: 15
projectStartDate: null
tatalCompletedTasks: 0
totalTasks: 0 */
   var formattedData=data;
   formattedData.projectPrioritySlider=[0,data.projectPriority]
      this.setState({
        editProjectModalForm:data
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
  <editProjectModal isOpen={this.state.modal}/> */} 
 
 <FormGroup row>
         <SearchBar onChangeOfSearchText={this.onChangeOfSearchText}/>
         <b>Sort By:</b>
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByStartDate.bind(this)}>Start Date {this.state.startDateSort}</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByEndtDate.bind(this)}>End Date</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByProjectPriority.bind(this)}>Priority</Button>{' '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={()=>this.addProject()}>Completed</Button>{/* </Col> */}
   
         </FormGroup>
    <div  className="ag-theme-balham gridAg" >
        <AgGridReact
            columnDefs={this.columnDefs}
            defaultColDef={this.defaultColDef}
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
    {/* <ProjectModal
                    className="modal"
                    show={this.state.modal}
                    //show={true}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.editProjectModalForm}
                    closeCancleModal={this.closeCancelModal}
                    onChange={this.onChange}
                    updateUser={this.updateUser}
                    updateGrid={this.updateGrid}
                    userList={this.props.userList}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </ProjectModal> */} 
   </div>
        );

    }
}