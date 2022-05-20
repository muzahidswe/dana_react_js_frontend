import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "../../common/formInput";

function ShowSalesAgentModal(props) {
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
 console.log('propspropsprops',props) 
  const handleUpdate = () => {
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
      className={`modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg`}
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
            name="agent_name"
            type="text"
            label="Agent Name"
            placeHolder="Enter Agent Name"
            inputDefaultValue={props?.defaultValue?.agent_name}
            disabled='true'
        />

        <FormInput
            name="agent_nid"
            type="text"
            label="Type Of agent_nid "
            placeHolder="Enter Type Of Code"
            inputDefaultValue={props?.defaultValue?.agent_nid}
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
            placeHolder="Enter phone"
            inputDefaultValue={props?.defaultValue?.manufacturer_id}
            disabled='true'
        />
        <FormInput
            name="phone"
            type="text"
            label="Manufacturer Id"
            placeHolder="Enter phone"
            inputDefaultValue={props?.defaultValue?.manufacturer_id}
            disabled='true'
        />
      
        <FormInput
            name="agent_employee_code"
            type="text"
            label="Agent Employee Code"
            placeHolder="Enter agent_employee_code"
            inputDefaultValue={props?.defaultValue?.agent_employee_code}
            disabled='true'
        />
        <FormInput
            name="region_of_operation"
            type="text"
            label=" Region of Operation"
            placeHolder="Enter region_of_operation"
            inputDefaultValue={props?.defaultValue?.region_of_operation}
            disabled='true'
        />
         <FormInput
            name="autho_supervisor_employee_code"
            type="text"
            label=" Autho Supervisor Employee Code"
            inputDefaultValue={props?.defaultValue?.autho_supervisor_employee_code}
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

export default ShowSalesAgentModal;
