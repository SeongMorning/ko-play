import axios from 'axios';

const API = axios.create({
	// baseURL: `${process.env.customKey}`,
    baseURL:  `${process.env.customKey}/api`,
    withCredentials: true,
});

export default API;
