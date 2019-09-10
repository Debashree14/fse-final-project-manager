import React from "react";
import { MDBCol } from "mdbreact";

const SearchBar = () => {
  return (
    <MDBCol sm="12" md="8" lg="6">
      <input className="form-control" type="text" placeholder="Search.." aria-label="Search" />
    </MDBCol>
  );
}

export default SearchBar;