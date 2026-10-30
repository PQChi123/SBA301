import { useEffect, useState } from 'react';
import { getActiveNews } from '../services/apiService';
import ArticleDetailModal from '../components/ArticleDetailModal';

/**
* ChiPQCe180289
*
**/
const PublicNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [viewingArticle, setViewingArticle] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getActiveNews();
                setNewsList(data);
            } catch (err) {
                console.error("Lỗi lấy danh sách bài viết:", err);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="container page-content">
            <div className="page-heading">
                <div>
                    <h2>Tin tức nổi bật</h2>
                    <p>Khám phá những tin tức mới nhất từ FUNews.</p>
                </div>
            </div>
            <div className="row">
                {newsList.map((item) => (
                    <div className="col-md-4 mb-4" key={item.newsArticleId}>
                        <article className="card news-card h-100 border-0">
                            <div className="card-body">
                                <span className="badge news-category mb-2">
                                    {item.category ? item.category.categoryName : 'Danh mục'}
                                </span>
                                <h5 className="card-title text-dark">{item.newsTitle}</h5>
                                <h6 className="card-subtitle mb-2 text-muted fw-normal">{item.headline}</h6>
                                <p className="card-text text-secondary">{item.newsContent}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 text-muted fs-7">
                                Nguồn: <strong>{item.newsSource || 'N/A'}</strong> | {new Date(item.createdDate).toLocaleDateString()}
                                <button className="btn btn-sm btn-outline-primary ms-3" onClick={() => setViewingArticle(item)}>Đọc chi tiết</button>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
            {newsList.length === 0 && (
                <div className="card p-5 text-center text-secondary">
                    Chưa có tin tức nào để hiển thị.
                </div>
            )}
            <ArticleDetailModal article={viewingArticle} onClose={() => setViewingArticle(null)} />
        </div>
    );
};

export default PublicNews;