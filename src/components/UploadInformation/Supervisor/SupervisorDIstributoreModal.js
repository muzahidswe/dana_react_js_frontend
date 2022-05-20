import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "../../common/formInput";

function SupervisorUpdateModal(props) {
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
      className={`modal-dialog modal-dialog-scrollable modal-dialog-centered modal-${props.size} `}
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
            onChange={handleChange}
        />

        <FormInput
            name="supervisor_nid"
            type="text"
            label="Type Of Supervisor Nid"
            placeHolder="Enter Type Of Supervisor Nid"
            inputDefaultValue={props?.defaultValue?.supervisor_nid}
            onChange={handleChange}
        />

        <FormInput
            name="phone"
            type="text"
            label="Official Contact Number"
            placeHolder="Enter phone"
            inputDefaultValue={props?.defaultValue?.phone}
            onChange={handleChange}
        />
        {/* <FormInput
            name="phone"
            type="text"
            label="Contact No."
            placeHolder="Enter Contact Number"
            // inputDefaultValue={phone}
            // onChange={handleChange}
        /> */}
        <FormInput
            name="official_email"
            type="text"
            label="Email"
            placeHolder="Enter Email"
            inputDefaultValue={props?.defaultValue?.official_email}
            onChange={handleChange}
        />
        <FormInput
            name="supervisor_employee_code"
            type="text"
            label="supervisor employee code "
            placeHolder="Enter supervisor_employee_code"
            inputDefaultValue={props?.defaultValue?.supervisor_employee_code}
            onChange={handleChange}
        />
        {/* <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-right col-form-label">Logo</label>
                <div className="col-lg-9 col-xl-8">
                    <input
                        type="file"
                        className={`form-control`}
                        name="logo"
                        id="uploadFileUpdate"
                    />
                </div>
            </div> */}
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handleClick}
        //   form={modalForm}
          type="submit"
        >
          {props.btnName}
        </Button>{" "}
        {props.noCancelBtn ? <></> : (<Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>)}
        
      </ModalFooter>
    </Modal>
  </div>
  );
}

export default SupervisorUpdateModal;
