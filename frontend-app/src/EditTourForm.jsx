import React, { useState, useEffect } from 'react';

function EditTourForm({ editingTour, onUpdateTour, onCancel }) {
  // State lưu dữ liệu người dùng nhập trên Form Sửa
  const [formData, setFormData] = useState({
    tourName: '',
    destination: '',
    duration: '',
    startDate: '',
    price: '',
    status: ''
  });

  // Tự động đổ dữ liệu tour cũ vào Form mỗi khi chọn 1 Tour để Sửa
  useEffect(() => {
    if (editingTour) {
      setFormData({
        tourName: editingTour.tourName || '',
        destination: editingTour.destination || '',
        duration: editingTour.duration || '',
        // Định dạng lại ngày (YYYY-MM-DD) nếu dùng <input type="date" />
        startDate: editingTour.startDate ? editingTour.startDate.split('T')[0] : '',
        price: editingTour.price || '',
        status: editingTour.status || ''
      });
    }
  }, [editingTour]);

  // Cập nhật state khi nhập ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit Form để Update
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm update ở App.jsx, gửi kèm ID cũ
    onUpdateTour({ ...formData, id: editingTour.id });
  };

  // Nếu chưa ấn nút "Sửa" thì không hiển thị Form này
  if (!editingTour) return null;

  return (
    <div style={{
      border: '2px solid #2196F3',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#e3f2fd'
    }}>
      <h3>Cập Nhật Thông Tin Tour (ID: {editingTour.id})</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Tên Tour: </label>
          <input
            type="text"
            name="tourName"
            value={formData.tourName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Điểm Đến: </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Thời Gian (ngày): </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Ngày Khởi Hành: </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Giá ($): </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Trạng Thái: </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          style={{ backgroundColor: '#2196F3', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
        >
          Lưu Cập Nhật
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          style={{ backgroundColor: '#757575', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export default EditTourForm;