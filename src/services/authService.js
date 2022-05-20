import http from "./httpService";
import axios from 'axios';
//import { apiUrl } from "../config.json";

import jwtDecode from "jwt-decode";
import { baseURL } from "./../constants/constants";

const apiEndPoint = baseURL + "login";
const commonLoginURL = baseURL + "common_login";
const tokenKey = "token";
const CHANGE_FILE_URL = baseURL+'change-pass';

export async function login(email, password) {
  const { data } = await http.post(apiEndPoint, { email, password });
  let value = data.data
  setCookie('token',value["token"],30)
  localStorage.setItem("token", value["token"]);
  localStorage.setItem("id", value["id"]);
  localStorage.setItem("permitted_menu_tree", value["permitted_menu_tree"]);
  localStorage.setItem("dpids", data.dpids);
  localStorage.setItem("cr_user_type", data.cr_user_type);
  localStorage.setItem("setting_menu", data.setting_menu);
  localStorage.setItem("dh_id", data.dh_id);
  localStorage.setItem("fi_id", data.id_fi);
  return data;
}

export async function commonLogin(email, password, login_type, user_type) {
  const { data } = await http.post(commonLoginURL, { email, password, login_type, user_type });
  setCookie('token',data["token"],1)
  localStorage.setItem("token", data["token"]);
  localStorage.setItem("id", data["id"]);
  localStorage.setItem("permitted_menu_tree", data["permitted_menu_tree"]);
  localStorage.setItem("dpids", data.dpids);
  localStorage.setItem("cr_user_type", data.cr_user_type);
  localStorage.setItem("setting_menu", data.setting_menu);
  localStorage.setItem("dh_id", data.dh_id);
  localStorage.setItem("fi_id", data.id_fi);
  return data;
}

export function getCurrentUser() {
  try {
    // const token = localStorage.getItem(tokenKey);
    const token = getCookie(tokenKey)
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}

export function getDhId() {
  try {
    const dh_id = localStorage.getItem("dh_id");
    // const user = jwtDecode(token);
    return dh_id;
  } catch (error) {
    return null;
  }
}

export function getUserId() {
  try {
    const id = localStorage.getItem("id");
    // const user = jwtDecode(token);
    return id;
  } catch (error) {
    return null;
  }
}
export function getUserType() {
  try {
    const type = localStorage.getItem("cr_user_type");
    // const user = jwtDecode(token);
    return type;
  } catch (error) {
    return null;
  }
}
export function logOut() {
  deleteAllCookies()
  return localStorage.removeItem(tokenKey);
}

/* export function loginWithToken(token){
  return localStorage.setItem(tokenKey,token)
} */

export function getJwt() {
  //return "amar naam mithu";
  return localStorage.getItem(tokenKey);
}

export function changePassword(values) {
    const token = localStorage.getItem('token');
    var formBody = [];
    for (var property in values) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(values[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody.push(encodeURIComponent("user_id") + "=" + encodeURIComponent(localStorage.getItem("id")));
    formBody = formBody.join("&");
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
    };
    return axios.post(CHANGE_FILE_URL,formBody, config);
}

 function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      // date.setTime(date.getTime() + (days*24*60*60*1000));
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

 function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


export default {
  getCurrentUser,
  login,
  logOut,
  getJwt,
  getDhId,
  getUserId,
  getUserType
  // setCookie,
  // getCookie
  /* loginWithToken*/
};
