import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "../../common/formInput";

function ShowAllSupervisorModal(props) {
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
 console.log('propspropsprops',props) 
  const handleClick = () => {
    if (props.handleUpdate) {
      props.handleUpdate();
    }
  };
  const handleChange = (name, value) => {
    if (props.handleChange) {
      props.handleChange(name, value);
    }
  };

  useEffect(() => {
    setDefaultValue(props.defaultValue);
  }, [props.defaultValue]);
  return (
    <div>
    <Modal
      zIndex={9999}
      isOpen={props.modal}
      toggle={props.toggle}
      className={`modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg `}
      style={{ zIndex: 9999 }}
    >
      <ModalHeader className="modal-header">
        <h2 className="modal-title">{props.modalTitle}</h2>
      </ModalHeader>
      <ModalBody>
        <form
        id="fi-information-update-form"
        className="form pt-5"
        // onSubmit={handleSubmit}
        >
        <FormInput
            name="supervisor_name"
            type="text"
            label="Supervisor Name"
            placeHolder="Enter Supervisor Name"
            inputDefaultValue={props?.defaultValue?.supervisor_name}
            disabled='true'
        />

        <FormInput
            name="supervisor_nid"
            type="text"
            label="Type Of Supervisor Nid"
            placeHolder="Enter Type Of Supervisor Nid"
            inputDefaultValue={props?.defaultValue?.supervisor_nid}
            disabled='true'
        />

        <FormInput
            name="phone"
            type="text"
            label="Official Contact Number"
            placeHolder="Enter phone"
            inputDefaultValue={props?.defaultValue?.phone}
            disabled='true'
        />
        <FormInput
            name="phone"
            type="text"
            label="Manufacturer Id"
            inputDefaultValue={props?.defaultValue?.manufacturer_id}
            disabled='true'
        />
      
        <FormInput
            name="official_email"
            type="text"
            label="Email"
            placeHolder="Enter Email"
            inputDefaultValue={props?.defaultValue?.official_email}
            disabled='true'
        />
        <FormInput
            name="supervisor_employee_code"
            type="text"
            label="supervisor employee code "
            placeHolder="Enter supervisor_employee_code"
            inputDefaultValue={props?.defaultValue?.supervisor_employee_code}
            disabled='true'
        />
        <FormInput
            name="supervisor_employee_code"
            type="text"
            label="Region of Operation"
            placeHolder="region_of_operation"
            inputDefaultValue={props?.defaultValue?.region_of_operation}
            disabled='true'
        />
        </form>
      </ModalBody>
      <ModalFooter>
        {props.noCancelBtn ? <></> : (<Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>)}
        
      </ModalFooter>
    </Modal>
  </div>
  );
}

export default ShowAllSupervisorModal;
