import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://hopebackend.onrender.com/api', // Your Django API URL
});

export default apiClient;