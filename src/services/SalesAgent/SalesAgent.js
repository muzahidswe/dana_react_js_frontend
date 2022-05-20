import axios from 'axios';
import { baseURL } from '../../constants/constants';

const UPDATE_DISTRIBUTOR = baseURL+'salesagent/salesagent';
const DELETE_DISTRIBUTOR = baseURL+'salesagent/salesagent';


export function salesagentUpdate(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.put(`${UPDATE_DISTRIBUTOR}/${value.id}`,value, config);
}

export function salesagentDelete(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.delete(`${DELETE_DISTRIBUTOR}/${value.id}`, config);
}