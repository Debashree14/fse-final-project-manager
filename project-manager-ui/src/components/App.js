import React, { Component } from "react";

import '../styles/App.css';
import ControlledTabs from './ControlledTabs.js';
import Example from './Example.js';
import Example1 from './Example1.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/dist/ag-grid-community.js';
import 'ag-grid-community/dist/ag-grid-community.min.js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Project Manager</h1>
               { /*alert("test")*/}
			{/*	<ControlledTabs />*/}
              <Example />
         
              {/*  <Example1 />    <ToastContainer />*/  }
            </div>
        );
    }
}

export default App;
