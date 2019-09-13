import React from "react";
import { MDBCol } from "mdbreact";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Container,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/* const SearchBar = () => {
  return (
    <MDBCol sm="12" md="8" lg="6">
      <input className="form-control" type="text" placeholder="Search.." aria-label="Search" />
    </MDBCol>
  );
}
 */
const SearchBar = (props) => {
  return(
<Col sm={6}>
<input className="form-control" type="text" name="searchBar" placeholder="Search here" style={{width:'80%',height:'30%'}} onChange={e=>props.onChangeOfSearchText(e.target.value)}/>
</Col>
  );
}
export default SearchBar;