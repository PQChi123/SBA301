import { useState } from 'react';
/**
 * CHIPQce180289
 *
 */
function SettingsPage({ currentUser }) {
  // State quản lý thông tin Profile
  const [profile, setProfile] = useState({
    accountName: currentUser?.accountName || 'Admin',
    email: currentUser?.email || 'admin@fpt.edu.vn',
  });

  // State quản lý Form đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State thông báo
  const [message, setMessage] = useState({ type: '', text: '' });

  // Xử lý lưu thông tin cá nhân
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profile.accountName.trim() || !profile.email.trim()) {
      setMessage({ type: 'error', text: '⚠️ Vui lòng điền đầy đủ thông tin!' });
      return;
    }
    setMessage({ type: 'success', text: '✅ Cập nhật thông tin cá nhân thành công!' });
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: '⚠️ Vui lòng nhập đầy đủ các trường mật khẩu!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '⚠️ Mật khẩu mới và Xác nhận mật khẩu không khớp!' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: '⚠️ Mật khẩu mới phải có tối thiểu 6 ký tự!' });
      return;
    }

    setMessage({ type: 'success', text: '✅ Đổi mật khẩu thành công!' });
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '20px' }}>Cài Đặt Tài Khoản (Settings)</h2>

      {/* Hiển thị thông báo chung */}
      {message.text && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: '20px',
            borderRadius: '4px',
            color: '#fff',
            backgroundColor: message.type === 'success' ? '#28a745' : '#dc3545',
          }}
        >
          {message.text}
        </div>
      )}

      {/* SECTION 1: CẬP NHẬT THÔNG TIN CÁ NHÂN */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>
          👤 Thông tin cá nhân
        </h3>
        <form onSubmit={handleUpdateProfile}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Tên tài khoản:
            </label>
            <input
              type="text"
              value={profile.accountName}
              onChange={(e) => setProfile({ ...profile, accountName: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#0d6efd',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Lưu thay đổi
          </button>
        </form>
      </div>

      {/* SECTION 2: ĐỔI MẬT KHẨU */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>
          🔒 Đổi mật khẩu
        </h3>
        <form onSubmit={handleChangePassword}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Mật khẩu hiện tại:
            </label>
            <input
              type="password"
              value={passwordForm.oldPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
              }
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Mật khẩu mới:
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Xác nhận mật khẩu mới:
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
              }
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;