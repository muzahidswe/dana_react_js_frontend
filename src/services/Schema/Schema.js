import axios from 'axios';
import { baseURL } from '../../constants/constants';

const SUBMIT_FILE_SCHEMA_INFO_UPLOAD = baseURL+'scheme';
const SUBMIT_GLOBAL_SCHEMA_INFO_UPLOAD = baseURL+'scheme/parameter';
const GET_GLOBAL_SCHEMA_INFO = baseURL+'scheme';



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


