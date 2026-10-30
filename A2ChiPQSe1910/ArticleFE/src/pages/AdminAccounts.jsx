import { useEffect, useState } from 'react';
import { getAllAccounts, searchAccountByName, createAccount, updateAccount, deleteAccount } from '../services/apiService';

/**
* ChiPQCe180289
*
**/
const AdminAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingAcc, setEditingAcc] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [notice, setNotice] = useState('');
    const [formData, setFormData] = useState({ accountName: '', accountEmail: '', accountPassword: '', accountRole: 2 });

    const loadAccounts = async () => {
        try {
            const data = await getAllAccounts();
            setAccounts(data);
        } catch (err) {
            console.error('Lỗi tải danh sách tài khoản:', err);
        }
    };

    useEffect(() => {
        let isCurrent = true;
        const fetchAccounts = async () => {
            try {
                const data = await getAllAccounts();
                if (isCurrent) {
                    setAccounts(data);
                }
            } catch (err) {
                if (isCurrent) {
                    console.error('Lỗi tải danh sách tài khoản:', err);
                }
            }
        };

        fetchAccounts();
        return () => {
            isCurrent = false;
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchName.trim()) {
            try {
                const results = await searchAccountByName(searchName);
                setAccounts(results);
            } catch (err) {
                console.error('Lỗi tìm kiếm:', err);
            }
        } else {
            loadAccounts();
        }
    };

    const handleOpenModal = (acc = null) => {
        setEditingAcc(acc);
        setFormError('');
        setIsPasswordVisible(false);
        if (acc) {
            setFormData({ accountName: acc.accountName, accountEmail: acc.accountEmail, accountPassword: '', accountRole: Number(acc.accountRole) });
        } else {
            setFormData({ accountName: '', accountEmail: '', accountPassword: '', accountRole: 2 });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setFormError('');
        setNotice('');
        const accountData = {
            ...formData,
            accountRole: Number(formData.accountRole),
        };

        try {
            let savedAccount;
            if (editingAcc) {
                savedAccount = await updateAccount(editingAcc.accountId, accountData);
                if (Number(savedAccount.accountRole) !== accountData.accountRole) {
                    throw new Error('Máy chủ chưa lưu đúng vai trò đã chọn. Vui lòng thử lại.');
                }
                setAccounts(current => current.map(account =>
                    account.accountId === savedAccount.accountId ? savedAccount : account
                ));
                setNotice('Đã cập nhật tài khoản và vai trò thành công.');
            } else {
                savedAccount = await createAccount(accountData);
                setAccounts(current => [...current, savedAccount]);
                setNotice('Đã tạo tài khoản thành công.');
            }
            setShowModal(false);
            setFormData({ accountName: '', accountEmail: '', accountPassword: '', accountRole: 2 });
        } catch (err) {
            const responseMessage = err.response?.data?.message || err.response?.data;
            setFormError(typeof responseMessage === 'string'
                ? responseMessage
                : err.message || 'Có lỗi xảy ra khi lưu tài khoản!');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            try {
                await deleteAccount(id);
                setAccounts(current => current.filter(account => account.accountId !== id));
                setNotice('Đã xóa tài khoản thành công.');
            } catch (err) {
                const responseMessage = err.response?.data?.message || err.response?.data;
                alert(typeof responseMessage === 'string'
                    ? responseMessage
                    : 'Không thể xóa tài khoản này vì đã thực hiện tạo bài viết!');
            }
        }
    };

    return (
        <div className="container page-content">
            <div className="page-heading">
                <div>
                    <h2>Quản lý tài khoản</h2>
                    <p>Quản lý quyền truy cập và thông tin tài khoản trong hệ thống.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Thêm tài khoản</button>
            </div>

            {notice && <div className="alert alert-success" role="status">{notice}</div>}

            <div className="page-toolbar">
                <form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: '400px' }}>
                    <input className="form-control me-2" placeholder="Tìm kiếm theo tên..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <button type="submit" className="btn btn-outline-primary">Tìm</button>
                </form>
            </div>

            <div className="table-wrap">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên Tài Khoản</th>
                    <th>Email</th>
                    <th>Vai Trò (Role)</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {accounts.map((acc) => (
                    <tr key={acc.accountId}>
                        <td>{acc.accountId}</td>
                        <td>{acc.accountName}</td>
                        <td>{acc.accountEmail}</td>
                        <td>{acc.accountRole === 1 ? <span className="badge bg-danger">Admin</span> : <span className="badge bg-info text-dark">Staff</span>}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleOpenModal(acc)}>Sửa</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(acc.accountId)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 id="account-modal-title">{editingAcc ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}</h5>
                                <button type="button" className="btn-close" aria-label="Đóng" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {formError && <div className="alert alert-danger" role="alert">{formError}</div>}
                                    <div className="mb-3">
                                        <label htmlFor="account-name">Tên người dùng</label>
                                        <input id="account-name" className="form-control" required value={formData.accountName} onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="account-email">Email</label>
                                        <input id="account-email" type="email" className="form-control" required value={formData.accountEmail} onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="account-password">Mật khẩu</label>
                                        <div className="input-group">
                                            <input
                                                id="account-password"
                                                type={isPasswordVisible ? 'text' : 'password'}
                                                className="form-control"
                                                minLength={6}
                                                placeholder={editingAcc ? 'Để trống nếu không muốn đổi' : 'Tối thiểu 6 ký tự'}
                                                required={!editingAcc}
                                                value={formData.accountPassword}
                                                onChange={(e) => setFormData({ ...formData, accountPassword: e.target.value })}
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
                                        {editingAcc && <div className="form-text">Để trống nếu bạn không muốn đổi mật khẩu.</div>}
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="account-role">Vai trò</label>
                                        <select id="account-role" className="form-select" value={formData.accountRole} onChange={(e) => setFormData(current => ({ ...current, accountRole: Number(e.target.value) }))}>
                                            <option value={1}>Admin (Role = 1)</option>
                                            <option value={2}>Staff (Role = 2)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" disabled={isSaving} onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary px-4" disabled={isSaving}>
                                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAccounts;