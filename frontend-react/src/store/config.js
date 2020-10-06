import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8000';
export default axios.create({
    baseURL: "http://127.0.0.1:8000",
});
