function Modal({ title, onClose, width = '480px', children }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '8px',
          width,
          maxWidth: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ marginTop: 0 }}>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Đóng hộp thoại">
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default Modal;
