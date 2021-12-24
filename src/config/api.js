import axios from "axios";

// Create base URL API
let token = localStorage.getItem("token");
export const API = axios.create({
  baseURL: "https://nutechapi.herokuapp.com/api/",
  headers: { Authorization: `bearer ${token}` },
});

export const api = axios.create({
  baseURL: "https://nutechapi.herokuapp.com/api/",
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const API_URL = "https://nutechapi.herokuapp.com/api/";
