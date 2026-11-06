import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CategoryPage from '../pages/CategoryPage';
import DashboardPage from '../pages/DashboardPage';
import NewsPage from '../pages/NewsPage';
import UserPage from '../pages/UserPage';
import SettingsPage from '../pages/SettingsPage';
// Tạm thời tạo khung chữ cho các trang chưa làm
function AdminLayout({ currentUser, onLogout }) {

  const [activeTab, setActiveTab] = useState('categories');

  // 2. Nội dung hiển thị bên phải tương ứng với từng tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
       return <DashboardPage currentUser={currentUser} />;
      case 'categories':
        return <CategoryPage currentUser={currentUser} />;
      case 'news':
        return <NewsPage currentUser={currentUser} />;
      case 'users':
        return <UserPage currentUser={currentUser} />;
      case 'settings':
        return  <SettingsPage currentUser={currentUser} />;
      default:
        return <h2>Trang Quản Lý Category</h2>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header nhận user và hàm logout từ App.jsx */}
      <Header currentUser={currentUser} onLogout={onLogout} />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar nhận activeTab và hàm đổi tab */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentUser={currentUser} 
        />

        {/* Nội dung chính bên phải */}
        <main style={{ flex: 1, padding: '24px', backgroundColor: '#fff' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;