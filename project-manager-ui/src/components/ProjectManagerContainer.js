
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
      taskListByProject:[]

    }

    
    this.toggle = this.toggle.bind(this);
    this.updateUserGrid=this.updateUserGrid.bind(this);
    this.updateProjectGrid = this.updateProjectGrid.bind(this);
    this.updateParentTaskList=this.updateParentTaskList.bind(this);
    this.updateAllTaskList=this.updateAllTaskList.bind(this);
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
            />
          </TabPane>
        </TabContent>}
      </div>
    );
  }
}
