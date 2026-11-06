import { useState } from 'react';
import { initialUsers } from '../services/mockData';
/*
   Phạm Quốc Chí Ce180289
 */
export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    if (!normalizedUsername || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : initialUsers;
    const storedAccount = users.find(
      (item) => item.username?.trim().toLowerCase() === normalizedUsername
    );
    const storedUser = users.find(
      (item) =>
        item.username?.trim().toLowerCase() === normalizedUsername &&
        item.password === password
    );
    const sampleUser = initialUsers.find(
      (item) =>
        item.username.toLowerCase() === normalizedUsername &&
        item.password === password
    );
    const user = storedUser || (sampleUser && storedAccount) || sampleUser;

    if (!user) {
      setError('Username hoặc password không đúng.');
      return;
    }

    const account = storedAccount || user;
    const isActive =
      Number(account.status) === 1 || account.status === true || account.status === 'Active';
    if (!isActive) {
      setError('Tài khoản đã bị khóa.');
      return;
    }

    onLoginSuccess({
      id: account.id,
      username: account.username,
      role: Number(account.role),
      email: account.email
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <form onSubmit={handleLogin} style={{ width: '320px', border: '1px solid #ccc', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Đăng Nhập FUNews</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', margin: '8px 0' }}>{error}</p>}
      <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
      
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Login
        </button>
      
      </form>
    </div>
  );
}