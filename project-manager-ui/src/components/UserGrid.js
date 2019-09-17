import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import EditTaskModal from './EditTaskModal.js';
import UserModal from './UserModal.js';
import SearchBar from  './SearchBar';
import UserButtonCellRenderer from '../renderer/UserButtonCellRenderer.js';
import Settings from '../Settings.js';

export default class UseGrid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         modal:false,
         context: { componentParent: this, editModal: UserModal},
         editUserModalForm:{
          userId:"",firstName:"",lastName:"",employeeId:""
        },
         employeeIdSort:"asc",
         firstNameSort:"asc",
         lastNameSort:"asc"         
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
       this.defaultColDef={ sortable: true }
        this.columnDefs=[{
          headerName: "User Id", field: "userId",width:100,hide:true
        },{
          headerName: "Employee Id", field: "employeeId",width:100,cellRenderer:otherRendertask, colId:"employeeId"
        }, {
          headerName: "First Name", field: "firstName",cellRenderer:cellRendertask,width:250,colId:"firstName"
        },{
          headerName: "Last Name", field: "lastName",width:250,cellRenderer:cellRendertask,colId:"firstName"
        },
        {
          headerName: "Edit", field: "" ,width:130, cellRendererFramework:UserButtonCellRenderer//,
       /*  cellRendererParams:{
            modal:{this.state.modal}
          }*/
          //cellRendererFramework: (props) => { return ( <Button color="secondary" onClick={this.editTask.bind(this)}>Edit</Button> ); }//cellRenderer: TaskCellRenderer//
        },{
          headerName: "Delete", field: "", cellRendererFramework:UserButtonCellRenderer,width:130
          //cellRendererFramework: (props) => { return ( <Button color="secondary" onClick={this.editTask.bind(this)}>Delete</Button> ); }//cellRenderer: TaskCellRenderer//
        }]

        this.editTask=this.editTask.bind(this);
        this.endTask=this.endTask.bind(this);
        this.onGridReady=this.onGridReady.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.setModalData=this.setModalData.bind(this);
        this.closeCancelModal=this.closeCancelModal.bind(this);
        this.onChange=this.onChange.bind(this);
        this.updateUser=this.updateUser.bind(this);
        this.onChangeOfSearchText=this.onChangeOfSearchText.bind(this);


    }
    onChangeOfSearchText(value){

      this.gridApi.setQuickFilter(value);

    }
     editTask(params){
       this.props.toggleModal();
     
     // alert("edit task in task grid");
    }
    updateUser(updatedData) {
      //alert("endTask");
      console.log("updatedData",updatedData);
      var url = Settings.baseUrl+Settings.UPDATE_USER;
      //var task = {username: 'example'};
      var updateUser=Object.assign({},updatedData)
      console.log("updateUser",JSON.stringify(updateUser));
      fetch(url, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(updateUser), // data can be `string` or {object}!
        
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
      
      let editUserModalForm=this.state.editUserModalForm;
    console.log(fieldName,value);
    if(fieldName=="firstName"){
      editUserModalForm.firstName=value
    }else if(fieldName=="lastName"){
      editUserModalForm.lastName=value
    }else if(fieldName=="employeeId"){
      editUserModalForm.employeeId=value
    }

    this.setState({editUserModalForm})
      
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
        editUserModalForm:data
      });
    }
    
    sortByFirstName(){
      var sortType;
      //alert(this.state.startDateSort);
      var sort = [
        {
          colId: "firstName",
          sort: this.state.sortByFirstName
        }
      ];
          
      this.gridApi.setSortModel(sort);
      if(this.state.sortByFirstName === "asc")
         sortType="desc";
      else
         sortType="asc";


      this.setState({
        sortByFirstName:sortType
      })
    }
  
    sortByLastName(){
      var sortType;
      var sort = [
        {
          colId: "lastName",
          sort: this.state.sortByLastName
        }
      ];
      this.gridApi.setSortModel(sort);
      if(this.state.sortByLastName === "asc")
         sortType="desc";
      else
         sortType="asc";


      this.setState({
        sortByLastName:sortType
      })
    }
    sortByEmployeeId(){
      var sortType;
      var sort = [
        {
          colId: "employeeId",
          sort: this.state.sortByEmployeeId
        }
      ];
      this.gridApi.setSortModel(sort);
      if(this.state.sortByEmployeeId === "asc")
         sortType="desc";
      else
         sortType="asc";


      this.setState({
        sortByEmployeeId:sortType
      })
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
         {/* <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByFirstName.bind(this)}>First Name{this.state.sortByFirstName}</Button>{'  '}{/* </Col> */}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByLastName.bind(this)}>Last Name{this.state.sortByLastName}</Button>{/* </Col> */}{'  '}
        {/*  <Col sm={2}> */}<Button  color="secondary" onClick={this.sortByEmployeeId.bind(this)}>Employee Id {this.state.sortByEmployeeId}</Button>{/* </Col> */}
        
   
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
    {<UserModal
                    className="modal"
                    show={this.state.modal}
                    close={this.closeCancelModal}
                    columnDefs={this.columnDefs}
                    gridData={this.props.data}
                    formData={this.state.editUserModalForm}
                    closeCancleModal={this.closeCancelModal}
                    onChange={this.onChange}
                    updateUser={this.updateUser}
                    updateGrid={this.updateGrid}
                    >
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
    </UserModal> }
   </div>
        );

    }
}