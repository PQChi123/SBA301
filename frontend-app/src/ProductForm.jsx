import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  // 1. Khởi tạo State với đúng các thuộc tính trong toursEntities.java
  const [formData, setFormData] = useState({
    tourName: '',
    destination: '',
    capacity: '',
    duration: '',
    startDate: '',
    price: '',
    status: 'Active'
  });

  // 2. Hàm handleChange dùng chung cho tất cả các ô input
  // hàm thực hiện các sự kiện theo tác  input.
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    // hàm này thực hiện lưu tạm dữ liệu khi người dùng vừa nhập vào
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Xử lý khi bấm nút Submit
  const handleSubmit = (e) => {
    e.preventDefault();// ngăn reload lại trang

    // Validation cơ bản
    if (!formData.tourName || !formData.destination || !formData.startDate || !formData.price) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Ép kiểu số để khớp với kiểu dữ liệu int/float ở Backend
    const tourDataToSend = {
      ...formData,
      capacity: parseInt(formData.capacity, 10) || 0,
      duration: parseInt(formData.duration, 10) || 0,
      price: parseFloat(formData.price) || 0
    };

    // Gửi dữ liệu đã chuẩn hóa lên Component cha (App.jsx)
    onAddProduct(tourDataToSend);

    // Reset form về trạng thái ban đầu
    setFormData({
      tourName: '',
      destination: '',
      capacity: '',
      duration: '',
      startDate: '',
      price: '',
      status: 'Active'
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h3>Thêm Tour Mới</h3>

      <div>
        <label>Tên Tour: </label>
        <input type="text" name="tourName" value={formData.tourName} onChange={handleChange} required />
      </div>

      <div>
        <label>Điểm Đến: </label>
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
      </div>

      <div>
        <label>Sức Chứa (Người): </label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
      </div>

      <div>
        <label>Thời Gian (Ngày): </label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
      </div>

      <div>
        <label>Ngày Khởi Hành: </label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
      </div>

      <div>
        <label>Giá ($): </label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>

      <div>
        <label>Trạng Thái: </label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Thêm Tour</button>
    </form>
  );
}

export default ProductForm;