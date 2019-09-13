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


export default class GenericModal extends React.Component{

  constructor(props){
    super(props);
    this.state={
      value:"",
      show:true
    };
    this.onChange=this.onChange.bind(this);
    this.matchCountry=this.matchCountry.bind(this);
    this.onSelect=this.onSelect.bind(this);

  }

  onSelect(val){

    this.setState({show:false},this.props.onChange("projectManagerName",val))

  }

  onChange(val){

    this.setState({
      value:val
    })
    
  }
  matchCountry(state, value) {
    console.log(state);
    console.log(value);
    return (
      state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.key.toLowerCase().indexOf(value.toLowerCase()) !== -1
     //state.length >= 1
    );
  }
  render(){

 

    return (
      <div>
          <div className="modal-wrapper"
              style={{
                  transform: this.state.show ? 'translateY(-500px)' : 'translateY(-50vh)',
                  //opacity: this.state.show ? '1' : '0',
                  paddingRight:'150px'
              }}>
              <div className="modal-header">
                  <h5>Update Task</h5>
                  <span className="close-modal-btn" onClick={console.log("cancel")}>×</span>
              </div>
              <div className="modal-body">
              
              
              {/* <Autocomplete
getItemValue={(item) => item.label}
items={[
  { label: 'apple',key:1 },
  { label: 'banana',key:2 },
  { label: 'pear',key:3 }
]}
renderItem={(item, isHighlighted) =>
  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
      key={ item.key }
    {item.label} 
    </div>
}
value={this.state.value}
//e => this.onChange("projectManagerName",e.target.value)
onChange={(e) => this.onChange(e.target.value)}
onSelect={(val) => value = val}
/> */}

<Autocomplete
              value={ this.state.value }
             //inputProps={{ id: 'states-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              //items={ getCountry() }
              items={[
                { label: 'apple',key:'A1' },
                { label: 'banana',key:'B1' },
                { label: 'pear',key:'C1' },
                { label: 'guava',key:'G1'},
                {label:'watermelon',key:'W1'}
              ]}
              getItemValue={ item => item.label }
              shouldItemRender={ this.matchCountry }
              onChange={(event, value) => this.setState({ value }) }
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
                  key={ item.key } >
                  { item.label }
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
