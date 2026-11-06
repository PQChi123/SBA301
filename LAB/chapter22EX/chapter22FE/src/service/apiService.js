import axios from 'axios';


const API = "http://localhost:8080/api/categories";

export const getAllList = async () => {
    const response = await axios.get(`${API}/list`);
    return response.data.content;
}
export const searchOrchidByName = async (name) => {
    const response = await axios.get(`${API}/list`, { params: { name } });
    return response.data.content;
};
export const addCategory = async (category) => {
    const response = await axios.post(`${API}`, category);
    return response.data;
}