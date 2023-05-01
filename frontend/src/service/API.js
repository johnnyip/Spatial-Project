import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL !== undefined ? process.env.REACT_APP_BACKEND_URL : "https://spatial-back.johnnyip.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;