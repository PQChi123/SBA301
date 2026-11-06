
import { useCallback, useEffect, useState } from 'react';
import CategoryPageTable from '../components/CategoryTable';
import CategoryPagePopup from '../components/CategoryPopup';
import { getAllList, searchOrchidByName, addCategory  } from '../service/apiService';

export default function CategoryPage() {
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
     const [searchTerm, setSearchTerm] = useState('');
     const [data,setData] = useState([]);
     const [popup, setPopup] = useState(false);
    //const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchList = async () => {
    //         try {
    //             const data = await getAllList();
    //             setList(data);
    //         } catch (error) {
    //             console.error("Lỗi khi tải dữ liệu:", error);
    //             setError('Không thể tải danh sách danh mục. Hãy kiểm tra BE và kết nối mạng.');
    //         } finally {
    //             //setLoading(false);
    //         }
    //     };

    //     fetchList();
    // }, []);




    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await getAllList();
                
                setList(data);
                console.log("Danh sách danh mục:",data );
            } catch (error) {
                setError('Không thể tải danh sách...');
            }
        };

        fetchList();
    }, []);
// hàm thực hiện search khi người dùng nhập từ khóa
const loadData = useCallback (async (name= '') => {
    try{
       const keyword = name.trim();
const data = keyword
    ? await searchOrchidByName(keyword)
    : await getAllList();

setList(data);
    }catch(error){
setError('Cant load data');
    }

    },[]);

const handleSearch = (event) => {
    event.preventDefault();
    loadData(searchTerm);
}

// các chức năng thực hiện add dữ liệu vào
const  handleAddCategory = async (category) => {
    try{
        await addCategory(category);
        setPopup(false);
       await loadData();
    }catch(error){
        setError('Không thể thêm danh mục. Hãy kiểm tra BE và kết nối mạng.');
    }
}       
const openPopup = () => {
    setPopup(true);
}
const closePopup = () => {
    setPopup(false);
}




    return (
        // <div>
        //     <h1>Danh sách danh mục</h1>
        //     {loading && <p>Đang tải danh sách...</p>}
        //     {error && <p role="alert">{error}</p>}
        //     {!loading && !error && <CategoryPageTable categories={list} />}
        // </div>
        <div>


               <form className="search-bar" onSubmit={handleSearch}>
                <label className="visually-hidden" htmlFor="orchid-search">
                    Tìm thư mục theo tên
                </label>
                <input
                    id="orchid-search"
                    type="search"
                    placeholder="Nhập tên thư mục..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="button button-secondary" type="submit">
                    Tìm kiếm
                </button>
                {searchTerm && (
                    <button
                        className="button button-quiet"
                        type="button"
                        onClick={() => {
                            setSearchTerm('');
                            loadData();
                        }}
                    >
                        Xóa tìm kiếm
                    </button>
                )}
            </form>
            <button className="button button-primary" onClick={openPopup}>
                Thêm danh mục
            </button>
       <CategoryPagePopup
        isOpen={popup}
        onClose={closePopup}
        onAddCategory={handleAddCategory}
      />
            <h1>Danh sách danh mục</h1>
            {error && <p role="alert">{error}</p>}
            {!error && <CategoryPageTable categories={list} />}
        </div>
    )
}