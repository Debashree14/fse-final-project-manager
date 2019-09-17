import React, { Component } from "react";


import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'home',
    };

  }
  render() {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="home" title="Home">
          {/*<Sonnet />*/}
        </Tab>
        {" "}
        <Tab eventKey="profile" title="Profile">
          {/*<Sonnet />*/}
        </Tab>
        
        <Tab eventKey="contact" title="Contact" disabled>
        {/*  <Sonnet />*/}
        </Tab>
      </Tabs>
    );
  }


}
export default ControlledTabs;
