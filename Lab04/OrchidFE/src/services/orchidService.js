import axios from 'axios';


const API = 'http://localhost:8080/orchids'
 export const getAllList= async () => {
    const respone =await axios.get(API);
    return respone.data;

 }
 export const deleteOrchid =async (id) => {
    const response = await axios.delete(`${API}/delete/${id}`);
    return response.data;
 }

 export const searchOrchidByName = async (name) => {
    const response = await axios.get(`${API}/search`, {
        params: { name }
    });
    return response.data;
};
export const addOrchid = async (orchid) => {
   const respone = await axios.post(`${API}/add`, orchid);
   return respone.data;
}
// Method gửi request PUT cập nhật thông tin hoa lan theo ID
export const updateOrchid = async (id, orchidData) => {
    const response = await axios.put(`${API}/update/${id}`, orchidData);
    return response.data; // Trả về đối tượng hoa lan sau khi đã cập nhật thành công
};