import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://task-management-server-navy-tau.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;