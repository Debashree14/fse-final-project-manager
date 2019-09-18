import React, { Component } from 'react';
import AddTask from './AddTask';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Slider from 'rc-slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {moment} from 'moment';
import AddTaskForm from './AddTaskForm.js';
import SearchBar from './SearchBar.js';
import Autocomplete from 'react-autocomplete';


export default class GenericModalParentRask extends React.Component{

  constructor(props){
    super(props);
    this.state={
      value:"" ,
      item:{}    
    };
    this.onChange=this.onChange.bind(this);
    this.matchParentTask=this.matchParentTask.bind(this);
    this.onSelect=this.onSelect.bind(this);

  }

  onSelect(val){
    console.log(val);
    this.props.closeCancelModal();
   // this.setState({show:false})
    this.props.onChange("parentTaskName",val)

  }

  onChange(val){

    this.setState({
      value:val
    })

    
  }
  matchParentTask(state, value) {
   
    //console.log("matchUser",value);

    return (
     
      state.parentTaskName.toLowerCase().indexOf(value.toLowerCase()) !== -1 //||
      //state.key.indexOf(value.toLowerCase()) !== -1
     //state.length >= 1
    // state.key.indexOf(value.toLowerCase()) !== -1
      
    );
  
  }
  render(){

 

    return (
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(-500px)' : 'translateY(-150vh)',
                  opacity: this.props.show ? '1' : '0',
                  paddingRight:'150px'
              }}>
              <div className="modal-header">
                  <h5>Search Parent Task</h5>
                  <span className="close-modal-btn" onClick={this.props.closeCancelModal}>×</span>
              </div>
              <div className="modal-body" >
                      

            <Autocomplete
              value={ this.state.value }
             //inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              //items={ getCountry() }
              items={this.props.parentTaskList}
              getItemValue={ item => (item.parentTaskName) }
            
              shouldItemRender={ this.matchParentTask }
              onChange={(event, value) => this.setState({ value:value,
              item:event }) }
             //onChange={(event, item) => this.setState({ item }) }
             //onSelect={ value => this.setState({ value }) }
              onSelect={(e)=>this.onSelect(e)}
              renderMenu={ children => (
                 <div className = "menu">
                  { this.state.value!="" ?children:"" }
                </div> 
                           )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.parentTaskId } >
                  { item.parentTaskName }
                </div>
              )}
            />
           
          </div>
          </div>
      </div>
  )
  }
}
/* const genericModal = (props) => {

    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(-500px)' : 'translateY(-50vh)',
                    opacity: props.show ? '1' : '0',
                    paddingRight:'150px'
                }}>
                <div className="modal-header">
                    <h4>Update Task</h4>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                
                
                <Autocomplete
  getItemValue={(item) => item.label}
  items={[
    { label: 'apple' },
    { label: 'banana' },
    { label: 'pear' }
  ]}
  renderItem={(item, isHighlighted) =>
    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
      {item.label}
    </div>
  }
  value="apple"
  onChange={(e) => value = e.target.value}
  onSelect={(val) => value = val}
/>
             
            </div>
            </div>
        </div>
    )
} */
