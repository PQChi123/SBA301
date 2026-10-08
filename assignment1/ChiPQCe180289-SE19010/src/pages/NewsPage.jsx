import { useState } from 'react';
import { initialNews, initialCategories } from '../services/mockData';
import Modal from '../components/Modal';

function NewsPage({ currentUser }) {
  // 1. State quản lý danh mục và danh sách tin tức
  const [categories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('news');
    const source = saved ? JSON.parse(saved) : initialNews;

    return source.map((item) => {
      const matchedCategory = categories.find(
        (category) => Number(category.id) === Number(item.categoryId) || category.name === item.categoryName
      );
      return {
        ...item,
        categoryId: matchedCategory?.id ?? categories[0]?.id ?? null,
        author: item.author || item.createdBy || '',
        status: Number(item.status) === 1 || item.status === 'Published' ? 1 : 0
      };
    });
  });

  // 2. State tìm kiếm và quản lý Modal Pop-up
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null); // null: Thêm mới | Object: Đang sửa

  // 3. State lưu thông tin Form nhập liệu
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    author: '',
    status: '1'
  });

  // Hàm lưu danh sách tin tức mới vào cả State lẫn LocalStorage
  const saveNews = (newList) => {
    setNewsList(newList);
    localStorage.setItem('news', JSON.stringify(newList));
  };

  // ==================== LOGIC XỬ LÝ CHỨC NĂNG ====================

  // A. Hàm XÓA BÀI VIẾT (Đã sửa lại để lưu vào LocalStorage)
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const updatedList = newsList.filter((item) => item.id !== id);
      saveNews(updatedList); // Sửa từ setNewsList -> saveNews
    }
  };

  // B. Hàm MỞ MODAL THÊM BÀI VIẾT
  const handleOpenAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      categoryId: String(categories[0]?.id ?? ''),
      author: currentUser?.name || currentUser?.username || 'Admin',
      status: '1'
    });
    setIsModalOpen(true);
  };

  // C. Hàm MỞ MODAL SỬA BÀI VIẾT
  const handleOpenEditModal = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title || '',
      categoryId: String(item.categoryId ?? ''),
      author: item.author || '',
      status: String(item.status)
    });
    setIsModalOpen(true);
  };

  // D. Hàm ĐÓNG MODAL
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  // E. Hàm LƯU FORM (Xử lý cả Thêm mới và Cập nhật)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }

    if (!categories.some((category) => Number(category.id) === Number(formData.categoryId))) {
      alert('Vui lòng chọn một Category hợp lệ trước khi lưu bài viết.');
      return;
    }

    if (editingNews) {
      // CẬP NHẬT BÀI VIẾT
      const updatedList = newsList.map((item) =>
        item.id === editingNews.id
          ? {
              ...item,
              title: formData.title.trim(),
              categoryId: Number(formData.categoryId),
              author: formData.author.trim(),
              status: Number(formData.status)
            }
          : item
      );
      saveNews(updatedList);
    } else {
      // THÊM BÀI VIẾT MỚI
      const today = new Date().toISOString().split('T')[0];
      const usedIds = new Set(newsList.map((item) => Number(item.id)));
      let nextId = 1;
      while (usedIds.has(nextId)) nextId += 1;

      const newNews = {
        id: nextId,
        title: formData.title.trim(),
        categoryId: Number(formData.categoryId),
        author: formData.author.trim() || 'Admin',
        createdDate: today,
        status: Number(formData.status)
      };
      saveNews([newNews, ...newsList]);
    }

    handleCloseModal();
  };

  // Lọc bài viết theo từ khóa tìm kiếm
  const filteredNews = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== GIAO DIỆN RENDER ====================
  return (
    <div style={{ padding: '20px' }}>
      {/* 1. Header & Nút Thêm Bài Viết */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Quản lý Tin Tức (News)</h2>
        <button
          onClick={handleOpenAddModal}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          + Thêm Bài Viết
        </button>
      </div>

      {/* 2. Thanh Tìm kiếm */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm bài viết theo tiêu đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', width: '320px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* 3. Bảng dữ liệu Tin tức */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Tiêu đề</th>
            <th style={{ padding: '12px' }}>Danh mục</th>
            <th style={{ padding: '12px' }}>Tác giả</th>
            <th style={{ padding: '12px' }}>Ngày tạo</th>
            <th style={{ padding: '12px' }}>Trạng thái</th>
            <th style={{ padding: '12px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredNews.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '12px' }}>{item.id}</td>
              <td style={{ padding: '12px', maxWidth: '300px' }}>
                <strong>{item.title}</strong>
              </td>
              <td style={{ padding: '12px' }}>
                {categories.find((category) => Number(category.id) === Number(item.categoryId))?.name || 'Category không còn tồn tại'}
              </td>
              <td style={{ padding: '12px' }}>{item.author}</td>
              <td style={{ padding: '12px' }}>{item.createdDate}</td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#fff',
                  backgroundColor: item.status === 1 ? '#28a745' : '#ffc107'
                }}>
                  {item.status === 1 ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => handleOpenEditModal(item)}
                  style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}

          {filteredNews.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                {newsList.length === 0 ? 'Chưa có bài viết nào.' : 'Không tìm thấy bài viết nào phù hợp.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 4. GIAO DIỆN MODAL POP-UP (Được bổ sung thêm) */}
      {isModalOpen && (
        <Modal
          title={editingNews ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Tiêu đề:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Nhập tiêu đề bài viết..."
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Danh mục:</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Tác giả:</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Tên tác giả..."
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Trạng thái:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="1">Đã xuất bản (1)</option>
                  <option value="0">Bản nháp (0)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {editingNews ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default NewsPage;