
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AddTask from './AddTask';
import ViewTask from './ViewTask';
import AddProject from './AddProject.js';
import AddUser from './AddUser.js';


export default class ProjectManagerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeTab: '1',
      
      userList:[],
      alltaskList:[],
      projectList:[],
      parentTaskList:[],
      taskListByProject:[],
      taskAction:"add",
      projectAction:"add",
      addForm:{
        taskName:"",startDate:"",endDate:"",priority:"",parentTaskName:"",parentTaskId:"",slider:[0,0],projectName:"",taskUserName:"",
        project:{projectId:""},parentTask:{parentTaskId:""},user:{userId:""},status:"",isParentTask:false
      },
      addProjectForm:{
        projectName:"",projectStartDate:"",projectEndDate:"",projectPriority:"",projectManagerName:"",projectManagerUserId:"",projectPrioritySlider:[0,0],user:{userId:""},
        isSetStartDateEndDate:false
      }

    }

    
    this.toggle = this.toggle.bind(this);
    this.updateUserGrid=this.updateUserGrid.bind(this);
    this.updateProjectGrid = this.updateProjectGrid.bind(this);
    this.updateParentTaskList=this.updateParentTaskList.bind(this);
    this.updateAllTaskList=this.updateAllTaskList.bind(this);
    /** Task Functionality */
    this.toggleTaskAction=this.toggleTaskAction.bind(this);
    this.onChangeOfTaskForm=this.onChangeOfTaskForm.bind(this);
    this.setEditTaskFormData=this.setEditTaskFormData.bind(this);

    /** Project functionality */
    this.setEditProjectFormData=this.setEditProjectFormData.bind(this);
    this.onChangeOfProjectForm=this.onChangeOfProjectForm.bind(this);
    this.toggleProjectAction=this.toggleProjectAction.bind(this);
  }
  setEditTaskFormData(editFormdata){

    this.setState({
      addForm:editFormdata
    })

  }
  setEditProjectFormData(editProjectdata){

    this.setState({
      addProjectForm:editProjectdata
    })

  }


  onChangeOfTaskForm(fieldName,value){
    // /console.log(fieldName,value);
    let addForm=this.state.addForm;
    if(fieldName=="taskName"){
      addForm.taskName=value
    }else if(fieldName=="priority"){
      addForm.priority=value[1];
      addForm.slider=[value[0],value[1]];
      console.log( addForm.slider);
    }else if(fieldName=="startDate"){
      addForm.startDate=value
    }else if(fieldName=="endDate"){
      addForm.endDate=value
    }else if(fieldName=="projectName"){
      addForm.projectName=value;
    }else if(fieldName=="parentTaskName"){
      addForm.parentTaskName=value
    }else if(fieldName=="taskUserName"){
      addForm.taskUserName=value;
    }else if(fieldName=="check"){
      addForm.isParentTask=value;
    } 
    this.setState({addForm})
  }
  onChangeOfProjectForm(fieldName,value){
 
      // /console.log(fieldName,value);
      let addProjectForm=this.state.addProjectForm;
      if(fieldName=="projectName"){
        addProjectForm.projectName=value
      }else if(fieldName=="projectPriority"){
        addProjectForm.projectPriority=value[1];
        addProjectForm.projectPrioritySlider=[value[0],value[1]];
        console.log(addProjectForm.projectPrioritySlider);
      }else if(fieldName=="projectManagerName"){
        addProjectForm.projectManagerName=value
      }else if(fieldName=="projectStartDate"){
        addProjectForm.projectStartDate=value
      }else if(fieldName=="projectEndDate"){
        addProjectForm.projectEndDate=value
      }else if(fieldName=="check"){
        addProjectForm.isSetStartDateEndDate=value
      }
  
      this.setState({addProjectForm})
  
    }
  
  updateUserGrid(userResponseList){

    /*let userList=this.state.userList;
    console.log("userList",userList);
    console.log("userResponse",userResponse);
    userList.push(userResponse);*/
    console.log("Inside main container",userResponseList);
    this.setState({
      userList:userResponseList
    });
  }
  updateProjectGrid(projectResponseList){
    this.setState({
      projectList:projectResponseList
    });
  }
  updateParentTaskList(parentTaskLResponseList){
    this.setState({
      parentTaskList:parentTaskLResponseList
    });
  }
  updateAllTaskList(allTaskResponseList){
    this.setState({
    alltaskList:allTaskResponseList
  });
  }
  toggleTaskAction(taskActionSet){

    this.setState({
      taskAction:taskActionSet
    })

  }
  toggleProjectAction(projectActionSet){

    this.setState({
      projectAction:projectActionSet
    })

  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
        <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Add Project
            </NavLink>
           
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Add Task
            </NavLink>
           
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}>
              Add User
            </NavLink>
           
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}>
              View Task
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <AddProject 
              updateUserGrid={this.updateUserGrid} 
              updateProjectGrid={this.updateProjectGrid}
              updateParentTaskList={this.updateParentTaskList}
              updateAllTaskList={this.updateAllTaskList}
              userList={this.state.userList}
              projectList={this.state.projectList}
              parentTaskList={this.state.parentTaskList}
              alltaskList={this.state.alltaskList}
              addProjectForm={this.state.addProjectForm}
              onChange={this.onChangeOfProjectForm}
              setEditProjectFormData={this.setEditProjectFormData}
              projectAction={this.state.projectAction}
              toggleProjectAction={this.toggleProjectAction}
           
             
              />
          </TabPane>
          <TabPane tabId="2">
             <AddTask 
               updateUserGrid={this.updateUserGrid} 
               updateProjectGrid={this.updateProjectGrid}
               updateParentTaskList={this.updateParentTaskList}
               updateAllTaskList={this.updateAllTaskList}
               userList={this.state.userList}
               projectList={this.state.projectList}
               parentTaskList={this.state.parentTaskList}
               alltaskList={this.state.alltaskList}
               addForm={this.state.addForm}
               toggleTaskAction={this.toggleTaskAction}
               onChange={this.onChangeOfTaskForm}
               setEditTaskFormData={this.setEditTaskFormData}
               taskAction={this.state.taskAction}
              />
          </TabPane>
          <TabPane tabId="3">
            <AddUser 
               updateUserGrid={this.updateUserGrid} 
               updateProjectGrid={this.updateProjectGrid}
               updateParentTaskList={this.updateParentTaskList}
               updateAllTaskList={this.updateAllTaskList}
               userList={this.state.userList}
               projectList={this.state.projectList}
               parentTaskList={this.state.parentTaskList}
               alltaskList={this.state.alltaskList}/>
          </TabPane>
          <TabPane tabId="4">
            <ViewTask 
              updateUserGrid={this.updateUserGrid} 
              updateProjectGrid={this.updateProjectGrid}
              updateParentTaskList={this.updateParentTaskList}
              updateAllTaskList={this.updateAllTaskList}
              userList={this.state.userList}
              projectList={this.state.projectList}
              parentTaskList={this.state.parentTaskList}
              alltaskList={this.state.alltaskList}
              toggleTab={this.toggle}
              toggleTaskAction={this.toggleTaskAction}
              setEditTaskFormData={this.setEditTaskFormData}
              taskAction={this.state.taskAction}
            />
          </TabPane>
        </TabContent>}
      </div>
    );
  }
}
