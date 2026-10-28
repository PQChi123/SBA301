import { useState } from 'react';
import { initialUsers } from '../services/mockData';
import Modal from '../components/Modal';
import FeedbackMessage from '../components/FeedbackMessage';
/**
 * CHIPQce180289
 *
 */

const emptyForm = {
  username: '',
  email: '',
  password: '',
  role: '2',
  status: '1'
};

function UserPage({ currentUser }) {
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [feedback, setFeedback] = useState(null);

  const isCurrentUser = (user) => (
    user.id === currentUser?.id || user.username === currentUser?.username
  );

  const saveUsers = (newUsers) => {
    try {
      localStorage.setItem('users', JSON.stringify(newUsers));
      setUsersList(newUsers);
      return true;
    } catch {
      setFeedback({ type: 'error', text: 'Không thể lưu tài khoản. Vui lòng thử lại.' });
      return false;
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email || '',
      password: '',
      role: String(user.role),
      status: String(user.status)
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = formData.username.trim();
    const email = formData.email.trim();

    if (!username || !email || (!editingUser && !formData.password)) {
      setFormError('Vui lòng nhập tên tài khoản, email và mật khẩu.');
      return;
    }

    const duplicateUsername = usersList.some(
      (user) => user.id !== editingUser?.id && user.username.toLowerCase() === username.toLowerCase()
    );
    if (duplicateUsername) {
      setFormError('Tên tài khoản này đã tồn tại.');
      return;
    }

    const duplicateEmail = usersList.some(
      (user) => user.id !== editingUser?.id && (user.email || '').toLowerCase() === email.toLowerCase()
    );
    if (duplicateEmail) {
      setFormError('Email này đã được sử dụng.');
      return;
    }

    let saved;
    if (editingUser) {
      const updatedUsers = usersList.map((user) => (
        user.id === editingUser.id
          ? {
              ...user,
              username,
              email,
              role: Number(formData.role),
              status: Number(formData.status),
              ...(formData.password ? { password: formData.password } : {})
            }
          : user
      ));
      saved = saveUsers(updatedUsers);
    } else {
      const usedIds = new Set(usersList.map((user) => Number(user.id)));
      let nextId = 1;
      while (usedIds.has(nextId)) nextId += 1;

      saved = saveUsers([
        ...usersList,
        {
          id: nextId,
          username,
          email,
          password: formData.password,
          role: Number(formData.role),
          status: Number(formData.status)
        }
      ]);
    }

    if (saved) {
      setFeedback({
        type: 'success',
        text: editingUser ? 'Đã cập nhật tài khoản thành công.' : 'Đã tạo tài khoản thành công.'
      });
      handleCloseModal();
    }
  };

  const handleDelete = (userToDelete) => {
    if (isCurrentUser(userToDelete)) {
      setFeedback({ type: 'error', text: 'Bạn không thể xóa tài khoản đang đăng nhập.' });
      return;
    }

    if (window.confirm(`Bạn có chắc muốn xóa tài khoản "${userToDelete.username}"?`)) {
      if (saveUsers(usersList.filter((user) => user.id !== userToDelete.id))) {
        setFeedback({ type: 'success', text: 'Đã xóa tài khoản thành công.' });
      }
    }
  };

  const handleToggleStatus = (user) => {
    if (isCurrentUser(user)) {
      setFeedback({ type: 'error', text: 'Bạn không thể khóa tài khoản đang đăng nhập.' });
      return;
    }

    const updatedUsers = usersList.map((item) => (
      item.id === user.id ? { ...item, status: item.status === 1 ? 0 : 1 } : item
    ));
    if (saveUsers(updatedUsers)) {
      setFeedback({
        type: 'success',
        text: user.status === 1 ? 'Đã khóa tài khoản.' : 'Đã mở khóa tài khoản.'
      });
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = usersList.filter((user) => (
    user.username.toLowerCase().includes(normalizedSearch) ||
    (user.email || '').toLowerCase().includes(normalizedSearch)
  ));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Quản lý Tài khoản (Users)</h2>
        <button onClick={handleOpenAdd} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Tạo tài khoản mới
        </button>
      </div>

      <FeedbackMessage message={feedback} />

      <div style={{ marginBottom: '16px' }}>
        <input
          type="search"
          placeholder="Tìm theo username hoặc email..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{ padding: '8px 12px', width: '320px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Tên tài khoản</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Vai trò</th>
            <th style={{ padding: '12px' }}>Trạng thái</th>
            <th style={{ padding: '12px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '12px' }}>{user.id}</td>
              <td style={{ padding: '12px' }}>
                <strong>{user.username}</strong>
                {user.username === currentUser?.username && (
                  <span style={{ marginLeft: '6px', fontSize: '11px', color: '#0d6efd', fontStyle: 'italic' }}>(Bạn)</span>
                )}
              </td>
              <td style={{ padding: '12px' }}>{user.email || '—'}</td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: user.role === 1 ? '#dc3545' : '#17a2b8'
                }}>
                  {user.role === 1 ? 'Admin (Role 1)' : 'Staff (Role 2)'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#fff',
                  backgroundColor: user.status === 1 ? '#28a745' : '#6c757d'
                }}>
                  {user.status === 1 ? 'Hoạt động' : 'Đã khóa'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <button
                  onClick={() => handleOpenEdit(user)}
                  style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleToggleStatus(user)}
                  style={{
                    marginRight: '8px',
                    padding: '4px 8px',
                    backgroundColor: user.status === 1 ? '#ffc107' : '#198754',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  {user.status === 1 ? 'Khóa' : 'Mở'}
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                {usersList.length === 0 ? 'Chưa có tài khoản nào.' : 'Không tìm thấy tài khoản nào.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          title={editingUser ? 'Cập nhật tài khoản' : 'Tạo tài khoản mới'}
          onClose={handleCloseModal}
          width="420px"
        >
          {formError && <p role="alert" style={{ color: '#dc3545' }}>{formError}</p>}
          <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '12px' }}>
                Tên tài khoản
                <input
                  type="text"
                  value={formData.username}
                  onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                  style={{ display: 'block', width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '12px' }}>
                Email
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  style={{ display: 'block', width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '12px' }}>
                {editingUser ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu'}
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  style={{ display: 'block', width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '12px' }}>
                Vai trò
                <select
                  value={formData.role}
                  onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                  style={{ display: 'block', width: '100%', padding: '8px' }}
                >
                  <option value="1">Admin (Role 1)</option>
                  <option value="2">Staff (Role 2)</option>
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '16px' }}>
                Trạng thái
                <select
                  value={formData.status}
                  onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                  style={{ display: 'block', width: '100%', padding: '8px' }}
                >
                  <option value="1">Hoạt động (1)</option>
                  <option value="0">Đã khóa (0)</option>
                </select>
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '6px 12px', cursor: 'pointer' }}>Hủy</button>
                <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {editingUser ? 'Cập nhật' : 'Tạo tài khoản'}
                </button>
              </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default UserPage;
