import React, {Component} from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container } from 'reactstrap';
import Settings from '../Settings.js';

export default class ProjectButtonCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.editProject = this.editProject.bind(this);
        this.suspendProject =this.suspendProject.bind(this);
        this.handleButtonClick=this.handleButtonClick.bind(this);
    }

    editProject() {
        //alert("editTask");
      /*  addProjectForm:{
            projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",projectManagerName:"",projectManagerUserId:"",projectPrioritySlider:[0,0],user:{userId:""},
            isSetStartDateEndDate:false
          }*/
    
        console.log(this.props.data);
        var existingData=this.props.data;
       // this.props.context.componentParent.setModalData(existingData);
        existingData.projectManagerName=existingData.managerName;
        if(existingData.projectStartDate !=null && existingData.projectEndDate !=null){
            existingData.isSetStartDateEndDate=true;
        }
        else{
            existingData.isSetStartDateEndDate= false;
        }
        this.props.context.toggleProjectAction("edit");
        this.props.context.setEditProjectFormData(existingData);

        //this.props.context.componentParent.methodFromParent(`Row: ${this.props.node.rowIndex}, Col: ${this.props.colDef.headerName}`)
    }
    suspendProject() {
        //alert("endTask");
        console.log("suspendProject",this.props.data);
        var url = Settings.baseUrl+Settings.UPDATE_PROJECT;
        //var task = {username: 'example'};
        //url=url.concat('/').concat(this.props.data.userId)
        console.log(url);
        var deleteUsrObj=Object.assign({},this.props.data)
      
        console.log("endTask",JSON.stringify(deleteUsrObj));
        fetch(url, {
          method: 'DELETE', // or 'PUT'
          body: JSON.stringify(deleteUsrObj), // data can be `string` or {object}!
          
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
            this.props.context.componentParent.toggleModal();
            this.editProject();
            

          //  return(<AddTask/>)
           //alert("editTask");
        }else{
            this.suspendProject();
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