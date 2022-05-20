import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "../../common/formInput";

function ShowAllDistributorModal(props) {
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
        >
        <FormInput
            name="distributor_name"
            type="text"
            label="Distributor Name"
            placeHolder="Enter Distributor Name"
            inputDefaultValue={props?.defaultValue?.distributor_name}
            disabled='true'
        />
         <FormInput
            name="distributor_name"
            type="text"
            label="Distributor TIN"
            inputDefaultValue={props?.defaultValue?.distributor_tin}
            disabled='true'
        />
         <FormInput
            name="distributor_name"
            type="text"
            label="Contact Number"
            inputDefaultValue={props?.defaultValue?.official_contact_number}
            disabled='true'
        />
        <FormInput
            name="distributor_name"
            type="text"
            label="Distributor or Third party Agency"
            inputDefaultValue={props?.defaultValue?.is_distributor_or_third_party_agency}
            disabled='true'
        />
       

        <FormInput
            name="official_contact_number"
            type="text"
            label="Corporate Registration No"
            inputDefaultValue={props?.defaultValue?.corporate_registration_no}
            disabled='true'
        />
         <FormInput
            name="trade_license_no"
            type="text"
            label="Trade License No"
            inputDefaultValue={props?.defaultValue?.trade_license_no}
            disabled='true'
        />
  
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Registered Office Bangladesh"
            inputDefaultValue={props?.defaultValue?.registered_office_bangladesh}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Office Address"
            inputDefaultValue={props?.defaultValue?.ofc_address1}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Office Post Office"
            inputDefaultValue={props?.defaultValue?.ofc_post_office}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Office Thana"
            inputDefaultValue={props?.defaultValue?.ofc_thana}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Office District"
            inputDefaultValue={props?.defaultValue?.ofc_district}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Office Division"
            inputDefaultValue={props?.defaultValue?.ofc_division}
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

export default ShowAllDistributorModal;
