import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

/**
* ChiPQCe180289
*
**/
const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="site-header">
            <nav className="navbar navbar-expand-lg navbar-dark site-nav">
                <Link className="navbar-brand site-brand" to="/">
                    <span className="brand-mark">F</span>
                    <span>FUNews <span className="fw-normal">System</span></span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Mở menu điều hướng"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-lg-3">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end onClick={() => setIsMenuOpen(false)}>Trang chủ</NavLink>
                        </li>
                    {user && user.accountRole === 1 && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/accounts" onClick={() => setIsMenuOpen(false)}>Quản lý tài khoản</NavLink>
                        </li>
                    )}
                    {user && user.accountRole === 2 && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/staff/categories" onClick={() => setIsMenuOpen(false)}>Danh mục</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/staff/news" onClick={() => setIsMenuOpen(false)}>Bài viết</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/staff/profile" onClick={() => setIsMenuOpen(false)}>Hồ sơ</NavLink>
                            </li>
                        </>
                    )}
                    </ul>
                    <div className="d-lg-flex align-items-center">
                    {user ? (
                        <>
                            <span className="user-greeting">Xin chào, <strong>{user.accountName}</strong></span>
                            <button className="btn btn-light btn-sm px-3" onClick={handleLogout}>Đăng xuất</button>
                        </>
                    ) : (
                        <Link className="btn btn-light btn-sm px-3" to="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                    )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;