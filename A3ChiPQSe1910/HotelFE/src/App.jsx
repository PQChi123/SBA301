/*
* Phạm Quốc Chí Ce180289
*/
import { useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage.jsx'
import HotelPage from './pages/hotelPage.jsx'
import { BookingHistoryPage, BookingPage, ProfilePage } from './pages/CustomerPages.jsx'
import {
  StaffBookingsPage,
  StaffCustomersPage,
  StaffRoomsPage,
} from './pages/StaffPages.jsx'

function getStoredUser() {
  try {
    if (!localStorage.getItem('hotelToken')) return null
    const stored = localStorage.getItem('hotelUser')
    return stored ? JSON.parse(stored) : null
  } catch {
    localStorage.removeItem('hotelUser')
    localStorage.removeItem('hotelToken')
    return null
  }
}

function App() {
  const [user, setUser] = useState(getStoredUser)
  const [view, setView] = useState('rooms')
  const [bookingRoom, setBookingRoom] = useState(null)

  const authenticate = (result) => {
    const account = { id: result.id, email: result.email, role: result.role }
    localStorage.setItem('hotelToken', result.token)
    localStorage.setItem('hotelUser', JSON.stringify(account))
    setUser(account)
    setView('rooms')
  }

  const logout = () => {
    localStorage.removeItem('hotelToken')
    localStorage.removeItem('hotelUser')
    setUser(null)
    setView('rooms')
  }

  const nav = (target, label) => (
    <button
      className={`nav-link ${view === target ? 'active' : ''}`}
      key={target}
      onClick={() => setView(target)}
    >
      {label}
    </button>
  )

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView('rooms')}>
          <span className="brand-mark">H</span>
          <span>Harbor House <small>HOTEL</small></span>
        </button>
        <nav className="navigation">
          {nav('rooms', 'Phòng')}
          {!user && (
            <>
              {nav('login', 'Đăng nhập')}
              {nav('register', 'Đăng ký')}
            </>
          )}
          {user?.role === 'CUSTOMER' && (
            <>
              {nav('booking', 'Đặt phòng')}
              {nav('history', 'Lịch sử')}
              {nav('profile', 'Hồ sơ')}
            </>
          )}
          {user?.role === 'STAFF' && (
            <>
              {nav('staff-rooms', 'Quản lý phòng')}
              {nav('staff-customers', 'Khách hàng')}
              {nav('staff-bookings', 'Đơn đặt phòng')}
            </>
          )}
        </nav>
        <div className="account-area">
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <span className="guest-label">GUEST</span>
          )}
        </div>
      </header>

      <main className="main-content">
        {view === 'rooms' && (
          <HotelPage
            user={user}
            onLogin={() => setView('login')}
            onBook={(room) => {
              setBookingRoom(room)
              setView(user?.role === 'CUSTOMER' ? 'booking' : 'login')
            }}
          />
        )}
        {(view === 'login' || view === 'register') && (
          <AuthPage
            key={view}
            initialMode={view}
            onAuthenticated={authenticate}
          />
        )}
        {view === 'booking' && user?.role === 'CUSTOMER' && (
          <BookingPage initialRoom={bookingRoom} />
        )}
        {view === 'history' && user?.role === 'CUSTOMER' && <BookingHistoryPage />}
        {view === 'profile' && user?.role === 'CUSTOMER' && <ProfilePage />}
        {view === 'staff-rooms' && user?.role === 'STAFF' && <StaffRoomsPage />}
        {view === 'staff-customers' && user?.role === 'STAFF' && <StaffCustomersPage />}
        {view === 'staff-bookings' && user?.role === 'STAFF' && <StaffBookingsPage />}
      </main>
      <footer>Harbor House Hotel · Đặt phòng trực tiếp, nghỉ ngơi trọn vẹn.</footer>
    </div>
  )
}

export default App
