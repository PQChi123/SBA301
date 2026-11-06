import { useCallback, useEffect, useState } from 'react';
import CategoryTable from '../components/CategoryTable';
import CategoryPopup from '../components/CategoryPopup';
import {
    getList,
    addCategory, deleteCategory

} from '../service/ApiService';



export default function CategoryPage() {
    const [categoriesList,setCategoriesList] = useState([]);
    const [Popup,setPopup]=useState(false);
      const [error, setError] = useState('');


    const takeData = useCallback(async () => {
        try {
            const data = await getList();
            setCategoriesList(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await takeData();
        };
        fetchData();
    }, [takeData]);


const handleAddCategories= async (categories) => {
    // Xử lý lỗi frontend validation
    if (categories._frontendError) {
        setError(categories._frontendError);
        return false;
    }
    try{
        await addCategory(categories);
        console.log("Add success, reloading data...");
        await takeData();
        console.log("Data reloaded, categoriesList:", categoriesList);
        return true;
    }catch(err){

            const errorMessage = err.response?.data?.message || 'Lỗi khi thêm danh mục';
            setError(errorMessage);
            return false;
        }


    }
// lỗi chưa hiện ra khi add



const openUp= () => {
    setPopup(true);

}
const closeUp= () => {
    setPopup(false);
    
}
const handleDelete = async (object) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${object.name}"?`)) return;
    try{
        await deleteCategory(object.categoryId);
        await takeData();

    }catch(err) {
       console.error("Error fetching data:", err);
            setError('Không thể tải danh sách dữ liệu');
    }
};


return(
    <>
    <h1> Danh sach Thu muc</h1>
    <CategoryTable categoriesList ={categoriesList}
     ondelete={handleDelete}
                   onAdd={openUp}
    ></CategoryTable>
    <CategoryPopup
        onPop={Popup}
        error={error}
    closePop={closeUp}
    handleAddCategories={handleAddCategories}
    categoriesList={categoriesList}
     
    ></CategoryPopup>



    </>


)
}
