import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PublicNews from './pages/PublicNews';
import Login from './pages/Login';
import AdminAccounts from './pages/AdminAccounts';
import StaffCategories from './pages/StaffCategories';
import StaffNews from './pages/StaffNews';
import StaffProfile from './pages/StaffProfile';

/**
* ChiPQCe180289
*
**/
function App() {
  return (
      <Router>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PublicNews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/accounts" element={<AdminAccounts />} />
            <Route path="/staff/categories" element={<StaffCategories />} />
            <Route path="/staff/news" element={<StaffNews />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
          </Routes>
        </main>
        <footer className="site-footer">FUNews System · Cập nhật tin tức mỗi ngày</footer>
      </Router>
  );
}

export default App;