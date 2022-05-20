import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormInput from "../../common/formInput";

function ShowAllManufactureModal(props) {
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
            name="manufacturer_name"
            type="text"
            label="Manufacturer Name"
            placeHolder="Enter  Manufacturer Name"
            inputDefaultValue={props?.defaultValue?.manufacturer_name}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="name_of_scheme"
            type="text"
            label="Name Of Scheme"
            inputDefaultValue={props?.defaultValue?.name_of_scheme}
            disabled='true'
            // onChange={handleChange}
        />

         <FormInput
            name="type_of_entity"
            type="text"
            label="Type Of Quantity"
            placeHolder="Enter Type Of Quantity"
            inputDefaultValue={props?.defaultValue?.type_of_entity}
            disabled='true'
            // onChange={handleChange}
        />


        <FormInput
            name="registration_no"
            type="text"
            label="Registration Name"
            placeHolder="Enter Registration Name"
            inputDefaultValue={props?.defaultValue?.registration_no}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="manufacturer_tin"
            type="text"
            label="Manufacturer tin"
            inputDefaultValue={props?.defaultValue?.manufacturer_tin}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="manufacturer_bin"
            type="text"
            label="Manufacturer Bin"
            inputDefaultValue={props?.defaultValue?.manufacturer_bin}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Corporate Officec Address"
            type="text"
            label="Corporate Officec Address"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_address}
            disabled='true'
            // onChange={handleChange}
        />

       <FormInput
            name="Corporate Officec Address One"
            type="text"
            label="Corporate Officec Address one"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_address_1}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Corporate Officec Address Two"
            type="text"
            label="Corporate Officec Address Two"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_address_2}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="Corporate Office Postal Code"
            type="text"
            label="Corporate Office Postal Code"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_postal_code}
            disabled='true'
            // onChange={handleChange}
        />

       <FormInput
            name="Corporate Office Post Office"
            type="text"
            label="Corporate Office Post Office"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_post_office}
            disabled='true'
            // onChange={handleChange}
        />
       
        <FormInput
            name="Corporate Office Thana"
            type="text"
            label="Corporate Office Thana"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_thana}
            disabled='true'
            // onChange={handleChange}
        />

         <FormInput
            name="Corporate Office District"
            type="text"
            label="Corporate Office District"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_district}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="Corporate Office Division"
            type="text"
            label="Corporate Office Division"
            inputDefaultValue={props?.defaultValue?.corporate_ofc_division}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="Nature Of Business"
            type="text"
            label="Nature Of Business"
            inputDefaultValue={props?.defaultValue?.nature_of_business}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="Alternative Office Address"
            type="text"
            label="Alternative Office Address"
            inputDefaultValue={props?.defaultValue?.alternative_ofc_address}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Alternative Office Address One"
            type="text"
            label="Alternative Office Address One"
            inputDefaultValue={props?.defaultValue?.alternative_address_1}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Alternative Office Address Two"
            type="text"
            label="Alternative Office Address Two"
            inputDefaultValue={props?.defaultValue?.alternative_address_2}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Alternative Postal Code"
            inputDefaultValue={props?.defaultValue?.alternative_postal_code}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Alternative Post Office"
            inputDefaultValue={props?.defaultValue?.alternative_post_office}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Alternative Thana"
            inputDefaultValue={props?.defaultValue?.alternative_thana}
            disabled='true'
            // onChange={handleChange}
        />
         <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Alternative District"
            inputDefaultValue={props?.defaultValue?.alternative_district}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Alternative Division"
            inputDefaultValue={props?.defaultValue?.alternative_division}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Phone"
            inputDefaultValue={props?.defaultValue?.official_phone}
            disabled='true'
            // onChange={handleChange}
        />

         <FormInput
            name="official_email"
            type="text"
            label="Email"
            placeHolder="Enter Email"
            inputDefaultValue={props?.defaultValue?.official_email}
            disabled='true'
            // onChange={handleChange}
          />
          <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Name of Authorized Representative"
            inputDefaultValue={props?.defaultValue?.name_of_authorized_representative}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Autho rep Full Name"
            inputDefaultValue={props?.defaultValue?.autho_rep_full_name}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Autho rep NID"
            inputDefaultValue={props?.defaultValue?.autho_rep_nid}
            disabled='true'
            // onChange={handleChange}
        />
        <FormInput
            name="Alternative Postal Code"
            type="text"
            label="Autho rep NDID"
            inputDefaultValue={props?.defaultValue?.autho_rep_nid}
            disabled='true'
            // onChange={handleChange}
        />

        <FormInput
            name="website_link"
            type="text"
            label="Website Link"
            placeHolder="Enter Website Link"
            inputDefaultValue={props?.defaultValue?.website_link}
            disabled='true'
            // onChange={handleChange}
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

export default ShowAllManufactureModal;
