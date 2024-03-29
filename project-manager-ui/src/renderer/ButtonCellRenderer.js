import React, {Component} from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container } from 'reactstrap';
import AddTask from "../components/AddTask";
import Settings from '../Settings.js';

export default class ButtonCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.editTask = this.editTask.bind(this);
        this.endTask =this.endTask.bind(this);
        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    editTask() {
        //alert("editTask");
        console.log(this.props.data);
        var existingData=this.props.data;
        console.log(existingData);
        let slider=[];
        slider=[0,existingData.priority];
        existingData.slider=slider;
        existingData.taskUserName=existingData.userName;
        //this.props.context.componentParent.setModalData(existingData);
        this.props.context.toggleTaskAction("edit");
        this.props.context.setEditTaskFormData(existingData);
        this.props.context.toggleTab("2");
        //this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
    }
    endTask() {
        //alert("endTask");
        console.log("endTask",this.props.data);
        var url = Settings.baseUrl+Settings.UPDATE_TASK;
        //var task = {username: 'example'};
        var endtaskObj=Object.assign({},this.props.data)
        //endtaskObj.endDate=new Date();
        const updateTask={};
updateTask.user={};
updateTask.parentTask={}
updateTask.project={}

updateTask.taskId=endtaskObj.taskId;
updateTask.taskName=endtaskObj.taskName
updateTask.endDate=endtaskObj.endDate
updateTask.priority=endtaskObj.priority
updateTask.parentTask.parentTaskId=endtaskObj.parentTaskId
updateTask.user.userId=endtaskObj.userId
updateTask.project.projectId=endtaskObj.projectId;
updateTask.status="Completed";
updateTask.taskId=endtaskObj.taskId;
        console.log("endTask",JSON.stringify(updateTask));
        fetch(url, {
          method: 'PUT', // or 'PUT'
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
    handleButtonClick(){
        if(this.props.colDef.headerName === 'Edit'){
            //this.props.context.componentParent.toggleModal();
            this.editTask();
            

          //  return(<AddTask/>)
           //alert("editTask");
        }else{
            this.endTask();
        }

    }

    render() {

       
       /* return (
            <span><button style={{height: 20, lineHeight: 0.5}} onClick={this.invokeParentMethod} className="btn btn-info">Invoke Parent</button></span>
        ); */
        return (
        <Button  color="secondary" className="buttonStyle" onClick={this.handleButtonClick.bind(this)}>{this.props.colDef.headerName}</Button>
        );
    }
};