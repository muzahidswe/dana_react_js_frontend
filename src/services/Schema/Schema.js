import axios from 'axios';
import { baseURL } from '../../constants/constants';

const SUBMIT_FILE_SCHEMA_INFO_UPLOAD = baseURL+'scheme';
const SUBMIT_GLOBAL_SCHEMA_INFO_UPLOAD = baseURL+'scheme/parameter';
const GET_GLOBAL_SCHEMA_INFO = baseURL+'scheme';
const GET_DISTRIBUTOR_MANUFACTURE_INFO = baseURL+'distributor/distributors';
const GET_RETAILER_DISTRIBUTOR_INFO = baseURL+'retailer/retailers';
const GET_RETAILER_SAVE_SCHEMA = baseURL+'retailer/schema';


export function schemaSave(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return axios.post(SUBMIT_FILE_SCHEMA_INFO_UPLOAD,value, config);
}


export async function GlobalVAlueschemaSave(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.post(SUBMIT_GLOBAL_SCHEMA_INFO_UPLOAD,value, config);
}


export async function getGlobalSchema(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.get(`${GET_GLOBAL_SCHEMA_INFO}/${value.id}/parameter`,value, config);
}

export async function getDIstributorWIthManuID(id , activePage , perPage) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.get(`${GET_DISTRIBUTOR_MANUFACTURE_INFO}/${id}`,{params:  {"page": activePage,"per_page": perPage}  }, config);
}

export async function getRetailerrWIthDistID(id , activePage , perPage) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.get(`${GET_RETAILER_DISTRIBUTOR_INFO}/${id}`,{params:  {"page": activePage,"per_page": perPage}  }, config);
}

export async function saveRetailerSchema(Schemeid , ids ) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.put(`${GET_RETAILER_SAVE_SCHEMA}`,  {"scheme_id": Schemeid,"ids": ids}, config);
}



