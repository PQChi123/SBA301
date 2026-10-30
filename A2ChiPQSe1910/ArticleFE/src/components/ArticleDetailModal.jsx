/**
* ChiPQCe180289
*
**/
const ArticleDetailModal = ({ article, onClose }) => {
    if (!article) {
        return null;
    }

    return (
        <div className="modal-backdrop-custom" onMouseDown={event => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        }}>
            <section className="modal-dialog modal-lg" role="dialog" aria-modal="true" aria-labelledby="article-detail-title">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <span className="badge news-category mb-2">{article.category?.categoryName || 'Tin tức'}</span>
                            <h2 className="article-detail-title" id="article-detail-title">{article.newsTitle}</h2>
                        </div>
                        <button type="button" className="btn-close ms-3" aria-label="Đóng" onClick={onClose}></button>
                    </div>
                    <div className="modal-body article-detail-body">
                        {article.headline && <p className="article-detail-headline">{article.headline}</p>}
                        <div className="article-detail-meta">
                            <span>{article.createdBy?.accountName || 'FUNews'}</span>
                            <span>{article.createdDate ? new Date(article.createdDate).toLocaleString() : ''}</span>
                        </div>
                        <div className="article-detail-content">{article.newsContent}</div>
                        <div className="article-detail-footer">
                            <span>Nguồn: <strong>{article.newsSource || 'N/A'}</strong></span>
                            {article.tags?.length > 0 && (
                                <div className="d-flex flex-wrap gap-2">
                                    {article.tags.map(tag => (
                                        <span key={tag.tagId} className="badge text-bg-light">{tag.tagName}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary px-4" onClick={onClose}>Đóng</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleDetailModal;
