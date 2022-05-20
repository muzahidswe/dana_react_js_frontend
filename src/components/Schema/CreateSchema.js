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
    Button
  } from "reactstrap"
import classnames from "classnames"
import { schemaSave } from "../../services/Schema/Schema";
import { Link } from "react-router-dom"
import styles from './Schema.module.css';
import { baseURL } from "../../constants/constants";
import axios from 'axios';
import ShowAllSchemaModal from "./ShowAllSchemaModal";
import { useAlert } from 'react-alert';
  

const DATA_TABLE_URL = baseURL+'scheme/list';

function CreateSchema(props) {
    const form = useRef(null);
    const [folderOpen , setFolderOpen] = useState(false)
    const [status , setStatus] = useState(false)
    const [accessForLevel , setaccessForLevel] = useState('None Selected')
    const [accessForUser , setaccessForUser] = useState('None Selected')
    const [folderOpenUser , setfolderOpenUser] = useState(false)
    const [radioButoon , setRadioButton] = useState('Main Menu')
    const [activeTab, toggleTab] = useState("1");
    const [data, setData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [lastPage, setlastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [modal, setModal] = useState(false);
    const [updatableRow, setUpdatableRow] = useState();
    const [onEye, setOnEye] = useState(false);
    const alert = useAlert();

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
    
    const toggleFolder = () =>{
        setFolderOpen(!folderOpen)
    }

    const toggleFolderUser = () =>{
        setfolderOpenUser(!folderOpenUser)
    }

    const handleChange =(e)=>{
        if(e.target.name == 'scheme_name'){
           setFormData({ ...formData, [e.target.name]:e.target.value  })
        }else if(e.target.name == 'expiry_date'){
            setFormData({ ...formData, [e.target.name]:e.target.value  })
        }else{
            setFormData({ ...formData, [e.target.name]:parseInt(e.target.value ) })
        }
    }

    const handleAccessLevel = (e) =>{
        setaccessForLevel(e)
    }

    useEffect(()=>{
       
    },[formData])

    const handleSubmit = (e) =>{
          e.preventDefault();
          schemaSave(formData)
          alert.success('Schema updated Successfully');
        //   toggleTab("2")
            setFormData('')
            form.current.reset();
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
    }, []);
    const toggle = () => setModal(!modal);

    const handleShowEye = (row) => {
        setUpdatableRow(row);
        setOnEye(true);
        toggle();
      };
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
                active: activeTab === "1",
              })}
              onClick={() => {
                toggleTab("1")
              }}
            >
              SAVE SCHEMA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="#"
              className={classnames({
                active: activeTab === "2",
              })}
              onClick={() => {
                toggleTab("2")
              }}
            >
              SCHEMA LIST
            </NavLink>
          </NavItem>
        </ul>

        <TabContent className="p-4" activeTab={activeTab}>
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
                                defaultValue={formData.scheme_name}
                                name = 'scheme_name'
                                placeholder="Enter Scheme Name"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'rate_of_interest'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'loan_tenor_in_days'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                            <input
                                className="form-control"
                                type="date"
                                defaultValue="DashBoard"
                                name = 'expiry_date'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'grace_periods_in_days'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'penalty_periods'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'daily_penalty'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'processing_cost'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                defaultValue="DashBoard"
                                name = 'collection_fee_sharing_with_agency'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
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
                                                <th>Penalty Periods</th>
                                                <th>Daily Penalty</th>
                                                <th>Processing Cost</th>
                                                <th>Transaction Fee</th>
                                                <th>Collection Fee Sharing With Agency</th>


                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data && data.length>0 &&  data?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className={styles.valueText}>{index+1 + (activePage-1) *10}.</td>
                                                        <td className={styles.valueText}>{data?.scheme_name}</td>
                                                        <td className={styles.valueText}>{data?.rate_of_interest}</td>
                                                        <td className={styles.valueText}>{data?.loan_tenor_in_days}</td>
                                                        <td className={styles.valueText}>{data?.expiry_date}</td>
                                                        <td className={styles.valueText}>{data?.grace_periods_in_days}</td>
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
    </Container>
  </React.Fragment>
    
  );
}

export default CreateSchema;