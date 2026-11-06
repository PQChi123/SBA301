import axios from "axios";
 const Api= 'http://localhost:8080/api/categories';



 export const getList = async () => {
    try {
            const respone = await axios.get(`${Api}/list`);
            console.log('API response:', respone.data);
        return respone.data.content;
    } catch (error) {
        console.error("Error fetching data:", error);
 }
}
export const addCategory =async (object) => {
    try{
         const response = await axios.post(`${Api}`, object);
         return response.data;
    }catch (error){
        console.error("Error add:", error);
        throw error;
    }
}
export const deleteCategory = async(id) => {

        const respone =await axios.delete(`${Api}/${id}`);
   return respone.data;



}
