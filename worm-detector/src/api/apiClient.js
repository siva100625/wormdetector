import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://10.226.67.25:80/api', // Your Django API URL
});

export default apiClient;