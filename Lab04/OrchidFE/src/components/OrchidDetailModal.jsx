export default function OrchidDetailModal({ orchid, onClose }) {
    // Nếu không có dữ liệu orchid truyền vào thì không render gì cả
    if (!orchid) return null;

    return (
        /* Lớp nền mờ: Click vào vùng trống nền mờ sẽ gọi onClose để tắt Popup */
        <div className="modal-overlay" onClick={onClose}>
            

            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginTop: 0, color: '#007bff' }}>Chi Tiết Hoa Lan</h3>

                {/* 1. Hiển thị hình ảnh nếu có URL */}
                {orchid.url && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <img
                            src={orchid.url}
                            alt={orchid.name}
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                    </div>
                )}

                {/* 2. Danh sách thông tin chi tiết */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <p style={{ margin: 0 }}><strong>ID:</strong> {orchid.id}</p>
                    <p style={{ margin: 0 }}><strong>Tên hoa lan:</strong> {orchid.name}</p>
                    <p style={{ margin: 0 }}><strong>Mã danh mục:</strong> {orchid.categoryId}</p>
                    <p style={{ margin: 0 }}>
                        <strong>Tự nhiên (Natural):</strong> {orchid.isNatural ? 'Có' : 'Không'}
                    </p>
                    <p style={{ margin: 0 }}>
                        <strong>Cuốn hút (Attractive):</strong> {orchid.isAttractive ? 'Có' : 'Không'}
                    </p>
                    <p style={{ margin: 0 }}>
                        <strong>Mô tả:</strong> {orchid.description || 'Chưa có mô tả'}
                    </p>
                </div>

                {/* 3. Nút đóng Popup */}
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}