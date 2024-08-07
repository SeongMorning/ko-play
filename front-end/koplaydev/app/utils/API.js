import axios from 'axios';

const API = axios.create({
	// baseURL: 'http://localhost:8080',
    baseURL: 'https://i11b302.p.ssafy.io/api',
    withCredentials: true,
});

export default API;
