import axios from 'axios';
import { baseURL } from '../../constants/constants';


const GET_MASTER_RETAILER = baseURL+'retailer/rn_rmn_mapping';

export async function getMasterRetailer(value) { 
    const token = localStorage.getItem('token');

    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    return await axios.get(`${GET_MASTER_RETAILER}/${value.id}`, config);
}
