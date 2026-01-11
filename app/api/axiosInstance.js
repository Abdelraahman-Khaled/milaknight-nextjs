import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://backend.mila-knight.com/',
    baseURL: 'https://backend.mila-knight.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// You can add interceptors here if needed
// axiosInstance.interceptors.request.use(...)
// axiosInstance.interceptors.response.use(...)

export default axiosInstance;
