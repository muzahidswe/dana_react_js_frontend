import React, { Fragment, useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from "../../../constants/constants";
import { useFormik } from "formik";
import { fileSubmitRetailerNIDInfoUpload } from '../../../services/fileUploadServices';
import * as Yup from "yup";
import { useAlert } from 'react-alert';
import swal from 'sweetalert';
import Loader from "react-loader-spinner";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RetailerUpload.module.css';
import { ExportReactCSV } from "../../../services/ExportToCSV/ExportToCsv";
import ReactPaginate from "react-paginate";
import { Button } from "reactstrap";
import { getMasterRetailer } from "../../../services/Retailer/Retailer";
import ShowRMNModal from "./ShowRMNModal";

// import ReactPaginate from 'react-paginate';

const DATA_TABLE_URL = baseURL+'retailer/retailers';
const DATA_TABLE_DOWNLOAD_URL = baseURL+'scope-outlets-download';
const DELETE_URL = baseURL+'delete-scope-outlet';

function RetailerUpload(props) {
    const alert = useAlert();

    const initialValues = {
        file: ""
    };

    const [loading, setLoading] = useState(false);
    const [lastPage, setlastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [modal, setModal] = useState(false);
    const [getRmnAccount, setRmnAccount] = useState(false);
    const [RMNModal, setRMNModal] = useState(false);

    const uploadFile = Yup.object().shape({
        file: Yup.mixed().required()
    });

    const formik = useFormik({
        initialValues,
        validationSchema: uploadFile,
        onSubmit: (values, { setStatus, setSubmitting }) => {   
            swal({
                icon: "load.gif",
                buttons: false,
            });         
            setSubmitting(true);
            setLoading(true);
            fileSubmitRetailerNIDInfoUpload(document.getElementById('uploadFile').files[0]).then((val)=>{
                if (val.data.success) {
                    alert.success(val.data.message);
                }else{
                    alert.error(val.data.message);
                }
                swal.close();
            });
        }
    });

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };

    const sampleDownload ='/assets/download/Retailer_Onboarding.xlsx';
    const [userType, setUserType] = useState(localStorage.getItem("cr_user_type"));
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const formatNumber = (number) => {
        return parseFloat(number)?.toLocaleString('en-US');
    }

    const onDownload = async (data) => {
        console.log("Download clicked", data);
        
        const downloadLink = document.createElement("a");
        const fileName = data.file_name;
        downloadLink.href = `${baseURL}${data.file_path}${data.file_name}`;
        downloadLink.download = fileName;
        downloadLink.click();

        // var token = localStorage.getItem("token");
        // setIsLoading(true);
        // await axios.get(`${baseURL}${data.file_path}${data.file_name}`, {},
        //     {
        //     headers: {
        //         // Accept: "application/json",
        //         // "Content-Type": "application/json",
        //         Authorization: "Bearer " + token,
        //     },
        //     }
        // )
        // .then((res) => {
        //     downloadPDF(res.data.data.blod_data, res.data.data.file_name);
        //     setIsLoading(false);
        // })
        // .catch((err) => {
        //     setIsLoading(false);
        // });
    }

    const downloadPDF = (blob, name) => {
        const linkSource = `data:application/pdf;base64,${blob}`;
        const downloadLink = document.createElement("a");
        const fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const getRetailerInfo = async (activePage=1) => {
        setIsLoading(true);

        var token = localStorage.getItem("token");
        await axios.get(DATA_TABLE_URL,{params:  {"page": activePage,"per_page": perPage}  }, {headers: {
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }})
        .then(res => {
            setData(res?.data?.data?.data);
            setlastPage(res?.data?.data?.pagination?.lastPage)
            res.data.success ? setShowTable(true) : setShowTable(false);
        }).catch(err => {
            setData({});
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getRetailerInfo();
    }, []);
    
    const handlePageClick = (e) => {
        console.log('handlePageClick',e.selected +1)
        setActivePage(e.selected +1)
        getRetailerInfo(e.selected +1)
    } 

    const ShowMasterViewModal =async (row) => {
        let value =await getMasterRetailer(row)
        if(value.data.success == true){
          if(value.data.data.length > 0){
            setRmnAccount(value.data.data)
            setRMNModal(true);
            toggle();
          }else{
            alert.error('No Data Found For This Master Account')
          }
        }else{
          alert.erroe('Network Error')
        }
        console.log(value)
    }

    const toggle = () => setModal(!modal);

    return (       
        <>
        <Card className="m-5">
            <Card.Body>
                    <form onSubmit={formik.handleSubmit} autoComplete="off" className="form">
                        <div className="row">
                            <div className="col-3">
                                <h4 className="card-title">Retailer Upload Information</h4>
                            </div>
                            <div className="col-4">
                                <div className="input-group">
                                    <input
                                        type="file"
                                        className={`form-control ${getInputClasses("file")}`}
                                        name="file"
                                        id="uploadFile"
                                        {...formik.getFieldProps("file")}
                                    />
                                </div>
                                {formik.touched.file && formik.errors.file ? (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">{formik.errors.file}</div>
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    //onClick={addPaymentMethod}
                                    className="btn btn-success btn-sm pr-3"
                                >
                                    <span>Upload</span>
                                    {/* {loading && <span className="ml-3 spinner spinner-white"></span>} */}
                                </button>
                                <a  className="pl-2">
                               {
                                    data.length > 0 && 
                                    <span><ExportReactCSV csvData={data} fileName="RetailerData" /></span>
                               }
                                </a> 
                            </div>
                            <div className="col-2">
                                <a href={sampleDownload}>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                    >
                                        <span>Download Sample</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </form>
                    {isLoading ? 
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <Loader type="Rings" color="#00BFFF" height={100} width={100} />
                        </div>
                    </div>
                    : 
                    <div>
                        {
                        // showTable &&
                            <div className={styles.generatedContent}>
                                <div className={`${styles.tableWrapper} table-responsive`}>
                                    <table className="table table-bordered manufacture">
                                        <thead>
                                            <tr>
                                                <th>Sl.</th>
                                                <th>Retailer Name</th>
                                                <th>Retailer NID</th>
                                                <th>Master Account</th>
                                                <th>Phone</th>
                                                <th>Rtailer Code</th>
                                                <th>Retailer Tin</th>
                                                <th>Authr Rep Full Name</th>
                                                <th>Author Rep Phone</th>
                                                <th>Region Operation</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data && data.length>0 &&  data?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className={styles.valueText}>{index+1 + (activePage-1) *10}.</td>
                                                        <td className={styles.valueText}>{data?.retailer_name}</td>
                                                        <td className={styles.valueText}>{data?.retailer_nid}</td>
                                                        <td className={styles.valueText}>
                                                        <Button
                                                            type="button"
                                                            color="primary"
                                                            className="btn-sm btn-rounded"
                                                            onClick={()=>ShowMasterViewModal(data)}
                                                        >
                                                            {data?.master_r_number}
                                                        </Button>
                                                            
                                                        </td>
                                                        
                                                        <td className={styles.valueText}>{data?.phone}</td>
                                                        <td className={styles.valueText}>{data?.retailer_code}</td>
                                                        <td className={styles.valueText}>{data?.retailer_tin}</td>
                                                        <td className={styles.valueText}>{data?.autho_rep_full_name}</td>
                                                        <td className={styles.valueText}>{data?.autho_rep_phone}</td>
                                                        <td className={styles.valueText}>{data?.region_operation}</td>
                                                        
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        }
                    </div>
                }
            </Card.Body>
            { 
               showTable &&
                <div className="paginationMiddle" style={{margin:'auto' , paddingBottom:'5px'}}>
                    <ReactPaginate
                            breakLabel="..."
                            nextLabel="next &raquo;"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={10}
                            pageCount={lastPage}
                            forcePage={activePage-1}
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
                </div>}
                {RMNModal && (
                    <ShowRMNModal
                    modalTitle="Show All Master Account Info"
                    btnName="Save Global Schema"
                    toggle={toggle}
                    modal={modal}
                    getRmnAccount={getRmnAccount}
                    />
                )}
        </Card>
       </>     
    );
}

export default RetailerUpload;