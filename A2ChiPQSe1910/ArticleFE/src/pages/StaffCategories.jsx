import { useEffect, useState } from 'react';
import { getAllCategories, searchCategoryByName, createCategory, updateCategory, deleteCategory } from '../services/apiService';

/**
* ChiPQCe180289
*
**/
const StaffCategories = () => {
    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);
    const [notice, setNotice] = useState('');
    const [formData, setFormData] = useState({ categoryName: '', categoryDescription: '', isActive: true });

    const loadData = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    useEffect(() => {
        let isCurrent = true;
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                if (isCurrent) {
                    setCategories(data);
                }
            } catch (error) {
                if (isCurrent) {
                    console.error('Lỗi tải danh sách danh mục:', error);
                }
            }
        };

        fetchCategories();
        return () => {
            isCurrent = false;
        };
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchName.trim()) {
            const data = await searchCategoryByName(searchName);
            setCategories(data);
        } else {
            loadData();
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData({ categoryName: item.categoryName, categoryDescription: item.categoryDescription || '', isActive: item.isActive });
        } else {
            setFormData({ categoryName: '', categoryDescription: '', isActive: true });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                const updated = await updateCategory(editingItem.categoryId, formData);
                setCategories(current => current.map(category =>
                    category.categoryId === updated.categoryId ? updated : category
                ));
                setNotice('Đã cập nhật danh mục.');
            } else {
                const created = await createCategory(formData);
                setCategories(current => [...current, created]);
                setNotice('Đã tạo danh mục.');
            }
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.message || err.response?.data || 'Có lỗi xảy ra!');
        }
    };

    const handleToggleStatus = async (category) => {
        setUpdatingStatusId(category.categoryId);
        setNotice('');
        try {
            const updated = await updateCategory(category.categoryId, {
                categoryName: category.categoryName,
                categoryDescription: category.categoryDescription || '',
                parentCategoryId: category.parentCategory?.categoryId || null,
                isActive: !category.isActive,
            });
            setCategories(current => current.map(item =>
                item.categoryId === updated.categoryId ? updated : item
            ));
            setNotice(`Đã ${updated.isActive ? 'bật' : 'tắt'} danh mục "${updated.categoryName}".`);
        } catch (err) {
            alert(err.response?.data?.message || err.response?.data || 'Không thể cập nhật trạng thái danh mục.');
        } finally {
            setUpdatingStatusId(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await deleteCategory(id);
                setCategories(current => current.filter(category => category.categoryId !== id));
                setNotice('Đã xóa danh mục.');
            } catch (err) {
                alert(err.response?.data?.message || err.response?.data || 'Không thể xóa danh mục này vì đã có bài viết!');
            }
        }
    };

    return (
        <div className="container page-content">
            <div className="page-heading">
                <div>
                    <h2>Quản lý danh mục</h2>
                    <p>Tổ chức và cập nhật các danh mục tin tức.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Thêm danh mục</button>
            </div>

            {notice && <div className="alert alert-success" role="status">{notice}</div>}

            <div className="page-toolbar">
                <form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: '400px' }}>
                    <input className="form-control me-2" placeholder="Tìm kiếm theo tên..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <button type="submit" className="btn btn-outline-primary">Tìm</button>
                </form>
            </div>

            <div className="table-wrap">
            <table className="table table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên Danh Mục</th>
                    <th>Mô Tả</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((cat) => (
                    <tr key={cat.categoryId}>
                        <td>{cat.categoryId}</td>
                        <td>{cat.categoryName}</td>
                        <td>{cat.categoryDescription}</td>
                        <td>{cat.isActive ? <span className="badge bg-success">Active</span> : <span className="badge bg-secondary">Inactive</span>}</td>
                        <td className="category-actions">
                            <button
                                className={`btn btn-sm ${cat.isActive ? 'btn-outline-secondary' : 'btn-outline-success'} me-2`}
                                disabled={updatingStatusId === cat.categoryId}
                                onClick={() => handleToggleStatus(cat)}
                            >
                                {updatingStatusId === cat.categoryId ? 'Đang lưu...' : cat.isActive ? 'Tắt' : 'Bật'}
                            </button>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleOpenModal(cat)}>Sửa</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.categoryId)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>{editingItem ? 'Cập Nhật Danh Mục' : 'Tạo Danh Mục Mới'}</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label>Tên Danh Mục</label>
                                        <input className="form-control" required value={formData.categoryName} onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Mô Tả</label>
                                        <textarea className="form-control" value={formData.categoryDescription} onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}></textarea>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input type="checkbox" className="form-check-input" id="activeCheck" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                                        <label className="form-check-label" htmlFor="activeCheck">Hoạt động (Active)</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffCategories;