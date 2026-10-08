import React, { useState, useEffect } from 'react'; // 1. Đã thêm useState, useEffect
import axios from 'axios'; // 2. Đã thêm axios
import ProductForm from './ProductForm';
import EditTourForm from './EditTourForm';
function App() {
  // Đổi tên state từ products -> tours để đồng bộ với đoạn render bên dưới
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);

  // Tự động gọi API từ Spring Boot
  // gọi useEffect để truyền 2 tham số vào, tham số 1 là gọi API, 2 là tự chọn
  // Nếu chỉ có 1 tham số thì sẽ bị vòng lặp vo tận khi request
  // Tham số thứ 2 được tạo ra để kiểm tra giá trị mới có giống với cũ ko, nếu giống thì thôi, ko thì render lại
   
  useEffect(() => {
    axios.get('http://localhost:8080/')
      .then((response) => {
        setTours(response.data); 
      })
      .catch((error) => {
        console.error("Lỗi kết nối Backend:", error);
      });
  }, []);

  // 3. Khai báo hàm handleAddTour để truyền vào ProductForm
  // add new product
 const handleAddTour = async (newTour) => {
  try {
    // 1. Gửi dữ liệu tour mới sang Spring Boot qua phương thức POST
    // Thực hiện đẩy qua spring boot  lưu vào Datase 
    // axios sẽ trả về một Promise, nên cần dùng await để chờ phản hồi từ server
    const response = await axios.post('http://localhost:8080/', newTour);
    
    // 2. In ra console để kiểm tra chuỗi JSON Backend trả về (bao gồm cả ID tự tăng)
    console.log("JSON phản hồi từ Spring Boot:", response.data);

    // 3. Cập nhật State bằng chính đối tượng JSON trả về từ DB
    // thực hiện đẩy lên view  mà không cần render lại pages
    setTours([...tours, response.data]);
    
    alert("Thêm tour thành công vào Database!");
  } catch (error) {
    console.error("Lỗi khi thêm tour:", error);
  }
};
//4. Delete Product
// App.jsx
const handleDelete = async (id) => {
  // 1. Hỏi xác nhận người dùng
  if (window.confirm("Bạn có chắc chắn muốn xóa Tour này không?")) {
    try {
      // 2. Gọi API DELETE
      await axios.delete(`http://localhost:8080/${id}`);
      
      // 3. Cập nhật State trực tiếp hoặc tải lại danh sách
      setTours(tours.filter(tour => tour.id !== id));
      alert("Xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  }
};


// 5.method update product
const handleUpdateTour = async (updatedTour) => {
    try {
      // Gọi API PUT sang Spring Boot với ID của tour
      const response = await axios.put(`http://localhost:8080/${updatedTour.id}`, updatedTour);
      
      // Cập nhật lại State danh sách mà không cần reload trang
      setTours(tours.map(t => t.id === updatedTour.id ? response.data : t));
      
      // Đóng Form sửa
      setEditingTour(null);
      alert("Cập nhật Tour thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật tour:", error);
      alert("Lỗi khi cập nhật tour!");
    }
  };
// Render nút xóa trong thẻ <tr> của Table:


  // Lọc tour có giá lớn hơn $500
  const expensiveTours = tours.filter(t => t.price > 500);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Tours - Kết nối Spring Boot & React</h2>
      {/* // method use to add new product */}
      <ProductForm onAddProduct={handleAddTour} />
      <EditTourForm 
        editingTour={editingTour} 
        onUpdateTour={handleUpdateTour} 
        onCancel={() => setEditingTour(null)} 
      />

      <b>1. Danh sách tất cả Tours (Render từ Backend Java)</b>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '10px', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Tên Tour</th>
            <th>Điểm Đến</th>
            <th>Thời Gian (Ngày)</th>
            <th>Ngày Khởi Hành</th>
            <th>Giá ($)</th>
            <th>Trạng Thái</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((item) => {
            const { id, tourName, destination, duration, startDate, price, status } = item;
            
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{tourName}</td>
                <td>{destination}</td>
                <td>{duration} ngày</td>
                <td>{startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}</td>
                <td>${price}</td>
                <td>{status}</td>
                   <button onClick={() => handleDelete(item.id)}>Xóa</button>
                   <button 
                    onClick={() => setEditingTour(item)}
                    style={{ marginRight: '5px', backgroundColor: '#FFC107', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    Sửa
                  </button>
              </tr>
            );
          })}
        </tbody>
      </table>

      <b>2. Danh sách Tour cao cấp (Dùng .filter)</b>
      <ul>
        {expensiveTours.map(t => (
          <li key={t.id}>
            <b>{t.tourName}</b> ({t.destination}) - Giá: ${t.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;