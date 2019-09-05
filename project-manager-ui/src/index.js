
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

ReactDOM.render(<App />, document.getElementById("root"));