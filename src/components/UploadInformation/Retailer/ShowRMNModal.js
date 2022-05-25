import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import produce from "immer";
import { updateLimitValue } from "../../../services/Schema/Schema";


const validateNumberPositive = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);
const validateNumberPositiveDe = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);

function ShowRMNModal(props) {
    const form = useRef(null);
  const [defaultValue, setDefaultValue] = useState(props.defaultValue);
  
  const alert = useAlert();
  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({});
  const [showSBtnPro , setshowSBtnPro] = useState([])
  const [showCBtnPro , setshowCBtnPro] = useState([])

  const handleUpdate = () => {
    if (props.handleUpdate) {
      props.handleUpdate();
    }
  };


  useEffect(() => {
    // setDefaultValue(props.getRmnAccount);
    if(props.getRmnAccount){
        setFormData(props.getRmnAccount)
          let checkShowLimit = [...showSBtnPro]
            props.getRmnAccount && props.getRmnAccount.map((data)=>{
              checkShowLimit.push(false)
            })
            setshowSBtnPro(checkShowLimit)
            setshowCBtnPro(checkShowLimit)
        setError({})
    }else{
       
    }
  }, [props.defaultValue,props.getRmnAccount]);

  const handleChangeProposeLimit = async (e , data , index) => {
         console.log(e , data , index)
         let checkshowSBtnProIndex = [...showSBtnPro]
         checkshowSBtnProIndex.splice(index,1,true)
         setshowSBtnPro(checkshowSBtnProIndex)
         if (formData.length <= 0) {
          return;
      }
      let draftName;
      const modifiedItemData = produce(formData, draft => {
           draftName = draft.find(draftEvent => draftEvent.ac_number_1rmn == parseInt(data.ac_number_1rmn));
          draftName[e.target.name] = e.target.value;
      })
      await setFormData(modifiedItemData);
  }

  const handleChangeApproveLimit =async (e , data , index) => {
        let checkshowCBtnProProIndex = [...showCBtnPro]
        checkshowCBtnProProIndex.splice(index,1,true)
        setshowCBtnPro(checkshowCBtnProProIndex)
      let draftName;
        const modifiedItemData = produce(formData, draft => {
          draftName = draft.find(draftEvent => draftEvent.ac_number_1rmn == parseInt(data.ac_number_1rmn));
         draftName[e.target.name] = e.target.value;
      })
      await setFormData(modifiedItemData);
  }

  const handleSaveProposeLimit =async (data , index) => {
      let dataValue = {...data}
      dataValue.type= 'ProposeLimit'
      console.log(data)
      let value =await updateLimitValue(dataValue)
      if(value.data.success){
        alert.success('Propose Limit Update Successfully')
        let checkshowSBtnProIndex = [...showSBtnPro]
         checkshowSBtnProIndex.splice(index,1,false)
         setshowSBtnPro(checkshowSBtnProIndex)
      }else{
        alert.error('Network Error')
      }
  }

  const handleSaveCRMLimit =async (data , index) => {
    let dataValue = {...data}
    dataValue.type= 'NotProposeLimit'
      console.log(data)
      let value =await updateLimitValue(dataValue)
      if(value.data.success){
        alert.success('Propose Limit Update Successfully')
        let checkshowCBtnProProIndex = [...showCBtnPro]
        checkshowCBtnProProIndex.splice(index,1,true)
        setshowCBtnPro(checkshowCBtnProProIndex)
      }else{
        alert.error('Network Error')
      }  }
  
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
                        <th scope="col">Propose Limit</th>
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
                                            <input
                                            className="form-control form-control-lg form-control-solid"
                                            type='number'
                                            name='propose_limit'
                                            placeholder='Propose limit'
                                            value={data?.propose_limit}
                                            onChange={(e) => {handleChangeProposeLimit(e , data , index)}}
                                            />
                                           {
                                            showSBtnPro[index] && 
                                              <Button
                                                      type="button"
                                                      color="primary"
                                                      className="btn-sm m-1 btn-rounded row"
                                                      onClick={(e) => {handleSaveProposeLimit(data , index)}}
                                                  >
                                                      Save
                                              </Button>
                                            }
                                          
                                        </div>
                                      </th>

                                      <th scope="row">
                                        <div className="row">
                                           <input
                                              className="form-control form-control-lg form-control-solid"
                                              type='number'
                                              name='crm_approve_limit'
                                              placeholder='Crm Approve Limit'
                                              value={data?.crm_approve_limit}
                                              onChange={(e) => {handleChangeApproveLimit(e , data , index)}}
                                              />
                                             { 
                                             showCBtnPro[index] && 
                                             <Button
                                                    type="button"
                                                    color="primary"
                                                    className="btn-sm m-1 btn-rounded row"
                                                    onClick={(e) => {handleSaveCRMLimit(data , index)}}
                                                >
                                                    Save
                                              </Button>
                                              }
                                          
                                        </div>
                                      </th>
                                      
                                    </tr>
                            )
                          })
                        }
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
