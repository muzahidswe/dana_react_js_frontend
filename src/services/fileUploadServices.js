import axios from 'axios';
import { baseURL } from "../constants/constants";

const SUBMIT_FILE = baseURL+'upload-credit-limit-file';
const SUBMIT_FILE_SCOPE_OUTLET = baseURL+'upload-scope-outlets';
const SUBMIT_FILE_RETAILER_INFO_UPLOAD = baseURL+'bulk/upload-retailer-onboarding-data';
const SUBMIT_FILE_DOC_SUBMITTED = baseURL+'doc-submit-to-fi';
const SUBMIT_FILE_REVIEW_OLD_CREDIT_LIMIT = baseURL+'upload-review-old-credit-limit';
const SUBMIT_FILE_BULL_KYC_APPROVE = baseURL+'upload-bulk-kyc-approve';
const SUBMIT_FILE_OUTLET_INFO = baseURL+'upload-outlet-info';
const SUBMIT_FILE_DISTRIBUTOR_INFO_UPLOAD = baseURL+'bulk/upload-distributor-onboarding-data';
const SUBMIT_FILE_MANUFACTURER_INFO_UPLOAD = baseURL+'bulk/upload-manufacturer-onboarding-data';
const SUBMIT_FILE_SUPERVISOR_INFO_UPLOAD = baseURL+'bulk/upload-distributor-supervisor-onboarding-data';
const SUBMIT_SALESAGENT_INFO_UPLOAD = baseURL+'bulk/upload-sales-agent-onboarding-data';


export function fileSubmitScopeoutlet(file) { 
    const token = localStorage.getItem('token');
    var formData = new FormData();
    formData.append('file',file);
    formData.append('id_dh',localStorage.getItem('dh_id'));
    formData.append('user_id',localStorage.getItem('id'));
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    return axios.post(SUBMIT_FILE_SCOPE_OUTLET,formData, config);
}

export function fileSubmitRetailerNIDInfoUpload(file) { 
    const token = localStorage.getItem('token');
    var formData = new FormData();
    formData.append('file_for','retaier_onboarding');
    formData.append('user_id',localStorage.getItem('id'));
    formData.append('file',file);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    return axios.post(SUBMIT_FILE_RETAILER_INFO_UPLOAD,formData, config);
}

export function fileSubmitBulkKYCApprove(file) { 
    const token = localStorage.getItem('token');
    var formData = new FormData();
    formData.append('file',file);
    formData.append('id_dh',localStorage.getItem('dh_id'));
    formData.append('user_id',localStorage.getItem('id'));
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    return axios.post(SUBMIT_FILE_BULL_KYC_APPROVE,formData, config);
}

export function fileSubmitOutletInfo(file) { 
    const token = localStorage.getItem('token');
    var formData = new FormData();
    formData.append('file',file);
    formData.append('id_dh',localStorage.getItem('dh_id'));
    formData.append('user_id',localStorage.getItem('id'));
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    return axios.post(SUBMIT_FILE_OUTLET_INFO,formData, config);
}

export function fileSubmitReviewOldCreditLimit(file) { 

    const token = localStorage.getItem('token');

    var formData = new FormData();

    formData.append('file',file);

    formData.append('id_dh',localStorage.getItem('dh_id'));

    formData.append('user_id',localStorage.getItem('id'));

    const config = {

        headers: { 

            Authorization: `Bearer ${token}`,

            'content-type': 'multipart/form-data'

        },

    };

    return axios.post(SUBMIT_FILE_REVIEW_OLD_CREDIT_LIMIT,formData, config);

}

export function fileSubmitDocSubmitted(file) { 
    const token = localStorage.getItem('token');
    var formData = new FormData();
    formData.append('file',file);
    formData.append('id_dh',localStorage.getItem('dh_id'));
    formData.append('user_id',localStorage.getItem('id'));
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    return axios.post(SUBMIT_FILE_DOC_SUBMITTED,formData, config);
}

export function fileSubmit(values, file, status, cr_retail_limit_info_id){
    const token = localStorage.getItem('token');
    var formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
        if (key != 'status') {
            if (key == 'file') {
                formData.append(key,file);
            }else{
                formData.append(key,value);
            }
        }        
    }
    formData.append('id_fi',localStorage.getItem('fi_id'));
    formData.append('status', status);
    formData.append('created_by', localStorage.getItem('id'));
    formData.append('cr_retail_limit_info_id', cr_retail_limit_info_id)
    console.log(formData)
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        },
    };
    const user_id = localStorage.getItem("id");
    return axios.post(SUBMIT_FILE,formData, config);
}

export function fileSubmitDistributorNIDInfoUpload(file) { 
    const token = localStorage.getItem('token');
    let formData = new FormData();
    // formData.append('user_id',localStorage.getItem('id'));
    formData.append('file_for','distributor_onboarding');
    formData.append('manufacturer_id',1);
    formData.append('file',file);

    // formData.append('user_id',1);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1NywibmFtZSI6IkFyZWEgTWFuYWdlciAtIERoYWthIENlbnRyYWwiLCJlbWFpbCI6IkFNLURoYWthQ2VudHJhbCIsInBob25lIjoiMDE4NjI0ODI1MzIiLCJjcl91c2VyX3R5cGUiOiJiYXQiLCJpZF9maSI6bnVsbCwic2V0dGluZ19tZW51IjoiTm8ifSwiaWF0IjoxNjUxMjA2MDU1LCJleHAiOjE2NTIyMDYwNTR9.PfVvwb4eF_zq9cT-7p41PUM_nBVto-6thW4U1UXC6Fw`,
            'Content-Type': 'multipart/form-data'
        },
    };
    console.log('formData',formData);
    // if(formData){
        return axios.post(SUBMIT_FILE_DISTRIBUTOR_INFO_UPLOAD,formData, config);
    // }
}


export function fileSubmitManufacturerNIDInfoUpload(file) { 
    const token = localStorage.getItem('token');
    let formData = new FormData();
    // formData.append('user_id',localStorage.getItem('id'));
    formData.append('file_for','manufacturer_onboarding');
    formData.append('file',file);

    // formData.append('user_id',1);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1NywibmFtZSI6IkFyZWEgTWFuYWdlciAtIERoYWthIENlbnRyYWwiLCJlbWFpbCI6IkFNLURoYWthQ2VudHJhbCIsInBob25lIjoiMDE4NjI0ODI1MzIiLCJjcl91c2VyX3R5cGUiOiJiYXQiLCJpZF9maSI6bnVsbCwic2V0dGluZ19tZW51IjoiTm8ifSwiaWF0IjoxNjUxMjA2MDU1LCJleHAiOjE2NTIyMDYwNTR9.PfVvwb4eF_zq9cT-7p41PUM_nBVto-6thW4U1UXC6Fw`,
            'Content-Type': 'multipart/form-data'
        },
    };
    console.log('formData',formData);
    // if(formData){
        return axios.post(SUBMIT_FILE_MANUFACTURER_INFO_UPLOAD,formData, config);
    // }
}

export function fileSubmitSupervisorNIDInfoUpload(file) { 
    const token = localStorage.getItem('token');
    let formData = new FormData();
    // formData.append('user_id',localStorage.getItem('id'));
    formData.append('file_for','supervisor_onboarding');
    formData.append('file',file);

    // formData.append('user_id',1);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1NywibmFtZSI6IkFyZWEgTWFuYWdlciAtIERoYWthIENlbnRyYWwiLCJlbWFpbCI6IkFNLURoYWthQ2VudHJhbCIsInBob25lIjoiMDE4NjI0ODI1MzIiLCJjcl91c2VyX3R5cGUiOiJiYXQiLCJpZF9maSI6bnVsbCwic2V0dGluZ19tZW51IjoiTm8ifSwiaWF0IjoxNjUxMjA2MDU1LCJleHAiOjE2NTIyMDYwNTR9.PfVvwb4eF_zq9cT-7p41PUM_nBVto-6thW4U1UXC6Fw`,
            'Content-Type': 'multipart/form-data'
        },
    };
    console.log('formData',formData);
    // if(formData){
        return axios.post(SUBMIT_FILE_SUPERVISOR_INFO_UPLOAD,formData, config);
    // }
}

export function fileSubmitSalesAgentNIDInfoUpload(file) { 
    const token = localStorage.getItem('token');
    let formData = new FormData();
    // formData.append('user_id',localStorage.getItem('id'));
    formData.append('file_for','supervisor_onboarding');
    formData.append('file',file);

    // formData.append('user_id',1);
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1NywibmFtZSI6IkFyZWEgTWFuYWdlciAtIERoYWthIENlbnRyYWwiLCJlbWFpbCI6IkFNLURoYWthQ2VudHJhbCIsInBob25lIjoiMDE4NjI0ODI1MzIiLCJjcl91c2VyX3R5cGUiOiJiYXQiLCJpZF9maSI6bnVsbCwic2V0dGluZ19tZW51IjoiTm8ifSwiaWF0IjoxNjUxMjA2MDU1LCJleHAiOjE2NTIyMDYwNTR9.PfVvwb4eF_zq9cT-7p41PUM_nBVto-6thW4U1UXC6Fw`,
            'Content-Type': 'multipart/form-data'
        },
    };
    console.log('formData',formData);
    // if(formData){
        return axios.post(SUBMIT_SALESAGENT_INFO_UPLOAD,formData, config);
    // }
}