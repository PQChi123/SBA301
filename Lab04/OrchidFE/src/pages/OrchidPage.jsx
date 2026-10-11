import { useState, useEffect } from 'react';

import OrchidFormModal from '../components/OrchidFormModal';
import OrchidDetailModal from '../components/OrchidDetailModal';
import '../App.css';
import {
    getAllList,
    deleteOrchid,
    searchOrchidByName,
    addOrchid,
    updateOrchid
} from '../services/orchidService';

export default function OrchidPage() {
    const [orchids, setOrchids] = useState([]);//  dùng để lưu danh sách hoa lan
    const [searchTerm, setSearchTerm] = useState('');// dùng để lưu giá trị tìm kiếm
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State lưu đối tượng hoa lan đang được chọn để xem chi tiết
const [selectedOrchid, setSelectedOrchid] = useState(null);
const [editingOrchid, setEditingOrchid] = useState(null);

useEffect(() => {
    const loadListOrchids = async () => {
        try {
            const dataFromList = await getAllList();
            setOrchids(dataFromList);
        } catch (error) {
            console.error('Error fetching orchids:', error);
        }
    };
   
        loadListOrchids();
    }, []);

 
    // method thực hiện xóa id của sản phẩm.
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;
        try {
            await deleteOrchid(id);
          setOrchids((prev) => prev.filter((item) => item.id !== id));
            alert('Xóa thành công!');
        } catch (error) {
            console.error('Error deleting orchid:', error);
        }
    };
    // method thực hiện tìm kiếm sản phẩm theo tên.
  const handleSearch = async () => {
        // Nếu ô tìm kiếm trống, load lại toàn bộ danh sách
        if (!searchTerm.trim()) {
            const data = await getAllList();
            setOrchids(data);
            return;
        }

        try {
            const dataFromSearch = await searchOrchidByName(searchTerm);
            setOrchids(dataFromSearch);
        } catch (error) {
            console.error('Error searching orchids:', error);
        }
    };
    //method thực hiện thêm sản phẩm mới.
    const handleAdd = async (newOrchid) => {
        try {
            const addedOrchid = await addOrchid(newOrchid);
            setOrchids((prev) => [...prev, addedOrchid]);
            setIsModalOpen(false); 
            

            alert('Thêm hoa lan thành công!');
        } catch (error) {
            console.error('Error adding orchid:', error);
        }
    };
    // Method thực hiện MỞ popup xem chi tiết
const handleViewDetail = (orchid) => {
    setSelectedOrchid(orchid);
};

// Method thực hiện ĐÓNG popup xem chi tiết
const handleCloseDetail = () => {
    setSelectedOrchid(null);
};
const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrchid(null);
};



const handleUpdate = async (updatedOrchid) => {
    try{
        const updateData = await updateOrchid(updatedOrchid.id,updatedOrchid);
        setOrchids((prev) => prev.map((item) => item.id === updatedOrchid.id ? updateData : item));
        setIsModalOpen(false);      // Đóng giao diện Popup
        setEditingOrchid(null);
        alert('Cập nhật hoa lan thành công!');
        

    } catch(error){
        console.error('Error updating orchid:', error);
    }
}







    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Danh Sách Hoa Lan (Orchid List)</h2>



            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <input
                type="text"
                placeholder="Nhập tên hoa lan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Nhấn Enter để tìm nhanh
                style={{ 
                    padding: '8px 12px', 
                    width: '300px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' 
                }}
            />
            <button 
                onClick={handleSearch}
                style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                }}
            >
                Tìm kiếm
            </button>

        </div>


        <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Thêm Hoa Lan Mới
                </button>

            {/* BẢNG HIỂN THỊ DANH SÁCH (CHỈ ĐỌC - READ) */}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ background: '#e2e2e2' }}>
                    <th>ID</th>
                    <th>Hình Ảnh</th>
                    <th>Tên Hoa Lan</th>
                    <th>Danh Mục</th>
                    <th>Mô Tả</th>
                    <th>Tự Nhiên</th>
                    <th>Cuốn Hút</th>
                    <th>Xóa hoa</th>
                    <th>Xem chi tiết</th>
                    <th>Sửa</th>
                </tr>
                </thead>
                <tbody>
                {orchids.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            {item.url && (
                                <img
                                    src={item.url}
                                    // alt={item}
                                    width="50"
                                    height="50"
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.categoryId}</td>
                        <td>{item.description}</td>
                        <td>{item.isNatural ? 'Có' : 'Không'}</td>
                        <td>{item.isAttractive ? 'Có' : 'Không'}</td>
                        <td>
                            <button onClick={() => handleDelete(item.id)}>
                                Xóa
                            </button>
                        </td>
                        <td>
    <button 
        onClick={() => handleViewDetail(item)}
        style={{ padding: '4px 8px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
        Xem
    </button>
</td>
                        <td>
    <button 
            onClick={() => {
        setEditingOrchid(item);
        setIsModalOpen(true);
    }}
        style={{ padding: '4px 8px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
        Sửa
    </button>
</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* 3. NHÚNG POPUP FORM MODAL THÊM MỚI VÀO ĐÂY */}
            {isModalOpen && (
                <OrchidFormModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAdd}
                />
            )}
            {/* POPUP CHI TIẾT HOA LAN */}
{selectedOrchid && (
    <OrchidDetailModal
        orchid={selectedOrchid}
        onClose={handleCloseDetail}
    />
)}
{/* CHỈ CẦN DUY NHẤT 1 ĐOẠN JSX NÀY ĐỂ XỬ LÝ CẢ THÊM MỚI VÀ CẬP NHẬT */}
{isModalOpen && (
    <OrchidFormModal
        key={editingOrchid ? editingOrchid.id : 'add-mode'}
        initialData={editingOrchid}
        onClose={handleCloseModal}
        onSave={editingOrchid ? handleUpdate : handleAdd}
    />
)}
        </div>

    )


}