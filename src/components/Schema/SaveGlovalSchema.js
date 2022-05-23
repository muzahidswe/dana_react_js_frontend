import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { GlobalVAlueschemaSave } from "../../services/Schema/Schema";
import FormInput from "./../common/formInput";

function SaveGlovalSchema(props) {
    const form = useRef(null);
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
  const [formData , setFormData] = useState({
    scheme_id:0,
    uninterrupted_sales:0,
    intrvl_check_uninterrupt_sales:0,
    max_credit_limit_all:0,
    max_credit_limit_by_manufacturer:0,
    min_avg_sales_manufacturer:0,
    avg_sales_duration:0,
    interval_checking_avg_sales_duration:0,
    max_limit_no_security_cheque:0,
    max_limit_no_trade_license:0,
    multiplying_factor:0,
    interest_capitalisaion_period:0,
  });
  const alert = useAlert();

  const handleUpdate = () => {
    if (props.handleUpdate) {
      props.handleUpdate();
    }
  };


  useEffect(() => {
    setDefaultValue(props.defaultValue);
    if(props.globalSchemaAllVAlue.length > 0){
        setFormData(props.globalSchemaAllVAlue[0])
    }
  }, [props.defaultValue,props.globalSchemaAllVAlue]);

  const handleChange =(e)=>{
        setFormData({ ...formData, [e?.target?.name]:parseInt(e?.target?.value ) })
        console.log('formdata',formData)
}

const handleSubmit = async  (e) =>{
      e.preventDefault();
      formData.scheme_id = defaultValue.id
      let response =await GlobalVAlueschemaSave(formData)
      if(response.data.success == true){
        alert.success('Global Schema updated Successfully');
        setFormData('')
        form.current.reset();
        props.toggle()
      }else{
        alert.error(response.data.message);
      }
      
}

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
        ref={form} onSubmit={handleSubmit}
        >
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                    Uninterrupted Sales
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='uninterrupted_sales'
                    placeholder='Uninterrupted Sales'
                    value={formData?.uninterrupted_sales}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}
                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Intrvl Check Uninterrupt Sales
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='intrvl_check_uninterrupt_sales'
                    placeholder='Uninterrupted Sales'
                    value={formData?.intrvl_check_uninterrupt_sales}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}
                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Max Credit Limit All
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='max_credit_limit_all'
                    placeholder='Max Credit Limit All'
                    value={formData?.max_credit_limit_all}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Max Credit Limit By Manufacturer
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='max_credit_limit_by_manufacturer'
                    placeholder='Max Credit Limit By Manufacturer'
                    value={formData?.max_credit_limit_by_manufacturer}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Min Avg Sales Manufacturer
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='min_avg_sales_manufacturer'
                    placeholder='Min Avg Sales Manufacturer'
                    value={formData?.min_avg_sales_manufacturer}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Avg Sales Duration
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='avg_sales_duration'
                    placeholder='Avg Sales Duration'
                    value={formData?.avg_sales_duration}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Interval Checking Avg Sales Duration
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='interval_checking_avg_sales_duration'
                    placeholder='Interval Checking Avg Sales Duration'
                    value={formData?.interval_checking_avg_sales_duration}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Max Limit No Trade License
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='max_limit_no_trade_license'
                    placeholder='Max LimitNo Trade License'
                    value={formData?.max_limit_no_trade_license}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Max Limit No Security Cheque
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='max_limit_no_security_cheque'
                    placeholder='Max Limit No Security Cheque'
                    value={formData?.max_limit_no_security_cheque}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Multiplying Factor
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='multiplying_factor'
                    placeholder='Multiplying Factor'
                    value={formData?.multiplying_factor}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        <div className="form-group row">
                <label className="col-xl-3 col-lg-3 text-left col-form-label">
                Interest Capitalisaion Period
                </label>
                <div className="col-lg-9 col-xl-9">
                <input
                    className="form-control form-control-lg form-control-solid"
                    type='number'
                    name='interest_capitalisaion_period'
                    placeholder='Interest Capitalisaion Period'
                    value={formData?.interest_capitalisaion_period}
                    onChange={(e) => {handleChange(e)}}
                    disabled={props.globalSchemaDisable}

                    />
                </div>
        </div>
        {!props.globalSchemaDisable && <div className="mb-3 row justify-content-center">
            <div className="">
                <Button className="pt-3 mt-3" style={{width:'200px',margin:'auto'}} type="submit" color="primary"> Save</Button>
            </div>
        </div>}
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

export default SaveGlovalSchema;
