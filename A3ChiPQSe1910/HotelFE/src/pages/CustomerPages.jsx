import { useEffect, useState } from 'react'
import {
  cancelBooking,
  createBooking,
  getAllList,
  getApiError,
  getMyBookings,
  getProfile,
  updateProfile,
} from '../service/hotelServiceAPI.js'

export function ProfilePage() {
  const [form, setForm] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getProfile()
      .then(setForm)
      .catch((error) => setErrorMessage(getApiError(error)))
  }, [])

  const save = async (event) => {
    event.preventDefault()
    setMessage('')
    setErrorMessage('')
    try {
      setForm(await updateProfile(form))
      setMessage('Hồ sơ đã được cập nhật.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  if (errorMessage && !form) return <p className="error">{errorMessage}</p>
  if (!form) return <p>Đang tải hồ sơ...</p>

  return (
    <section className="content-card">
      <p className="eyebrow">TÀI KHOẢN</p>
      <h1>Thông tin cá nhân</h1>
      <form className="form-grid" onSubmit={save}>
        <label>
          Họ và tên
          <input
            required
            maxLength={100}
            value={form.customerFullName}
            onChange={(event) => setForm({ ...form, customerFullName: event.target.value })}
          />
        </label>
        <label>
          Email đăng nhập
          <input value={form.emailAddress} disabled />
        </label>
        <label>
          Điện thoại
          <input
            maxLength={20}
            value={form.telephone || ''}
            onChange={(event) => setForm({ ...form, telephone: event.target.value })}
          />
        </label>
        <label>
          Ngày sinh
          <input
            type="date"
            value={form.customerBirthday || ''}
            onChange={(event) => setForm({ ...form, customerBirthday: event.target.value || null })}
          />
        </label>
        {message && <p className="success form-wide">{message}</p>}
        {errorMessage && <p className="error form-wide">{errorMessage}</p>}
        <button className="primary-button form-wide">Lưu thay đổi</button>
      </form>
    </section>
  )
}

export function BookingPage({ initialRoom }) {
  const [rooms, setRooms] = useState([])
  const [selectedIds, setSelectedIds] = useState(initialRoom ? [initialRoom.roomId] : [])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    getAllList()
      .then(setRooms)
      .catch((error) => setErrorMessage(getApiError(error)))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setLoading(true)
    try {
      await createBooking({
        rooms: selectedIds.map((roomId) => ({ roomId, startDate, endDate })),
      })
      window.alert('Đặt phòng thành công.')
      setSelectedIds([])
    } catch (error) {
      setErrorMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="content-card">
      <p className="eyebrow">ĐẶT PHÒNG TRỰC TUYẾN</p>
      <h1>Chọn phòng và ngày lưu trú</h1>
      <form onSubmit={submit}>
        <div className="inline-fields">
          <label>
            Ngày nhận phòng
            <input type="date" min={today} required value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label>
            Ngày trả phòng
            <input type="date" min={startDate || today} required value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </label>
        </div>
        <div className="room-choice-list">
          {rooms.filter((room) => room.roomStatus === 1).map((room) => (
            <label className="room-choice" key={room.roomId}>
              <input
                type="checkbox"
                checked={selectedIds.includes(room.roomId)}
                onChange={(event) => setSelectedIds(
                  event.target.checked
                    ? [...selectedIds, room.roomId]
                    : selectedIds.filter((id) => id !== room.roomId)
                )}
              />
              <span>
                <strong>Phòng {room.roomNumber}</strong>
                <small>{room.roomTypeName} · {Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ / ngày</small>
              </span>
            </label>
          ))}
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="primary-button" disabled={loading || selectedIds.length === 0}>
          {loading ? 'Đang tạo đơn...' : `Đặt ${selectedIds.length} phòng`}
        </button>
      </form>
    </section>
  )
}

export function BookingHistoryPage() {
  const [bookings, setBookings] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const refresh = () => getMyBookings()
    .then(setBookings)
    .catch((error) => setErrorMessage(getApiError(error)))

  useEffect(() => {
    refresh()
  }, [])

  const cancel = async (bookingId) => {
    if (!window.confirm('Bạn muốn hủy đơn đặt phòng này?')) return
    try {
      await cancelBooking(bookingId)
      await refresh()
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  if (!bookings && !errorMessage) return <p>Đang tải lịch sử đặt phòng...</p>
  return (
    <section>
      <p className="eyebrow">TÀI KHOẢN</p>
      <h1>Lịch sử đặt phòng</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {bookings?.length === 0 && <p className="notice">Bạn chưa có đơn đặt phòng.</p>}
      <div className="booking-list">
        {bookings?.map((booking) => (
          <article className="content-card booking-card" key={booking.bookingReservationId}>
            <div className="page-heading">
              <div>
                <h2>Đơn #{booking.bookingReservationId}</h2>
                <p>Ngày tạo: {booking.bookingDate} · Trạng thái: {booking.bookingStatus === 1 ? 'Đang hoạt động' : 'Đã hủy/đóng'}</p>
              </div>
              <strong>{Number(booking.totalPrice).toLocaleString('vi-VN')} đ</strong>
            </div>
            <ul>
              {booking.details.map((detail) => (
                <li key={detail.roomId}>
                  Phòng {detail.roomNumber}: {detail.startDate} – {detail.endDate}
                </li>
              ))}
            </ul>
            {booking.bookingStatus === 1 && (
              <button className="danger-button" onClick={() => cancel(booking.bookingReservationId)}>
                Hủy đơn
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
