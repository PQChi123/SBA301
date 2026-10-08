import { useEffect, useState } from 'react'

import './App.css'

import axios from 'axios'
import AddTours from './AddFromTours.jsx';
function App() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
axios.get('http://localhost:8080/')
.then((response)=>{
setTours(response.data);

}).catch  ((error)=>{
  console.error("Error connect Backend:",error);

  });
},[]);



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


return (
     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Quản Lý Tours - Kết nối Spring Boot & React</h2>
<AddTours addProduct={handleAddTour}></AddTours>
  
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
                <td>{duration}</td>
                <td>{startDate}</td>
                <td>{price}</td>
                <td>{status}</td>
                <td>
                  <button>Chỉnh Sửa</button>
                  <button>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
</table>
    </div>
  );






}

export default App
