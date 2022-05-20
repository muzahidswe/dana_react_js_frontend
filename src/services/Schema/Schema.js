import axios from 'axios';
import { baseURL } from '../../constants/constants';

const SUBMIT_FILE_SCHEMA_INFO_UPLOAD = baseURL+'scheme';


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

