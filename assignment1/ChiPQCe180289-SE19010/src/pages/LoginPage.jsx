import { useState } from 'react';
import { initialUsers } from '../services/mockData';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const  handleLogin = (e) => {
    e.preventDefault();
    if(!username.trim()||!password.trim()){
        setError('Please enter both username and password.');
    return;
    }
    const savedUsers = localStorage.getItem('users');
    const users = savedUsers ? JSON.parse(savedUsers) : initialUsers;
    const matchedUser = users.find(
      (user) => user.username === username.trim() && user.password === password
    );

    if (!matchedUser) {
      setError('Invalid username or password.');
      return;
    }

    if (matchedUser.status !== 1) {
      setError('Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.');
      return;
    }

    onLoginSuccess({
      id: matchedUser.id,
      username: matchedUser.username,
      role: matchedUser.role
    });
  };
return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
      <form onSubmit={handleLogin} style={{ width: '320px', border: '1px solid #ccc', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Đăng Nhập FUNews</h2>
        {error && <p role="alert" style={{ color: 'red', fontSize: '14px', margin: '8px 0' }}>{error}</p>}
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