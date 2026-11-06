import { useEffect, useState } from 'react'
import { getApiError, getRoomById } from '../service/hotelServiceAPI.js'

export default function HotelTable({ listHotel, canBook = false, onBook }) {
  const [detailRoom, setDetailRoom] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    if (!detailOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDetailOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [detailOpen])

  const showDetails = async (roomId) => {
    setDetailRoom(null)
    setDetailError('')
    setDetailOpen(true)
    setDetailLoading(true)
    try {
      setDetailRoom(await getRoomById(roomId))
    } catch (error) {
      setDetailError(`Không thể tải chi tiết phòng: ${getApiError(error)}`)
    } finally {
      setDetailLoading(false)
    }
  }

  if (listHotel.length === 0) {
    return <p className="notice">Không tìm thấy phòng nào.</p>
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Số phòng</th>
            <th>Loại phòng</th>
            <th>Mô tả</th>
            <th>Sức chứa</th>
            <th>Trạng thái</th>
            <th>Giá / ngày</th>
            <th>Chi tiết</th>
            {canBook && <th>Đặt phòng</th>}
          </tr>
        </thead>
        <tbody>
          {listHotel.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.roomTypeName}</td>
              <td>{room.roomDetailDescription}</td>
              <td>{room.roomMaxCapacity}</td>
              <td>{room.roomStatus === 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
              <td>{Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ</td>
              <td>
                <button type="button" onClick={() => showDetails(room.roomId)}>
                  Chi tiết
                </button>
              </td>
              {canBook && (
                <td>
                  <button
                    type="button"
                    disabled={room.roomStatus !== 1}
                    onClick={() => onBook(room)}
                  >
                    Chọn phòng
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {detailOpen && (
        <div className="room-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDetailOpen(false)
        }}>
          <section className="content-card room-detail" role="dialog" aria-modal="true" aria-labelledby="room-detail-title" aria-live="polite">
            <div className="page-heading">
              <div>
                <p className="eyebrow">CHI TIẾT PHÒNG</p>
                <h2 id="room-detail-title">{detailRoom ? `Phòng ${detailRoom.roomNumber}` : 'Thông tin phòng'}</h2>
              </div>
              <button type="button" onClick={() => setDetailOpen(false)}>Đóng</button>
            </div>
            {detailLoading && <p>Đang tải chi tiết phòng...</p>}
            {detailError && <p className="error">{detailError}</p>}
            {detailRoom && (
              <dl className="room-detail-grid">
                <div><dt>Mã phòng</dt><dd>{detailRoom.roomId}</dd></div>
                <div><dt>Loại phòng</dt><dd>{detailRoom.roomTypeName}</dd></div>
                <div><dt>Sức chứa tối đa</dt><dd>{detailRoom.roomMaxCapacity} người</dd></div>
                <div><dt>Giá mỗi ngày</dt><dd>{Number(detailRoom.roomPricePerDay).toLocaleString('vi-VN')} đ</dd></div>
                <div><dt>Trạng thái</dt><dd>{detailRoom.roomStatus === 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</dd></div>
                <div><dt>Mô tả</dt><dd>{detailRoom.roomDetailDescription || 'Chưa có mô tả.'}</dd></div>
              </dl>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
