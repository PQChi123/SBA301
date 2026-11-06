import { useState } from 'react';


const dataDefault ={
       categoryId: '',
            categoryName: '',
            categoryDescription: '',
            parentCategoryId: null,
         active: 'true'
}
const CategoryPopup = ({ isOpen, onClose, onAddCategory }) => {
    const [formData, setFormData] = useState(dataDefault);
    if (!isOpen) {
        return null;
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAddCategory(formData);
        onClose();      // Đóng popup sau khi thêm thành công
        setFormData(dataDefault); // Reset form
      // Gọi hàm load lại dữ liệu ở component cha
    };  
    return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <h3>Thêm Danh Mục Mới</h3>

      {/* Tên danh mục */}
      <div className="form-group">
        <label>Tên danh mục (*):</label>
        <input
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          placeholder="Nhập tên danh mục"
          required
        />
      </div>

      {/* Mô tả danh mục */}
      <div className="form-group">
        <label>Mô tả:</label>
        <textarea
          name="categoryDescription"
          value={formData.categoryDescription}
          onChange={handleChange}
          placeholder="Nhập mô tả"
          required
          rows="3"
        />
      </div>

      {/* Danh mục cha (parentCategoryId) */}
      <div className="form-group">
        <label>ID Danh mục cha (nếu có):</label>
        <input
          type="number"
          name="parentCategoryId"
          value={formData.parentCategoryId || ''}
          onChange={handleChange}
          placeholder="Để trống nếu là danh mục cha"
        />
      </div>

      {/* Trạng thái (active) */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          Trạng thái đang hoạt động
        </label>
      </div>

      {/* Nút thao tác */}
      <div className="form-actions">
        <button type="submit" className="btn-save">Tạo mới</button>
        {onClose && (
          <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
        )}
      </div>
    </form>
  );
};

export default CategoryPopup;





