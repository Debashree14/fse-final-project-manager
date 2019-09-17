import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Container} from 'reactstrap';
import AddTask from'./AddTask.js';
import ViewTask from './ViewTask.js';

class EditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const gridContainerStyle={
      'paddingTop':'60px',
      'width':'',
      'height':'300px'
}
      alert("In modal render="+this.props.isOpen);
      return (
        <div>
          {/* <Button color="danger" onClick={alert("Test")}>{Test}</Button> */}
       {/*    <Container style={gridContainerStyle}> */}
          <Modal className="modalClass" isOpen={this.props.isOpen}  backdrop={true} >
            <ModalHeader className="modal-header">Modal title</ModalHeader> }
            <ModalBody className="modal-body">
            <ViewTask/>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
             <ModalFooter className="modal-footer">
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter> 
          </Modal>
       {/*    </Container> */}
        </div>
      );
  }
}

export default EditTaskModal;