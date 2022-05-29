import React, { useEffect, useRef, useState } from "react";
  import {
    Card,
    Col,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Container,
    CardBody,
    CardTitle,
    Button,
    Input
  } from "reactstrap"
import classnames from "classnames"
import { getDIstributorWIthManuID, getGlobalSchema, getRetailerrWIthDistID, saveRetailerSchema, schemaSave } from "../../services/Schema/Schema";
import { Link } from "react-router-dom"
import styles from './Schema.module.css';
import { baseURL } from "../../constants/constants";
import axios from 'axios';
import ShowAllSchemaModal from "./ShowAllSchemaModal";
import { useAlert } from 'react-alert';
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import SaveGlovalSchema from "./SaveGlovalSchema";
import ReactPaginate from "react-paginate";

const validateNumberPositive = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);
const validateNumberPositiveDe = new RegExp(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);


const DATA_TABLE_URL = baseURL+'scheme/list';
const DATA_TABLE_URL_MANUFACTURE = baseURL+'manufacturer/manufacturers';


function CreateSchema(props) {
    const form = useRef(null);
    const alert = useAlert();
    const [activeTab, toggleTab] = useState("0");
    const [dataScheme, setData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [lastPage, setlastPage] = useState(0);
    const [perPage, setPerPage] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [modal, setModal] = useState(false);
    const [updatableRow, setUpdatableRow] = useState();
    const [onEye, setOnEye] = useState(false);
    const [saveGlobalSchema, setsaveGlobalSchema] = useState(false);
    const [date, setDate] = useState("");
    const [errors, setError] = useState({});
    const [globalSchemaDisable , setGlobalSchemaDisable] = useState(false);
    const [globalSchemaAllVAlue , setglobalSchemaAllVAlue] = useState([]);
    const [manufactureAllData , setManufactureAllData] = useState([]);
    const [ManuId , setManuId] = useState();
    const [lastPageDistributor, setlastPageDistributor] = useState(10);
    const [perPageDistributor, setPerPageDistributor] = useState(10);
    const [activePageDistributor, setactivePageDistributor] = useState(1);
    const [dataDistributor, setDataDistributor] = useState([]);
    const [distributirID, setdistributirID] = useState('');
    const [lastPageRetailer, setlastPageRetailerr] = useState(0);
    const [activePageRetailer, setactivePageRetailer] = useState(1);
    const [perPageRetailer, setPerPageRetailer] = useState(10);
    const [dataRetailer, setDataRetailer] = useState([]);
    const [checkRetailerrData, setCheckRetailerData] = useState([]);
    const [DisableOption, setDisableOption] = useState([]);
    const [checkAllRetailer, setcheckAllRetailer] = useState([false]);
    

    const [formData , setFormData] = useState({
        scheme_name:'',
        rate_of_interest:0,
        loan_tenor_in_days:0,
        expiry_date:'',
        grace_periods_in_days:0,
        penalty_periods:0,
        daily_penalty:0,
        processing_cost:0,
        transaction_fee:0,
        collection_fee_sharing_with_agency:0,
    })

    const [validation, setValidation] = useState({
        scheme_name:'',
        rate_of_interest:0,
        loan_tenor_in_days:0,
        expiry_date:'',
        grace_periods_in_days:0,
        penalty_periods:0,
        daily_penalty:0,
        processing_cost:0,
        transaction_fee:0,
        collection_fee_sharing_with_agency:0,
      })
    
    const handleChange =(e)=>{
        if(e.target.name == 'scheme_name'){
           setFormData({ ...formData, [e.target.name]:e.target.value  })
           checkFieldisvalid(e.target.name , e.target.value)
        }else if(e.target.name == 'expiry_date'){
            setFormData({ ...formData, [e.target.name]:e.target.value  })
            checkFieldisvalid(e.target.name , e.target.value)
        }else{
            setFormData({ ...formData, [e.target.name]:parseInt(e.target.value ) })
             checkFieldisvalid(e.target.name , parseInt(e.target.value))
        }
        console.log('formdataformdata', formData)
    }

    const handleDateChange = (selectedDates, dateStr, instance,valueALl) => {
      // let fromdata = { ...formData };
      const { name, value } = instance.input
      checkFieldisvalid(name, value);
      // setFormData({ ...fromdata, [name]: value })
      setDate(value)
    }
  

    const handleSubmit = (e) =>{
          e.preventDefault();
          const validation = handleVaidation()
          if(!validation){
            formData.expiry_date = date
            let schemaValue = schemaSave(formData)
            if(schemaValue){
              alert.success('Schema updated Successfully');
              setFormData('')
              form.current.reset();
            }
            
          }else{

          }
         
    }

    const getSchemaInfo = async (activePage=1) => {
        setIsLoading(true);
        var token = localStorage.getItem("token");
        await axios.get(DATA_TABLE_URL, {"page": activePage,"per_page": perPage}, {headers: {
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }})
        .then(res => {
            setData(res?.data?.data);
            setlastPage(res?.data?.data?.pagination?.lastPage)
            res.data.success ? setShowTable(true) : setShowTable(false);
        }).catch(err => {
            setData({});
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getSchemaInfo();
        getAllManufacture();
    }, []);
    const toggle = () => setModal(!modal);

    const handleShowEye = (row) => {
        setUpdatableRow(row);
        setOnEye(true);
        toggle();
    };

    const handleVaidation = () => {
      // const modifiedV = { ...validation }
      let newError = { ...errors };
      let value = false
      if (formData.scheme_name === "") {
          value=true
          newError['scheme_name'] =  'Select scheme_name';
        } else {
          value=false
        }
    
        if (formData.rate_of_interest < 0) {
          value=true
          newError['rate_of_interest'] =  'Rate of interest value should be positive';
        } else {
        }
    
        if (formData.loan_tenor_in_days < 0) {
          value=true
          newError['loan_tenor_in_days'] =  'Loan tenor in days value should be positive';
        } else {
        }
    
        if (date === "") {
          value=true
          newError['expiry_date'] =  'Select expiry_date';
        } else {
        }
    
        if (formData.processing_cost < 0) {
          value=true
          newError['processing_cost'] =  'Processing cost value should be positive';
        } else {
        }
        if (formData.transaction_fee < 0) {
          value=true
          newError['transaction_fee'] =  'Transaction fee value should be positive';
        } else {
        }
        if (formData.collection_fee_sharing_with_agency < 0) {
          value=true
          newError['collection_fee_sharing_with_agency'] =  'Collection fee sharing with agency value should be positive';
        } else {
        }
      setError(newError);
        return value
    }

    const handleShemaSave = (row) => {
      setglobalSchemaAllVAlue([])
      setGlobalSchemaDisable(false)
      setUpdatableRow(row);
      setsaveGlobalSchema(true);
      toggle();
    };

    const checkFieldisvalid = (name, value) => {
        let newError = { ...errors };
        switch (name) {
            case 'scheme_name':
                newError[name] = value.trim().length < 3 ? 'Select Scheme Name' : '';
                break;
            case 'rate_of_interest':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Rate of interest value should be positive';
                break;
            case 'loan_tenor_in_days':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' :'Loan tenor in_days value should be positive' ;
                break;
            case 'expiry_date':
                newError[name] = value.trim().length < 4 ? 'Please Select a expiry date.' : '';
                break;
            case 'grace_periods_in_days':
                newError[name] =validateNumberPositive.test(parseInt(value)) ? '' : 'Grace periods in days value should be positive';
                break;
            case 'penalty_periods':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Penalty periods value should be positive';
                break;
            case 'daily_penalty':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Daily penalty value should be positive';
                break;
            case 'processing_cost':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Processing cost value should be positive';
                break;
            case 'transaction_fee':
                newError[name] = validateNumberPositive.test(parseInt(value)) ? '' : 'Transaction fee value should be positive';
                break;
            case 'collection_fee_sharing_with_agency':
                newError[name] = validateNumberPositiveDe.test(parseInt(value)) ? '' : 'Collection fee_sharing_with_agency Charge value should be positive';
                break;
            default: break;
        }
        setError(newError);
    }

    const handleShemaShow =async (row) => {
      let value =await getGlobalSchema(row)
      if(value.data.success == true){
        if(!value.data?.data){
          alert.error('No Data Save For This Schema. Please Save global schema for this schema')
        }else{
          setUpdatableRow(row);
          setglobalSchemaAllVAlue(value.data)
          setsaveGlobalSchema(true);
          setGlobalSchemaDisable(true)
          toggle();
        }
      }else{
        alert.erroe('Network Error')
      }
      console.log(value)
    }

    const getAllManufacture =async () => {
      var token = localStorage.getItem("token");
      await axios.get(DATA_TABLE_URL_MANUFACTURE, {params:  {"page": activePage,"per_page": perPage}  }, {headers: {
                  // Accept: "application/json",
                  // "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
              }})
      .then(res => {
          setManufactureAllData(res?.data?.data.data);
      }).catch(err => {
          setData({});
      });
    }

    const handleManufactureChange =async (e , activePageDistributorInfo = activePageDistributor) =>{
     setManuId(e?.target?.value)
     let distiValue =await getDIstributorWIthManuID(e?.target?.value ?? ManuId , activePageDistributorInfo , perPageDistributor)
     if(distiValue?.data?.data.data.length > 0){
      setDataDistributor(distiValue?.data?.data.data)
       setlastPageDistributor(distiValue?.data?.data?.pagination?.lastPage);
     }else{
      setDataDistributor([])
      setlastPageDistributor(0);
       alert.error('No Distributor Found For This Manufacturer')
     }
    }

   const getRetailerList =async (id) =>{
     if(distributirID == id){
      setdistributirID(0)
      setDataRetailer([])
     }else{
      setdistributirID(id)
      let retailerValue =await getRetailerrWIthDistID(id , activePageRetailer , perPageRetailer)
      if(retailerValue?.data?.data?.data?.length > 0){
        setDataRetailer(retailerValue?.data?.data.data)
        setlastPageRetailerr(retailerValue?.data?.data?.pagination?.lastPage)
      }else{
        setDataRetailer([])
        alert.error('No Retailer Found For This Distributor')
      }
     }
   }

   const getRetailerListPagination =async (id = distributirID ,activePageRetailerInfo = activePageRetailer ) =>{
      let retailerValue =await getRetailerrWIthDistID(id , activePageRetailerInfo , perPageRetailer)
      if(retailerValue?.data?.data?.data?.length > 0){
        setDataRetailer(retailerValue?.data?.data.data)
        setlastPageRetailerr(retailerValue?.data?.data?.pagination?.lastPage)
      }else{
        setDataRetailer([])
        alert.error('No Retailer Found For This Distributor')
      }

   }

  
  const handlePageClickDistributor = (e) => {
    setactivePageDistributor(e.selected +1)
    handleManufactureChange()
  }

  const handlePageClickRetailer = (e) => {
    setactivePageRetailer(e.selected +1)
    getRetailerListPagination(distributirID , e.selected +1)
  }

  const getRetailerCheck = (id) => {
    if(checkRetailerrData.includes(id)){
      let checkRetailerValue = [...checkRetailerrData]
      const  index = checkRetailerValue.findIndex(x=> x === id); 
      checkRetailerValue.splice(index,1)  // first positon , second delete and thrid number
      setCheckRetailerData(checkRetailerValue)
    }else{
      let checkRetailerValue = [...checkRetailerrData]
      checkRetailerValue.push(id)
      setCheckRetailerData(checkRetailerValue)
    }
  
  }

  const handleSaveScheme =async (schemeId , retailerID) =>{
    let saveValue =await saveRetailerSchema(schemeId , [retailerID])
    if(saveValue.data.success == true){
      alert.success('Schema Update Successfully')
    }
        
  }

  
  const handleSaveMultiScheme =async (schemeId) =>{
  let saveValue =await saveRetailerSchema(schemeId , checkRetailerrData)
  if(saveValue.data.success == true){
    alert.success('Schema Update Successfully')
    getRetailerListPagination()
  }
       
  }

  const getRetailerCheckAll = () => {
    if(!checkAllRetailer[activePageRetailer-1]){
      let checkRetailerIndex = [...checkAllRetailer]
      checkRetailerIndex.splice(activePageRetailer-1,1,true)
      setcheckAllRetailer(checkRetailerIndex)
      let checkRetailerValue = [...checkRetailerrData]
      dataRetailer.map((data)=>{
        checkRetailerValue.push(data.id)
      })
      setCheckRetailerData(checkRetailerValue)
    }else{
      let checkRetailerIndex = [...checkAllRetailer]
      checkRetailerIndex.splice(activePageRetailer-1,1,false)
      setcheckAllRetailer(checkRetailerIndex)
      setCheckRetailerData([])
    }
  }

  const shcemaListToggle = () => {
          toggleTab("2")
          getSchemaInfo()
  }

  return (
    <React.Fragment>
     <Container fluid>
      <Row>
        <Col xl={12} lg={12}>
          <Card>
            <ul
              className="nav nav-tabs nav-tabs-custom justify-content-left pt-2"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  to="#"
                  className={classnames({
                    active: activeTab === "0",
                  })}
                  onClick={() => {
                    toggleTab("0")
                  }}
                >
                 Schema Manager
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggleTab("1")
                  }}
                >
                  Create Schema
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    shcemaListToggle("2")
                    // toggleTab("2")
                  }}
                >
                  Schema List
                </NavLink>
              </NavItem>
            </ul>

            <TabContent className="p-4" activeTab={activeTab}>
              
              <TabPane tabId="0">
                <div>
                <div className="mb-3 row">
                    <label
                    htmlFor="example-email-input"
                    className="col-md-2 col-form-label"
                    >
                    All Manufacture List
                    </label>
                    <div className="col-md-3">
                        <Input type="select" className="form-select" name='module' id="autoSizingSelect" onChange={(e) => {
                            handleManufactureChange(e)
                        }}>
                            <option defaultValue = '0'>Choose Manufacture</option>
                            {
                            manufactureAllData && manufactureAllData.length > 0 && manufactureAllData.map((manuValue)=>{
                              return <option value={manuValue.id}>{manuValue.manufacturer_name}</option>
                              })
                            }
                        </Input>
                    </div>
                </div>
                  
              {
                dataDistributor && dataDistributor.length > 0 &&
                  <div className={styles.generatedContent}>
                        <div className={`${styles.tableWrapper} table-responsive`}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sl.</th>
                                        <th>Select</th>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Email</th>
                                        <th>Official Division</th>
                                        <th>Official Contact Number</th>
                                        <th>Official Address</th>
                                        <th>Officie District</th>

                                        {/* <th>Distributor Code</th>
                                        <th>Distributor Tin</th>
                                        <th>Official Email</th>
                                        <th>Region Of Operation</th>
                                        <th>Author Email</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataDistributor && dataDistributor.length>0 &&  dataDistributor?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={styles.valueText}>{index+1 + (activePage-1) *10}.</td>
                                                <td className={styles.valueText}>
                                                  <input
                                                      type="checkbox"
                                                      id="customSwitchsizelg"
                                                      checked={distributirID == data.distributor_id ? true : false}
                                                      onClick={() => {
                                                          getRetailerList(data.distributor_id)
                                                      }}
                                                  /></td>
                                                <td className={styles.valueText}>{data?.distributor_name}</td>
                                                <td className={styles.valueText}>{data?.distributor_code}</td>
                                                <td className={styles.valueText}>{data?.official_email}</td>
                                                <td className={styles.valueText}>{data?.ofc_division}</td>
                                                <td className={styles.valueText}>{data?.official_contact_number}</td>
                                                <td className={styles.valueText}>{data?.ofc_address1}</td>
                                                <td className={styles.valueText}>{data?.ofc_district}</td>

                                                {/* <td className={styles.valueText}>{data?.distributor_code}</td>
                                                <td className={styles.valueText}>{data?.distributor_tin}</td>
                                                <td className={styles.valueText}>{data?.official_email}</td>
                                                <td className={styles.valueText}>{data?.region_of_operation}</td>
                                                <td className={styles.valueText}>{data?.autho_rep_email}</td> */}  
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div style={{margin: 'auto',width: '30%',paddingBottom:'15px'}}>
                        <ReactPaginate
                                breakLabel="..."
                                nextLabel="next &raquo;"
                                onPageChange={handlePageClickDistributor}
                                pageRangeDisplayed={10}
                                pageCount={lastPageDistributor}
                                forcePage={activePageDistributor-1}
                                previousLabel="&laquo; prev"
                                renderOnZeroPageCount={null}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                    </div>               
                  </div>
                }


                {
                dataRetailer && dataRetailer.length > 0 &&
                <div className={styles.generatedContent}>
                        <div className={`${styles.tableWrapper} table-responsive`}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sl.</th>
                                        <th>
                                            <span className='mr-3'>
                                              <input
                                                  type="checkbox"
                                                  checked={checkAllRetailer[activePageRetailer-1] ? true : false}
                                                  onClick={() => {
                                                      getRetailerCheckAll(dataRetailer)
                                                  }}
                                              />
                                              <span className='ml-3'>Select</span>
                                            </span>
                                            
                                        </th>
                                        <th>
                                          {
                                            checkRetailerrData.length > 0 ? 
                                            <Input type="select" className="form-select" name='module' id="autoSizingSelect" 
                                                    onChange={(e) => {
                                                          handleSaveMultiScheme(e.target.value)
                                                      }} 
                                                    >
                                                        <option defaultValue = '0'>Choose Scheme</option>
                                                        {
                                                            dataScheme && dataScheme.length >0 &&  dataScheme?.map((schemeValue)=>{
                                                          return  <option value={schemeValue.id}>{schemeValue.scheme_name}</option>
                                                          })
                                                        }
                                            </Input>
                                            :
                                            'Select Schema'
                                          }
                                          
                                        </th>
                                        {/* <th>Scheme Id</th> */}
                                        <th>Retailer Code</th>
                                        <th>Retailer Name</th>
                                        {/* <th>Retailer Id</th> */}
                                        <th>Master Account Number</th>
                                        <th>Author Rep Full Name</th>
                                        <th>Author Rep Phone</th>
                                        <th>Region Operation</th>
                                        
                                        {/* <th>Ac Number 1rmn</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataRetailer && dataRetailer.length>0 &&  dataRetailer?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className={styles.valueText}>{index+1 + (activePageRetailer-1) *10}.</td>
                                                <td className={styles.valueText}>
                                                  <input
                                                      type="checkbox"
                                                      checked={checkRetailerrData.includes( data.id) ? true : false}
                                                      onClick={() => {
                                                          getRetailerCheck(data.id)
                                                      }}
                                                  /></td>
                                              { 
                                              checkRetailerrData.length > 0 ? <td> {data?.scheme_name} </td> :
                                              <td className={styles.valueText}>
                                                <Input type="select" className="form-select" name='module' id="autoSizingSelect" 
                                                  onChange={(e) => {
                                                        handleSaveScheme(e.target.value ,data.id )
                                                    }} 
                                                  >
                                                  
                                                        <option defaultValue = '0'>{data?.scheme_name ? data?.scheme_name : 'Choose Scheme'}</option>
                                                      
                                                        {
                                                          
                                                      dataScheme && dataScheme.length >0 &&  dataScheme?.map((schemeValue)=>{
                                                          return schemeValue.scheme_name !=data?.scheme_name && <option value={schemeValue.id}>{schemeValue.scheme_name}</option>
                                                          })
                                                        }
                                                  </Input>
                                                </td>                                            
                                                
                                              }
                                                
                                                {/* <td className={styles.valueText}>{data?.scheme_id}</td> */}
                                                <td className={styles.valueText}>{data?.retailer_code}</td>
                                                <td className={styles.valueText}>{data?.retailer_name}</td>
                                                {/* <td className={styles.valueText}>{data?.retailer_id}</td> */}
                                                <td className={styles.valueText}>{data?.ac_number_1rn}</td>
                                                {/* <td className={styles.valueText}>{data?.ac_number_1rmn}</td> */}
                                                <td className={styles.valueText}>{data?.autho_rep_full_name}</td>
                                                <td className={styles.valueText}>{data?.autho_rep_phone}</td>
                                                <td className={styles.valueText}>{data?.region_operation}</td>

                                                
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div style={{margin: 'auto',width: '30%',padding:'15px'}}>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next &raquo;"
                                onPageChange={handlePageClickRetailer}
                                pageRangeDisplayed={10}
                                pageCount={lastPageRetailer}
                                forcePage={activePageRetailer-1}
                                previousLabel="&laquo; prev"
                                renderOnZeroPageCount={null}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                            </div>
                        </div>               
                  </div>
                }
                </div>
              </TabPane>

              <TabPane tabId="1">
                <div>
                  <Row className="justify-content-center">
                  
                <Col xl={10} md={10}>
                  <Card>
                    <CardBody>
                    <CardTitle className="h4">Create Schema</CardTitle>
                    <form ref={form} onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                                Scheme Name
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={formData.scheme_name ?? 0}
                                    name = 'scheme_name'
                                    placeholder="Enter Scheme Nme"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.scheme_name?.length > 0 && <span style={{color:'red'}}>Please Enter Valid Schema Name</span> 
                                }
                                
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                                Rate Of Interest
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.rate_of_interest ?? 0}
                                    name = 'rate_of_interest'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.rate_of_interest?.length > 0 && <span style={{color:'red'}}>{errors?.rate_of_interest}</span> 
                                }
                            </div>
                        </div>
                    

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                                Loan Tenor In Days
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.loan_tenor_in_days ?? 0}
                                    name = 'loan_tenor_in_days'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.loan_tenor_in_days?.length > 0 && <span style={{color:'red'}}>{errors?.loan_tenor_in_days}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Expiry Date
                            </label>
                            <div className="col-md-10">
                              <Flatpickr
                                  className="form-control d-block"
                                  placeholder="Day Month,Year"
                                  options={{
                                      altInput: true,
                                      // altFormat: "F j, Y",
                                      altFormat: "Y/m/d",
                                      dateFormat: "Y-m-d",
                                      minDate: "today"
                                  }}
                                  name="expiry_date"
                                  // defaultDate={Date.now().toString()}
                                  value={formData.expiry_date}
                                  onChange={(selectedDates, dateStr, instance)=>
                                    handleDateChange(selectedDates, dateStr, instance)
                                }
                              />
                                {
                                errors?.expiry_date?.length > 0 && <span style={{color:'red'}}>{errors?.expiry_date}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Grace Periods In Days
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.grace_periods_in_days ?? 0}
                                    name = 'grace_periods_in_days'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.grace_periods_in_days?.length > 0 && <span style={{color:'red'}}>{errors?.grace_periods_in_days}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Penalty Periods
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.penalty_periods ?? 0}
                                    name = 'penalty_periods'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.penalty_periods?.length > 0 && <span style={{color:'red'}}>{errors?.penalty_periods}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Daily Penalty 
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.daily_penalty ?? 0}
                                    name = 'daily_penalty'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.daily_penalty?.length > 0 && <span style={{color:'red'}}>{errors?.daily_penalty}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Processing Cost 
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.processing_cost ?? 0}
                                    name = 'processing_cost'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.processing_cost?.length > 0 && <span style={{color:'red'}}>{errors?.processing_cost}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                          Transaction Fee
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.transaction_fee ?? 0}
                                    name = 'transaction_fee'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.transaction_fee?.length > 0 && <span style={{color:'red'}}>{errors?.transaction_fee}</span> 
                                }
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                            >
                            Collection Fee Sharing With Agency
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={formData.collection_fee_sharing_with_agency ?? 0}
                                    name = 'collection_fee_sharing_with_agency'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                                {
                                errors?.collection_fee_sharing_with_agency?.length > 0 && <span style={{color:'red'}}>{errors?.collection_fee_sharing_with_agency}</span> 
                                }
                            </div>
                        </div>
                        <div className="mb-3 row justify-content-center">
                          <div className="">
                            <Button className="pt-3 mt-3" style={{width:'200px',margin:'auto'}} type="submit" color="primary"> Save</Button>
                          </div>
                        </div>

                      </form>

                    </CardBody>
                      
                </Card>
                
                
                  </Col>
                  </Row>
                </div>
              </TabPane>

              <TabPane tabId="2">
                <div>
                  <Row className="justify-content-center">
                    <Col xl={12} md={12}>
                       <div>
                            {
                            // showTable &&
                                <div className={styles.generatedContent}>
                                    <div className={`${styles.tableWrapper} table-responsive`}>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sl.</th>
                                                    <th>Scheme Name</th>
                                                    <th>Loan Tenor In Days</th>
                                                    <th>Expiry Date</th>
                                                    <th>Grace Periods In Days</th>
                                                    <th>Rate of Interest</th>
                                                    <th>Penalty Periods</th>
                                                    <th>Daily Penalty</th>
                                                    <th>Processing Cost</th>
                                                    <th>Transaction Fee</th>
                                                    <th>Collection Fee Sharing With Agency</th>
                                                    <th>Action</th>
                                                    <th>Schema Parameter Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {dataScheme && dataScheme.length>0 &&  dataScheme?.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={styles.valueText}>{index+1 + (activePage-1) *10}.</td>
                                                            <td className={styles.valueText}>{data?.scheme_name}</td>
                                                            <td className={styles.valueText}>{data?.loan_tenor_in_days}</td>
                                                            <td className={styles.valueText}>{data?.expiry_date?.split('T')[0]}</td>
                                                            <td className={styles.valueText}>{data?.grace_periods_in_days}</td>
                                                            <td className={styles.valueText}>{data?.rate_of_interest}</td>
                                                            <td className={styles.valueText}>{data?.penalty_periods}</td>
                                                            <td className={styles.valueText}>{data?.daily_penalty}</td>
                                                            <td className={styles.valueText}>{data?.processing_cost}</td>
                                                            <td className={styles.valueText}>{data?.transaction_fee}</td>
                                                            <td className={styles.valueText}>{data?.collection_fee_sharing_with_agency}</td>


                                                            <td className={styles.valueText}> 
                                                                <Link
                                                                    className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom"
                                                                    title="Delete"
                                                                    onClick={() => handleShowEye(data)}
                                                                >
                                                                    <i className="la la-eye text-dinfoanger"></i>
                                                                </Link>
                                                            </td>
                                                            <td className={styles.valueText}> 
                                                            <Link
                                                                    className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom"
                                                                    title="Delete"
                                                                    onClick={() => handleShemaSave(data)}
                                                                >
                                                                    <i className="la la-plus text-dinfoanger"></i>
                                                                </Link>
                                                                <Link
                                                                    className="btn btn-sm btn-clean btn-icon"
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom"
                                                                    title="Delete"
                                                                    onClick={() => handleShemaShow(data)}
                                                                >
                                                                    <i className="la la-eye text-dinfoanger"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                  
                                </div>
                            }
                        </div>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      {onEye && (
          <ShowAllSchemaModal
          modalTitle="Show All"
          btnName="Update"
          toggle={toggle}
          modal={modal}
          defaultValue={updatableRow}
          />
      )}

      {saveGlobalSchema && (
            <SaveGlovalSchema
            modalTitle="Save Global Schema"
            btnName="Save Global Schema"
            toggle={toggle}
            modal={modal}
            defaultValue={updatableRow}
            globalSchemaDisable = {globalSchemaDisable}
            globalSchemaAllVAlue={globalSchemaAllVAlue}
            />
        )}
     </Container>
  </React.Fragment>
    
  );
}

export default CreateSchema;