import { useEffect, useState } from 'react';
import { getAllNews, getNewsHistoryByStaff, searchNewsByTitle, getAllCategories, getAllTags, createNewsArticle, updateNewsArticle, deleteNewsArticle } from '../services/apiService';
import ArticleDetailModal from '../components/ArticleDetailModal';

/**
* ChiPQCe180289
*
**/
const StaffNews = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [newsList, setNewsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isHistoryView, setIsHistoryView] = useState(false);
    const [viewingArticle, setViewingArticle] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        newsTitle: '', headline: '', newsContent: '', newsSource: '', categoryId: '', newsStatus: true, tagIds: []
    });

    const loadData = async () => {
        try {
            const [newsData, catData, tagData] = await Promise.all([
                isHistoryView ? getNewsHistoryByStaff(user?.accountId) : getAllNews(),
                getAllCategories(),
                getAllTags()
            ]);
            setNewsList(newsData);
            setCategories(catData);
            setTags(tagData);
        } catch (err) {
            console.error('Lỗi tải dữ liệu:', err);
        }
    };

    useEffect(() => {
        let isCurrent = true;
        const fetchData = async () => {
            try {
                const [newsData, catData, tagData] = await Promise.all([
                    isHistoryView ? getNewsHistoryByStaff(user?.accountId) : getAllNews(),
                    getAllCategories(),
                    getAllTags()
                ]);
                if (isCurrent) {
                    setNewsList(newsData);
                    setCategories(catData);
                    setTags(tagData);
                }
            } catch (error) {
                if (isCurrent) {
                    console.error('Lỗi tải dữ liệu:', error);
                }
            }
        };

        fetchData();
        return () => {
            isCurrent = false;
        };
    }, [isHistoryView, user?.accountId]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            const results = await searchNewsByTitle(keyword);
            setNewsList(results);
        } else {
            loadData();
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            setFormData({
                newsTitle: item.newsTitle,
                headline: item.headline || '',
                newsContent: item.newsContent || '',
                newsSource: item.newsSource || '',
                categoryId: item.category ? item.category.categoryId : '',
                newsStatus: item.newsStatus,
                tagIds: item.tags ? item.tags.map(t => t.tagId) : []
            });
        } else {
            setFormData({
                newsTitle: '', headline: '', newsContent: '', newsSource: '',
                categoryId: categories.length > 0 ? categories[0].categoryId : '',
                newsStatus: true, tagIds: []
            });
        }
        setShowModal(true);
    };

    const handleTagCheckbox = (tagId) => {
        const currentTags = [...formData.tagIds];
        if (currentTags.includes(tagId)) {
            setFormData({ ...formData, tagIds: currentTags.filter(id => id !== tagId) });
        } else {
            setFormData({ ...formData, tagIds: [...currentTags, tagId] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                createdById: user?.accountId,
                updatedById: user?.accountId
            };

            if (editingItem) {
                await updateNewsArticle(editingItem.newsArticleId, payload);
            } else {
                await createNewsArticle(payload);
            }
            setShowModal(false);
            loadData();
        } catch (err) {
            alert(err.response?.data || 'Có lỗi xảy ra khi lưu bài viết!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await deleteNewsArticle(id);
                loadData();
            } catch {
                alert('Không thể xóa bài viết này!');
            }
        }
    };

    return (
        <div className="container page-content">
            <div className="page-heading">
                <div>
                    <h2>{isHistoryView ? 'Lịch sử bài viết' : 'Quản lý bài viết'}</h2>
                    <p>{isHistoryView ? 'Theo dõi những bài viết bạn đã tạo.' : 'Tạo, cập nhật và quản lý các bài viết tin tức.'}</p>
                </div>
                <div className="page-heading-actions">
                    <button className="btn btn-outline-primary" onClick={() => setIsHistoryView(!isHistoryView)}>
                        {isHistoryView ? 'Xem tất cả bài viết' : 'Xem lịch sử'}
                    </button>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Tạo bài viết</button>
                </div>
            </div>

            <div className="page-toolbar">
                <form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: '400px' }}>
                    <input className="form-control me-2" placeholder="Tìm theo tiêu đề..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <button type="submit" className="btn btn-outline-primary">Tìm</button>
                </form>
            </div>

            <div className="table-wrap">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tiêu Đề</th>
                    <th>Danh Mục</th>
                    <th>Thẻ (Tags)</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Tạo</th>
                    <th>Chi Tiết</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                {newsList.map((item) => (
                    <tr key={item.newsArticleId}>
                        <td>{item.newsArticleId}</td>
                        <td><strong>{item.newsTitle}</strong></td>
                        <td>{item.category?.categoryName}</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => setViewingArticle(item)}>Xem</button>
                        </td>
                        <td>
                            {item.tags?.map(t => (
                                <span key={t.tagId} className="badge bg-secondary me-1">{t.tagName}</span>
                            ))}
                        </td>
                        <td>{item.newsStatus ? <span className="badge bg-success">Active</span> : <span className="badge bg-warning text-dark">Inactive</span>}</td>
                        <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleOpenModal(item)}>Sửa</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.newsArticleId)}>Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Modal Popup Create/Update News */}
            {showModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>{editingItem ? 'Cập Nhật Bài Viết' : 'Tạo Bài Viết Mới'}</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label>Tiêu Đề (News Title)</label>
                                        <input className="form-control" required value={formData.newsTitle} onChange={(e) => setFormData({ ...formData, newsTitle: e.target.value })} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Headline</label>
                                        <input className="form-control" value={formData.headline} onChange={(e) => setFormData({ ...formData, headline: e.target.value })} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Nội Dung</label>
                                        <textarea className="form-control" rows="4" value={formData.newsContent} onChange={(e) => setFormData({ ...formData, newsContent: e.target.value })}></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label>Danh Mục (Category)</label>
                                            <select className="form-select" required value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}>
                                                <option value="">-- Chọn danh mục --</option>
                                                {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label>Nguồn Tin</label>
                                            <input className="form-control" value={formData.newsSource} onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label>Chọn Tags:</label>
                                        <div className="d-flex flex-wrap gap-2 mt-1">
                                            {tags.map(tag => (
                                                <div key={tag.tagId} className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={`tag-${tag.tagId}`}
                                                        checked={formData.tagIds.includes(tag.tagId)}
                                                        onChange={() => handleTagCheckbox(tag.tagId)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`tag-${tag.tagId}`}>{tag.tagName}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input type="checkbox" className="form-check-input" id="statusCheck" checked={formData.newsStatus} onChange={(e) => setFormData({ ...formData, newsStatus: e.target.checked })} />
                                        <label className="form-check-label" htmlFor="statusCheck">Trạng thái Active</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                                    <button type="submit" className="btn btn-primary">Lưu Bài Viết</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <ArticleDetailModal article={viewingArticle} onClose={() => setViewingArticle(null)} />
        </div>
    );
};

export default StaffNews;