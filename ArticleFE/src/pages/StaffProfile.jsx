import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/apiService';

/**
* ChiPQCe180289
*
**/
const StaffProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({ accountName: '', accountEmail: '', accountPassword: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(Boolean(user?.accountId));
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (!user?.accountId) {
            return;
        }

        const loadProfile = async () => {
            try {
                const profile = await getProfile(user.accountId);
                setFormData({
                    accountName: profile.accountName,
                    accountEmail: profile.accountEmail,
                    accountPassword: '',
                });
            } catch (error) {
                setErrorMsg(error.response?.data?.message || 'Không thể tải thông tin cá nhân.');
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [user?.accountId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const profile = await updateProfile(user.accountId, formData);
            localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
            setFormData(current => ({ ...current, accountPassword: '' }));
            setSuccessMsg('Cập nhật thông tin thành công.');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Không thể cập nhật thông tin cá nhân.');
        }
    };

    if (isLoading) {
        return <div className="container page-content">Đang tải thông tin cá nhân...</div>;
    }

    if (!user?.accountId) {
        return (
            <div className="container page-content">
                <div className="alert alert-danger">Vui lòng đăng nhập để xem thông tin cá nhân.</div>
            </div>
        );
    }

    return (
        <div className="container page-content">
            <div className="page-heading">
                <div>
                    <h2>Thông tin cá nhân</h2>
                    <p>Cập nhật tên, email và mật khẩu tài khoản của bạn.</p>
                </div>
            </div>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label htmlFor="accountName" className="form-label">Tên tài khoản</label>
                    <input
                        id="accountName"
                        className="form-control"
                        required
                        value={formData.accountName}
                        onChange={event => setFormData({ ...formData, accountName: event.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountEmail" className="form-label">Email</label>
                    <input
                        id="accountEmail"
                        type="email"
                        className="form-control"
                        required
                        value={formData.accountEmail}
                        onChange={event => setFormData({ ...formData, accountEmail: event.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountPassword" className="form-label">Mật khẩu mới (để trống nếu không đổi)</label>
                    <div className="input-group">
                        <input
                            id="accountPassword"
                            type={isPasswordVisible ? 'text' : 'password'}
                            className="form-control"
                            minLength={6}
                            value={formData.accountPassword}
                            onChange={event => setFormData({ ...formData, accountPassword: event.target.value })}
                        />
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
                <button type="submit" className="btn btn-primary align-self-start">Lưu thay đổi</button>
            </form>
        </div>
    );
};

export default StaffProfile;
