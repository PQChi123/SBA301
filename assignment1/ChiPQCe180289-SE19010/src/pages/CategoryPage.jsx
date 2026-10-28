import { useState } from 'react';
import { initialCategories, initialNews } from '../services/mockData';
import Modal from '../components/Modal';
import FeedbackMessage from '../components/FeedbackMessage';

/**
 * CHIPQce180289
 *
 */
function CategoryPage() {
  // Dùng chung dữ liệu category đã được DashboardPage cập nhật.
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', isActive: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState(null);

  const checkIsActive = (cat) => {
    if (typeof cat.isActive !== 'undefined') return Boolean(cat.isActive);
    if (typeof cat.status !== 'undefined') {
      return cat.status === 1 || cat.status === true || cat.status === 'Active';
    }
    return false;
  };
  const saveCategories = (newList) => {
    try {
      localStorage.setItem('categories', JSON.stringify(newList));
      setCategories(newList);
      return true;
    } catch {
      setFeedback({ type: 'error', text: 'Không thể lưu Category. Vui lòng thử lại.' });
      return false;
    }
  };

  const handleDelete = (id) => {
    let newsList;
    try {
      const savedNews = localStorage.getItem('news');
      newsList = savedNews ? JSON.parse(savedNews) : initialNews;
    } catch {
      setFeedback({ type: 'error', text: 'Không thể đọc dữ liệu News để kiểm tra Category.' });
      return;
    }

    const category = categories.find((cat) => Number(cat.id) === Number(id));
    const categoryInUse = newsList.some(
      (news) => Number(news.categoryId) === Number(id) ||
        (news.categoryName && category?.name === news.categoryName)
    );

    if (categoryInUse) {
      setFeedback({ type: 'error', text: 'Không thể xóa Category đang được bài viết sử dụng.' });
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn xóa Category này?')) {
      const updated = categories.filter((cat) => cat.id !== id);
      if (saveCategories(updated)) {
        setFeedback({ type: 'success', text: 'Đã xóa Category thành công.' });
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', isActive: true });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      description: cat.description || '',
      isActive: checkIsActive(cat)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFeedback({ type: 'error', text: 'Vui lòng nhập tên Category.' });
      return;
    }

    let saved;
    if (editingCategory) {
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name.trim(), description: formData.description.trim(), isActive: formData.isActive, status: formData.isActive ? 1 : 0 }
          : cat
      );
      saved = saveCategories(updated);
    } else {
      const usedIds = new Set(categories.map((cat) => Number(cat.id)));
      let nextId = 1;
      while (usedIds.has(nextId)) nextId += 1;

      const newCategory = {
        id: nextId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        isActive: formData.isActive,
        status: formData.isActive ? 1 : 0
      };
      saved = saveCategories([...categories, newCategory]);
    }
    if (saved) {
      setFeedback({
        type: 'success',
        text: editingCategory ? 'Đã cập nhật Category thành công.' : 'Đã thêm Category thành công.'
      });
      setIsModalOpen(false);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(normalizedSearch)
  ).sort((a, b) => Number(a.id) - Number(b.id));
return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Quản lý Category</h2>
        <button onClick={handleOpenAdd} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Thêm Category
        </button>
      </div>

      <FeedbackMessage message={feedback} />

      <div style={{ marginBottom: '16px' }}>
        <input
          type="search"
          placeholder="Tìm Category theo tên..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{ padding: '8px 12px', width: '320px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Tên Category</th>
            <th style={{ padding: '12px' }}>Mô tả</th>
            <th style={{ padding: '12px' }}>Trạng thái</th>
            <th style={{ padding: '12px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((cat) => {
            const active = checkIsActive(cat);
            return (
              <tr key={cat.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{cat.id}</td>
                <td style={{ padding: '12px' }}><strong>{cat.name}</strong></td>
                <td style={{ padding: '12px' }}>{cat.description}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#fff',
                    backgroundColor: active ? '#28a745' : '#dc3545'
                  }}>
                    {active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => handleOpenEdit(cat)} style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}>Sửa</button>
                  <button onClick={() => handleDelete(cat.id)} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            );
          })}
          {filteredCategories.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                {categories.length === 0 ? 'Chưa có Category nào.' : 'Không tìm thấy Category phù hợp.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          title={editingCategory ? 'Sửa Category' : 'Thêm Category mới'}
          onClose={() => setIsModalOpen(false)}
          width="400px"
        >
          <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>Tên Category:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>Mô tả:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '60px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ marginRight: '8px' }}
                  />
                  Hoạt động
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '6px 12px', cursor: 'pointer' }}>Hủy</button>
                <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Lưu</button>
              </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CategoryPage;