import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/glucose';

export const getReadings = () => axios.get(API_BASE);
export const generateReading = () => axios.post(`${API_BASE}/generate`);
