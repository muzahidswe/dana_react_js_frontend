import React, { Fragment, useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from "../../../constants/constants";
import { useFormik } from "formik";
import { fileSubmitDistributorNIDInfoUpload, fileSubmitRetailerNIDInfoUpload } from '../../../services/fileUploadServices';
import * as Yup from "yup";
import { useAlert } from 'react-alert';
import swal from 'sweetalert';
import Loader from "react-loader-spinner";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './distributor.module.css';
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import UpdatDIstributoreModal from "./UpdatDIstributoreModal";
import DistributoreDeleteModal from "./DistributoreDeleteModal";
import { distributorDelete, distributorUpdate } from "../../../services/Distributor/Distributor";
import ShowAllDistributorModal from "./ShowAllDistributorModal";
import { ExportReactCSV } from "../../../services/ExportToCSV/ExportToCsv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DATA_TABLE_URL = baseURL+'distributor/distributors';
const DATA_TABLE_DOWNLOAD_URL = baseURL+'scope-outlets-download';
const DELETE_URL = baseURL+'delete-scope-outlet';

function InfoUpload(props) {
    const alert = useAlert();

    const initialValues = {
        file: ""
    };

    const [loading, setLoading] = useState(false);
    const [lastPage, setlastPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [onEdit, setOnEdit] = useState(false);
    const [modal, setModal] = useState(false);
    const [updatableRow, setUpdatableRow] = useState();
    const [currentUser, setCurrentUser] = useState("");
    const [onDelete, setOnDelete] = useState(false);
    const [onEye, setOnEye] = useState(false);

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
            fileSubmitDistributorNIDInfoUpload(document.getElementById('uploadFile').files[0]).then((val)=>{
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

    // const sampleDownload = baseURL + 'download/samples/NID_Infomation_Format.xlsx';
    const sampleDownload ='/assets/download/Distributor-Sample.xlsx';
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

    const getDIstributorInfo = async (activePage=1) => {
        setIsLoading(true);

        var token = localStorage.getItem("token");
        await axios.get(DATA_TABLE_URL, {params:  {"page": activePage,"per_page": perPage}  }, {headers: {
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }})
        .then(res => {
            console.log(res?.data?.data)
            setData(res?.data?.data?.data);
            setlastPage(res?.data?.data?.pagination?.lastPage)
            res.data.success ? setShowTable(true) : setShowTable(false);
        }).catch(err => {
            setData({});
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getDIstributorInfo();
    }, []);

    const handlePageClick = (e) => {
        console.log('handlePageClick',e.selected +1)
        setActivePage(e.selected +1)
        getDIstributorInfo(e.selected +1)
    }

    const handleEdit = async (row) => {
        //setOnView(false);
        setOnDelete(false)
        setUpdatableRow(row);
        setOnEdit(true);
        setOnEye(false);
        toggle();
      };
      const toggle = () => setModal(!modal);
      const handleUpdate = async () => {
        try {
          const {
            id,
            name,
            branch,
            address,
            email,
            phone,
            contact_person_name,
          } = updatableRow;
          const requestObject = {
            id,
            name,
            branch,
            address,
            email,
            phone,
            contact_person_name,
            updated_by: currentUser,
          };
          const  index = data.findIndex(x=> x.id === updatableRow.id); 
          data.splice(index,1,updatableRow)  // first positon , second delete and thrid number
          setData(data)
         
          const status = await distributorUpdate(updatableRow);
          if(status){
            alert.success('Distributor updated Successfully');
            toggle();
          }
        } catch (error) {
          console.log("error ", error);
        }
      };
     
    const handleUpdateChange = (name, value) => {
    setUpdatableRow((prevState) => {
        return { ...prevState, [name]: value };
    });
    };

    const deleteRow = async () => {
        try {
            const  index = data.findIndex(x=> x.id === updatableRow.id); 
            data.splice(index,1)  // first positon , second delete and thrid number
            setData(data)
            distributorDelete(updatableRow)
            alert.success('Distributor Delete Successfully');
            setOnDelete(false);
            toggle();
        } catch (error) {
       
        }
      };

      const handleDelete = (row) => {
        setUpdatableRow(row);
        setOnEdit(false)
        setOnEye(false);
        setOnDelete(true);
        toggle();
      };

      const handleShowEye = (row) => {
        setOnEdit(false);
        setOnDelete(false);
        setUpdatableRow(row);
        setOnEye(true);
        toggle();
        
      };
      const notify = () =>{
        toast("Only Download This Page Information");
      }
    return (      
        <>
        <Card className="m-5">
            <Card.Body>
                {/* {(userType == 'fi') &&                  */}
                    <form onSubmit={formik.handleSubmit} autoComplete="off" className="form">
                        <div className="row">
                            <div className="col-3">
                                <h4 className="card-title">Upload Distributor Information</h4>
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
                                    <span onClick={notify}><ExportReactCSV csvData={data} fileName="DistributorData" /></span>
                                 }
                                <ToastContainer />
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
                {/* } */}

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
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sl.</th>
                                                <th>Distributor Name</th>
                                                <th>Distributor Code</th>
                                                <th>Distributor Tin</th>
                                                <th>Official Email</th>
                                                <th>Region Of Operation</th>
                                                <th>Author Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data && data.length>0 &&  data?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className={styles.valueText}>{index+1 + (activePage-1) *10}.</td>
                                                        <td className={styles.valueText}>{data?.distributor_name}</td>
                                                        <td className={styles.valueText}>{data?.distributor_code}</td>
                                                        <td className={styles.valueText}>{data?.distributor_tin}</td>
                                                        <td className={styles.valueText}>{data?.official_email}</td>
                                                        <td className={styles.valueText}>{data?.region_of_operation}</td>
                                                        <td className={styles.valueText}>{data?.autho_rep_email}</td>

                                                        <td className={styles.valueText}>
                                                            <Link
                                                                className="btn btn-sm btn-clean btn-icon"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom"
                                                                title="Edit"
                                                                onClick={() => handleEdit(data)}
                                                            >
                                                                <i className="la la-edit text-info"></i>
                                                            </Link>          
                                                            <Link
                                                                className="btn btn-sm btn-clean btn-icon"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom"
                                                                title="Delete"
                                                                onClick={() => handleDelete(data)}
                                                            >
                                                                <i className="la la-trash text-danger"></i>
                                                            </Link>  
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
                {onEdit && (
                    <UpdatDIstributoreModal
                    modalTitle="Update"
                    btnName="Update"
                    toggle={toggle}
                    modal={modal}
                    handleUpdate={handleUpdate}
                    handleChange={handleUpdateChange}
                    defaultValue={updatableRow}
                    />
                )}
                  {onEye && (
                    <ShowAllDistributorModal
                    modalTitle="Show All"
                    btnName="Update"
                    toggle={toggle}
                    modal={modal}
                    handleUpdate={handleUpdate}
                    handleChange={handleUpdateChange}
                    defaultValue={updatableRow}
                    />
                )}
                 {onDelete && (
                    <DistributoreDeleteModal
                    modalTitle="Delete Record"
                    toggle={toggle}
                    modal={modal}
                    handleClick={deleteRow}
                    />
                )}
        </Card>
    </>  
    );
}

export default InfoUpload;