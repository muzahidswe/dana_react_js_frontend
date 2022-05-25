import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";


const validateNumberPositive = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);
const validateNumberPositiveDe = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);

function ShowRMNModal(props) {
    const form = useRef(null);
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
  
  const alert = useAlert();
  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({});


  const handleUpdate = () => {
    if (props.handleUpdate) {
      props.handleUpdate();
    }
  };


  useEffect(() => {
      debugger
    // setDefaultValue(props.getRmnAccount);
    if(props.getRmnAccount){
        setFormData(props.getRmnAccount)
        setError({})
    }else{
       
    }
  }, [props.defaultValue,props.getRmnAccount]);



      


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
      <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">AC Number 1rmn</th>
                    <th scope="col">Manufacturer ID</th>
                    <th scope="col">System Limit</th>
                    <th scope="col">propose Limit</th>
                    <th scope="col">CRM Approve Limit</th>

                  </tr>
                </thead>
                <tbody>
                {formData && formData.length>0 &&  formData?.map((data, index) => {
                            return (
                                <tr>

                                  <th scope="row">
                                    <div>
                                      <h6 className="text-truncate font-size-10">
                                        {data.ac_number_1rmn}
                                      </h6>
                                    </div>
                                  </th>

                                  <th scope="row">
                                    <div>
                                      <h6 className="text-truncate font-size-10">
                                        {data.manufacturer_id}
                                      </h6>
                                    </div>
                                  </th>

                                  <th scope="row">
                                    <div>
                                      <h6 className="text-truncate font-size-10">
                                        {data.system_limit}
                                      </h6>
                                    </div>
                                  </th>

                                  <th scope="row">
                                    <div>
                                      <h6 className="text-truncate font-size-10">
                                        {data.propose_limit}
                                      </h6>
                                    </div>
                                  </th>

                                  <th scope="row">
                                    <div>
                                      <h6 className="text-truncate font-size-10">
                                        {data.crm_approve_limit}
                                      </h6>
                                    </div>
                                  </th>
                                  
                                </tr>
                                
                     )
                })}
                  
                 
                </tbody>
              </Table>
            </div>
      </ModalBody>
      <ModalFooter>
      {props.noCancelBtn ? <></> : (<Button color="secondary"  onClick={props.toggle}>
          Cancel
        </Button>)}
     
       
        
      </ModalFooter>
    </Modal>
  </div>
  );
}

export default ShowRMNModal;
