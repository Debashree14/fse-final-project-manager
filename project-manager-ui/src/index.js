import React from "react";
import {ReactDOM,render} from "react-dom";
import App from "./components/App.js";
/**MDB */
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import "bootstrap-css-only/css/bootstrap.min.css";
//import "mdbreact/dist/css/mdb.css";
/**MDB */
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const reduxStore=configureStore();
  

/*  ReactDOM.render( <Provider store={configureStore}>
    <App />
 </Provider>, document.getElementById("root"));   */

 const renderApp = () =>
  render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    document.getElementById('root')
  ) 

 /* const renderApp = () =>
  render(<App />,
    document.getElementById('root')
  )
 /*  ReactDOM.render( 
    <App />, document.getElementById("root"));  */


  if (module.hot) {
    module.hot.accept('./components/App', renderApp)
  }
  

  renderApp()