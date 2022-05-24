import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { GlobalVAlueschemaSave } from "../../services/Schema/Schema";
import FormInput from "./../common/formInput";


const validateNumberPositive = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);
const validateNumberPositiveDe = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);

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
  const [errors, setError] = useState({});

  const handleUpdate = () => {
    if (props.handleUpdate) {
      props.handleUpdate();
    }
  };


  useEffect(() => {
    setDefaultValue(props.defaultValue);
    if(props.globalSchemaAllVAlue.length > 0){
        setFormData(props.globalSchemaAllVAlue[0])
        setError({})
    }else{
        setFormData({
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
    }
  }, [props.defaultValue,props.globalSchemaAllVAlue]);

  const handleChange =(e)=>{
        setFormData({ ...formData, [e?.target?.name]:parseInt(e?.target?.value ) })
        checkFieldisvalid(e?.target?.name , e?.target?.value)
}

const handleSubmit = async  (e) =>{
      e.preventDefault();
      const validationValue =await handleVaidation()
      if(!validationValue){
        debugger
        formData.scheme_id = defaultValue.id
        let response =await GlobalVAlueschemaSave(formData)
        debugger
        if(response.data.success == true){
          alert.success('Global Schema updated Successfully');
          setFormData('')
          form.current.reset();
          props.toggle()
        }else{
          alert.error(response.data.message);
        }
      }
      
      
}

const checkFieldisvalid = (name, value) => {
    let newError = { ...errors };
    switch (name) {
        case 'uninterrupted_sales':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Select Uninterrupted Sales';
            break;
        case 'intrvl_check_uninterrupt_sales':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'intrvl_check_uninterrupt_sales value should be positive';
            break;
        case 'max_credit_limit_all':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' :'max_credit_limit_all in_days value should be positive' ;
            break;
        case 'max_credit_limit_by_manufacturer':
            newError[name] =validateNumberPositive.test(parseInt(value)) ? '' : 'max_credit_limit_by_manufacturer value should be positive';
            break;
        case 'min_avg_sales_manufacturer':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'min_avg_sales_manufacturer value should be positive';
            break;
        case 'avg_sales_duration':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'avg_sales_duration value should be positive';
            break;
        case 'interval_checking_avg_sales_duration':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'interval_checking_avg_sales_duration value should be positive';
            break;
        case 'max_limit_no_trade_license':
            newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'max_limit_no_trade_license value should be positive';
            break;
        case 'max_limit_no_security_cheque':
            newError[name] = validateNumberPositiveDe.test(parseInt(value)) ? '' : ' max_limit_no_security_cheque Charge value should be positive';
            break;
        case 'multiplying_factor':
            newError[name] = validateNumberPositiveDe.test(parseInt(value)) ? '' : 'multiplying_factor Charge value should be positive';
            break;
        case 'interest_capitalisaion_period':
            newError[name] = validateNumberPositiveDe.test(parseInt(value)) ? '' : 'interest_capitalisaion_period Charge value should be positive';
            break;
        default: break;
    }
    setError(newError);
}

const handleVaidation = () => {
    // const modifiedV = { ...validation }
    let newError = { ...errors };
    let value = false
    if (formData.uninterrupted_sales <= 0) {
        value=true
        newError['uninterrupted_sales'] =  'Select uninterrupted_sales';
      } else {
        value=false
      }
  
      if (formData.rate_ofintrvl_check_uninterrupt_sales_interest <= 0) {
        value=true
        newError['intrvl_check_uninterrupt_sales'] =  'intrvl_check_uninterrupt_sales value should be positive';
      } else {
      }
  
      if (formData.max_credit_limit_all <= 0) {
        value=true
        newError['max_credit_limit_all'] =  'max_credit_limit_all value should be positive';
      } else {
      }
  
  
      if (formData.max_credit_limit_by_manufacturer <= 0) {
        value=true
        newError['max_credit_limit_by_manufacturer'] =  'max_credit_limit_by_manufacturer value should be positive';
      } else {
      }
      if (formData.min_avg_sales_manufacturer <= 0) {
        value=true
        newError['min_avg_sales_manufacturer'] =  'min_avg_sales_manufacturer value should be positive';
      } else {
      }
      if (formData.avg_sales_duration <= 0) {
        value=true
        newError['avg_sales_duration'] =  'avg_sales_duration sharing with agency value should be positive';
      } else {
      }
      if (formData.interval_checking_avg_sales_duration <= 0) {
        value=true
        newError['interval_checking_avg_sales_duration'] =  'interval_checking_avg_sales_duration sharing with agency value should be positive';
      } else {
      }
      if (formData.max_limit_no_trade_license <= 0) {
        value=true
        newError['max_limit_no_trade_license'] =  'max_limit_no_trade_license sharing with agency value should be positive';
      } else {
      }
      if (formData.max_limit_no_security_cheque <= 0) {
        value=true
        newError['max_limit_no_security_cheque'] =  'max_limit_no_security_cheque sharing with agency value should be positive';
      } else {
      }
      if (formData.multiplying_factor <= 0) {
        value=true
        newError['multiplying_factor'] =  'multiplying_factor sharing with agency value should be positive';
      } else {
      }
      if (formData.interest_capitalisaion_period <= 0) {
        value=true
        newError['interest_capitalisaion_period'] =  'interest_capitalisaion_period sharing with agency value should be positive';
      } else {
      }
    setError(newError);
      return value
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
        ref={form} 
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
                     {
                             errors?.uninterrupted_sales?.length > 0 && <span style={{color:'red'}}>Please Enter Valid uninterrupted_sales</span> 
                    }
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
                    {
                             errors?.intrvl_check_uninterrupt_sales?.length > 0 && <span style={{color:'red'}}>Please Enter Valid intrvl_check_uninterrupt_sales</span> 
                    }
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
                     {
                        errors?.max_credit_limit_all?.length > 0 && <span style={{color:'red'}}>Please Enter max_credit_limit_all</span> 
                     }
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
                      {
                        errors?.max_credit_limit_by_manufacturer?.length > 0 && <span style={{color:'red'}}>Please Enter max_credit_limit_by_manufacturer</span> 
                     }
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
                     {
                        errors?.min_avg_sales_manufacturer?.length > 0 && <span style={{color:'red'}}>Please Enter min_avg_sales_manufacturer</span> 
                     }
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
                     {
                        errors?.avg_sales_duration?.length > 0 && <span style={{color:'red'}}>Please Enter avg_sales_duration</span> 
                     }
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
                     {
                        errors?.interval_checking_avg_sales_duration?.length > 0 && <span style={{color:'red'}}>Please Enter interval_checking_avg_sales_duration</span> 
                     }
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
                    {
                        errors?.max_limit_no_trade_license?.length > 0 && <span style={{color:'red'}}>Please Enter max_limit_no_trade_license</span> 
                     }
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
                     {
                        errors?.max_limit_no_security_cheque?.length > 0 && <span style={{color:'red'}}>Please Enter max_limit_no_security_cheque</span> 
                     }
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
                     {
                        errors?.multiplying_factor?.length > 0 && <span style={{color:'red'}}>Please Enter multiplying_factor</span> 
                     }
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
                     {
                        errors?.interest_capitalisaion_period?.length > 0 && <span style={{color:'red'}}>Please Enter interest_capitalisaion_period</span> 
                     }
                </div>
        </div>
       
        </form>
      </ModalBody>
      <ModalFooter>
      {props.noCancelBtn ? <></> : (<Button color="secondary"  onClick={props.toggle}>
          Cancel
        </Button>)}
      {!props.globalSchemaDisable && <div className="mb-3  row justify-content-center" onClick={(e)=>handleSubmit(e)}>
            <div className="">
                <Button className="pt-3 mt-3" style={{width:'100px'}} type="submit" color="primary"> Save</Button>
            </div>
        </div>}
       
        
      </ModalFooter>
    </Modal>
  </div>
  );
}

export default SaveGlovalSchema;
