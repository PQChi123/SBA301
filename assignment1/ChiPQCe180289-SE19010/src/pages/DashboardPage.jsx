import { useState } from 'react';
import { initialCategories, initialNews, initialUsers } from '../services/mockData';

function Dashboard({ currentUser }) {
  // 1. Khởi tạo State: Ưu tiên lấy dữ liệu đã lưu trong localStorage, nếu chưa có thì dùng initialCategories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [totalNews] = useState(() => {
    const saved = localStorage.getItem('news');
    return saved ? JSON.parse(saved).length : initialNews.length;
  });
  const [totalUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved).length : initialUsers.length;
  });

  // Hàm hỗ trợ kiểm tra trạng thái hoạt động (Linh hoạt cho cả trường isActive lẫn status)
  const checkIsActive = (cat) => {
    if (typeof cat.isActive !== 'undefined') return Boolean(cat.isActive);
    if (typeof cat.status !== 'undefined') return cat.status === 1 || cat.status === true || cat.status === 'Active';
    return false;
  };

  // 2. Tính toán số liệu tự động theo State
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => checkIsActive(c)).length;

  // 3. Hàm xử lý Khóa / Mở khóa Category
  const handleToggleStatus = (id) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === id) {
        const currentStatus = checkIsActive(cat);
        return {
          ...cat,
          isActive: !currentStatus,
          status: !currentStatus ? 1 : 0 // Đồng bộ cả 2 chuẩn trường dữ liệu
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories)); // Lưu lại vào localStorage
  };

  return (
    <div>
      {/* 1. Banner Chào mừng */}
      <div style={{
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        marginBottom: '24px',
        borderLeft: '6px solid #1976d2'
      }}>
        <h2 style={{ margin: 0, color: '#0d47a1' }}>
          Xin chào, {currentUser?.accountName || currentUser?.shortName || currentUser?.username || 'Người dùng'}! 👋
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#1565c0' }}>
          Chào mừng bạn đến với bảng điều khiển hệ thống quản lý tin tức FUNews.
        </p>
      </div>

      {/* 2. Thẻ Thống kê (Stat Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Tổng tin tức</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#1976d2' }}>{totalNews}</h3>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Tổng số Danh mục</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#2e7d32' }}>{totalCategories}</h3>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Danh mục hoạt động</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#ed6c02' }}>{activeCategories}</h3>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Tài khoản Hệ thống</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#9c27b0' }}>{totalUsers}</h3>
        </div>
      </div>

      {/* 3. Bảng tóm tắt danh mục & nút thao tác Khóa/Mở khóa */}
      <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>Tóm tắt danh mục tin hiện có</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Tên Danh Mục</th>
              <th style={{ padding: '10px' }}>Mô tả</th>
              <th style={{ padding: '10px' }}>Trạng thái</th>
              <th style={{ padding: '10px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const active = checkIsActive(cat);
              return (
                <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{cat.id}</td>
                  <td style={{ padding: '10px' }}><strong>{cat.name}</strong></td>
                  <td style={{ padding: '10px' }}>{cat.description || '—'}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#fff',
                      backgroundColor: active ? '#28a745' : '#dc3545'
                    }}>
                      {active ? 'Hoạt động' : 'Khóa'}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => handleToggleStatus(cat.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: active ? '#dc3545' : '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {active ? '🔒 Khóa' : '🔓 Mở khóa'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;