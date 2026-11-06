import { useState } from 'react';
import { initialNews, initialCategories } from '../services/mockData';
import FeedbackMessage from '../components/FeedbackMessage';
/**
 * CHIPQce180289
 *
 */

function NewsPage({ currentUser }) {
  const [categories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('news');
    const source = saved ? JSON.parse(saved) : initialNews;

    return source.map((item) => {
      const category = categories.find(
        (candidate) => Number(candidate.id) === Number(item.categoryId)
      ) || categories.find((candidate) => candidate.name === item.categoryName);

      return {
        ...item,
        categoryId: category?.id ?? categories[0]?.id ?? null,
        author: item.author || item.createdBy || '',
        status: item.status === 'Published' || Number(item.status) === 1 ? 'Published' : 'Draft'
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
    status: 'Published'
  });
  const [feedback, setFeedback] = useState(null);

  // Hàm lưu danh sách tin tức mới vào cả State lẫn LocalStorage
  const saveNews = (newList) => {
    try {
      localStorage.setItem('news', JSON.stringify(newList));
      setNewsList(newList);
      return true;
    } catch {
      setFeedback({ type: 'error', text: 'Không thể lưu bài viết. Vui lòng thử lại.' });
      return false;
    }
  };

  // ==================== LOGIC XỬ LÝ CHỨC NĂNG ====================

  // A. Hàm XÓA BÀI VIẾT (Đã sửa lại để lưu vào LocalStorage)
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const updatedList = newsList.filter((item) => item.id !== id);
      if (saveNews(updatedList)) {
        setFeedback({ type: 'success', text: 'Đã xóa bài viết thành công.' });
      }
    }
  };

  // B. Hàm MỞ MODAL THÊM BÀI VIẾT
  const handleOpenAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      categoryId: String(categories[0]?.id ?? ''),
      author: currentUser?.name || currentUser?.username || 'Admin',
      status: 'Published'
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
      status: item.status || 'Published'
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
      setFeedback({ type: 'error', text: 'Vui lòng nhập tiêu đề bài viết.' });
      return;
    }

    const categoryId = Number(formData.categoryId);
    if (!categories.some((category) => Number(category.id) === categoryId)) {
      setFeedback({ type: 'error', text: 'Vui lòng chọn một Category đang tồn tại.' });
      return;
    }

    let saved;
    if (editingNews) {
      // CẬP NHẬT BÀI VIẾT
      const updatedList = newsList.map((item) =>
        item.id === editingNews.id
          ? {
              ...item,
              title: formData.title.trim(),
              categoryId,
              author: formData.author.trim(),
              status: formData.status
            }
          : item
      );
      saved = saveNews(updatedList);
    } else {
      // THÊM BÀI VIẾT MỚI
      const today = new Date().toISOString().split('T')[0];
      const usedIds = new Set(newsList.map((item) => Number(item.id)));
      let nextId = 1;
      while (usedIds.has(nextId)) nextId += 1;

      const newNews = {
        id: nextId,
        title: formData.title.trim(),
        categoryId,
        author: formData.author.trim() || 'Admin',
        createdDate: today,
        status: formData.status
      };
      saved = saveNews([newNews, ...newsList]);
    }

    if (saved) {
      setFeedback({
        type: 'success',
        text: editingNews ? 'Đã cập nhật bài viết thành công.' : 'Đã thêm bài viết thành công.'
      });
      handleCloseModal();
    }
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

      <FeedbackMessage message={feedback} />

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
                  backgroundColor: item.status === 'Published' ? '#28a745' : '#ffc107'
                }}>
                  {item.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
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
                Không tìm thấy bài viết nào phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 4. GIAO DIỆN MODAL POP-UP (Được bổ sung thêm) */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', width: '480px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
            <h3 style={{ marginTop: 0 }}>{editingNews ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h3>

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
                  <option value="Published">Đã xuất bản (Published)</option>
                  <option value="Draft">Bản nháp (Draft)</option>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsPage;