import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://iotbackend-h5go.onrender.com/api', // Your Django API URL
});

export default apiClient;