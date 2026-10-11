import { useState } from 'react';

const defaultFormData = {
    name: '',
    categoryId: '',
    description: '',
    isNatural: false,
    isAttractive: false,
    url: ''
};

export default function OrchidFormModal({ onClose, onSave, initialData }) {
    const [formData, setFormData] = useState(() => ({
        ...defaultFormData,
        ...initialData
    }));

    const handleChange = (e) => {
// Sử dụng kĩ thuật destructuring để lấy ra các giá trị từ sự kiện onChange của input
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert('Vui lòng nhập tên hoa lan!');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h3 style={{ marginTop: 0 }}>Thêm Hoa Lan Mới</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label className="form-label">Tên hoa lan (*):</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

               <label className="form-label">Danh mục (*):</label>
<select 
    name="categoryId"
    value={formData.categoryId}
    onChange={handleChange}
    className="form-input"
>
    <option value="">-- Chọn danh mục --</option>
    <option value="1">1 - Orchid Vàng</option>
    <option value="2">2 - Orchid Tím</option>
    <option value="3">3 - Orchid Trắng</option>
</select>

                    <div>
                        <label className="form-label">Link hình ảnh (URL):</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="form-label">Mô tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-input"
                            rows="3"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', margin: '5px 0' }}>
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isNatural"
                                checked={formData.isNatural}
                                onChange={handleChange}
                            />
                            {' '}Tự nhiên
                        </label>

                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isAttractive"
                                checked={formData.isAttractive}
                                onChange={handleChange}
                            />
                            {' '}Cuốn hút
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Lưu hoa lan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}