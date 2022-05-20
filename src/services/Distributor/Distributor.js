import axios from 'axios';
import { baseURL } from '../../constants/constants';

const UPDATE_DISTRIBUTOR = baseURL+'distributor/distributor';
const DELETE_DISTRIBUTOR = baseURL+'distributor/distributor';


export function distributorUpdate(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.put(`${UPDATE_DISTRIBUTOR}/${value.id}`,value, config);
}

export function distributorDelete(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
        return axios.delete(`${DELETE_DISTRIBUTOR}/${value.id}`, config);
}