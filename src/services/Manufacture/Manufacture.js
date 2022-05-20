import axios from 'axios';
import { baseURL } from '../../constants/constants';

const UPDATE_SUPERVISOR = baseURL+'manufacturer/manufacturer';
const DELETE_SUPERVISOR = baseURL+'manufacturer/manufacturer';


export function manufactureUpdate(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.put(`${UPDATE_SUPERVISOR}/${value.id}`,value, config);
}

export function manufactureDelete(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.delete(`${DELETE_SUPERVISOR}/${value.id}`, config);
}