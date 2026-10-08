function Header({ currentUser, onLogout }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: '#007bff',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/funews-logo.svg" alt="FUNews logo" width="40" height="40" />
        <h3 style={{ margin: 0 }}>FUNews Management</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>
          Xin chào, <strong>{currentUser?.username}</strong> ({currentUser?.role === 1 ? 'Admin' : 'Staff'})
        </span>
        <button 
          onClick={onLogout}
          style={{
            padding: '6px 12px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default Header;