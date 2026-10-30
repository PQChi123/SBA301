import { Link, useNavigate } from 'react-router-dom';

/**
* ChiPQCe180289
*
**/
const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-4 shadow">
            <Link className="navbar-brand fw-bold text-warning" to="/">FUNews System</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-brand-nav navbar-nav me-auto">
                    <li className="nav-item"><Link className="nav-link" to="/">Trang Chủ (Public)</Link></li>

                    {/* Admin Options */}
                    {user && user.accountRole === 1 && (
                        <li className="nav-item"><Link className="nav-link" to="/admin/accounts">Quản Lý Account</Link></li>
                    )}

                    {/* Staff Options */}
                    {user && user.accountRole === 2 && (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/staff/categories">Quản Lý Category</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/staff/news">Quản Lý Bài Viết</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/staff/profile">Thông Tin Cá Nhân</Link></li>
                        </>
                    )}
                </ul>
                <div className="d-flex align-items-center text-white">
                    {user ? (
                        <>
                            <span className="me-3">Xin chào, <strong>{user.accountName}</strong> ({user.accountRole === 1 ? 'Admin' : 'Staff'})</span>
                            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Đăng Xuất</button>
                        </>
                    ) : (
                        <Link className="btn btn-primary btn-sm" to="/login">Đăng Nhập</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;