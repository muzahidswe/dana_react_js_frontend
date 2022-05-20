import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
function SupervisorDeleteModal(props) {
  const [modalForm] = useState(props.form);

  const handleClick = () => {
    console.log("click from modal form");

    if (props.handleClick) {
      //  alert("clickd modal form");
      props.handleClick();
    }
  };
  return (
    <div>
      <Modal
        zIndex={9999}
        isOpen={props.modal}
        toggle={props.toggle}
        className={`modal-dialog modal-dialog-scrollable modal-dialog-centered modal-${props.size} `}
        style={{ zIndex: 9999 }}
      >
        <ModalHeader className="modal-header">
          <h2 className="modal-title">{props.modalTitle}</h2>
        </ModalHeader>
        <ModalBody> <div>Are you sure you want to delete this?</div> </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleClick}
            form={modalForm}
            type="submit"
          >
            Delete
          </Button>{" "}
          {props.noCancelBtn ? <></> : (<Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>)}
          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SupervisorDeleteModal;



