import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
        const response = error.response;
        if (response && response.status === 422) {
            console.log(response.data.errors);
        }
    } catch (err) {
        console.log(err);
    }

    throw error;
});

export default axiosClient;