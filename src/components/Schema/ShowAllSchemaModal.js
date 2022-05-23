import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "./../common/formInput";

function ShowAllSchemaModal(props) {
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
            name="scheme_name"
            type="text"
            label="Scheme Name"
            inputDefaultValue={props?.defaultValue?.scheme_name}
            disabled='true'
        />
         <FormInput
            name="rate_of_interest"
            type="text"
            label="Rate Of interest"
            inputDefaultValue={props?.defaultValue?.rate_of_interest}
            disabled='true'
        />
         <FormInput
            name="distributor_name"
            type="text"
            label="Loan Tenor In Days"
            inputDefaultValue={props?.defaultValue?.loan_tenor_in_days}
            disabled='true'
        />
        <FormInput
            name="distributor_name"
            type="text"
            label="Expiry Date"
            inputDefaultValue={props?.defaultValue?.expiry_date}
            disabled='true'
        />
       

        <FormInput
            name="official_contact_number"
            type="text"
            label="Grace Periods In Days"
            inputDefaultValue={props?.defaultValue?.grace_periods_in_days}
            disabled='true'
        />
         <FormInput
            name="trade_license_no"
            type="text"
            label="Penalty Periods"
            inputDefaultValue={props?.defaultValue?.penalty_periods}
            disabled='true'
        />
  
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Daily Penalty"
            inputDefaultValue={props?.defaultValue?.daily_penalty}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Processing cost"
            inputDefaultValue={props?.defaultValue?.processing_cost}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Transaction Fee"
            inputDefaultValue={props?.defaultValue?.transaction_fee}
            disabled='true'
        />
        <FormInput
            name="registered_office_bangladesh"
            type="text"
            label="Collection Fee Sharing With Agency"
            inputDefaultValue={props?.defaultValue?.collection_fee_sharing_with_agency}
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

export default ShowAllSchemaModal;
