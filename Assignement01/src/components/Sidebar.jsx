function Sidebar({ activeTab, setActiveTab, currentUser }) {
  // Danh sách 5 tab theo đúng yêu cầu đề bài
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'categories', label: 'Quản lý Category' },
    { id: 'news', label: 'Quản lý News' },
    ...(currentUser?.role === 1 ? [{ id: 'users', label: 'Quản lý Users' }] : []),
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside style={{ width: '220px', backgroundColor: '#f8f9fa', padding: '16px', minHeight: 'calc(100vh - 60px)', borderRight: '1px solid #dee2e6' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <button
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: '10px 14px',
                textAlign: 'left',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeTab === item.id ? '#007bff' : 'transparent',
                color: activeTab === item.id ? '#fff' : '#333',
                fontWeight: activeTab === item.id ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;