import axios from 'axios';

const API = axios.create({
  baseURL: 'https://watchdogs-fawn.vercel.app/api', 
  withCredentials: true,
});

export default API;