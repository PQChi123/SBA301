import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import AdminLayout from './layouts/AdminLayout'
import './App.css'

function App() {
  /**
   * CHIPQce180289
   *
   */
const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null); // Reset session về null khi bấm Logout
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminLayout currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;