import axios from 'axios';
import { baseURL } from '../../constants/constants';

// const MENU_LIST = baseURL+'menu/menu-list';
const MENU_LIST = baseURL+'menu/user-wise-menu-list';


export async function menuServiceByRole(role_id  , user_id) { 
    const token = localStorage.getItem('token');
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        },
    };
    return await axios.post(MENU_LIST,{ "role_id":role_id ,"user_id": user_id }, config);
}