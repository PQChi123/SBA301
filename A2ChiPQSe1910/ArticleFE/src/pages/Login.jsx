import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAccount } from '../services/apiService';

/**
* ChiPQCe180289
*
**/
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginAccount(email, password);
            localStorage.setItem('user', JSON.stringify(data));


            if (data.accountRole === 1) {
                navigate('/admin/accounts');
            } else {
                navigate('/staff/news');
            }
        } catch (err) {
            setErrorMsg(err.response?.data || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
        }
    };

    return (
        <div className="container page-content login-layout">
            <div className="card login-card">
                <div className="login-icon">F</div>
                <h3>Chào mừng trở lại</h3>
                <p className="login-subtitle">Đăng nhập để tiếp tục vào hệ thống FUNews.</p>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label">Email</label>
                        <input id="login-email" type="email" className="form-control" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="login-password" className="form-label">Mật khẩu</label>
                        <div className="input-group">
                            <input id="login-password" type={isPasswordVisible ? 'text' : 'password'} className="form-control" placeholder="Nhập mật khẩu" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="button"
                                className="btn btn-outline-primary password-toggle"
                                aria-label={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                aria-pressed={isPasswordVisible}
                                onClick={() => setIsPasswordVisible(visible => !visible)}
                            >
                                {isPasswordVisible ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 mt-2">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default Login;