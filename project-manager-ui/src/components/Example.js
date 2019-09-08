
import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AddTask from './AddTask';
import ViewTask from './ViewTask';
import AddProject from './AddProject.js';
import AddUser from './AddUser.js';


export default class Example extends React.Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
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
            <AddProject />
          </TabPane>
          <TabPane tabId="2">
             <AddTask />
          </TabPane>
          <TabPane tabId="3">
            <AddUser />
          </TabPane>
          <TabPane tabId="4">
            <ViewTask />
          </TabPane>
        </TabContent>}
      </div>
    );
  }
}
