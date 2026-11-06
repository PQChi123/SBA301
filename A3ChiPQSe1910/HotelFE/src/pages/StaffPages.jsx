/*
* Phạm Quốc Chí Ce180289
*/
import { useEffect, useState } from 'react'
import {
  createCustomer,
  createRoom,
  deleteBooking,
  deleteCustomer,
  deleteRoom,
  getAllList,
  getApiError,
  getBookings,
  getCustomers,
  getRoomTypes,
  updateBookingStatus,
  updateCustomer,
  updateRoom,
} from '../service/hotelServiceAPI.js'

const emptyCustomer = {
  customerFullName: '',
  telephone: '',
  emailAddress: '',
  customerBirthday: '',
  customerStatus: 1,
  password: '',
}

const emptyRoom = {
  roomNumber: '',
  roomDetailDescription: '',
  roomMaxCapacity: 1,
  roomTypeId: '',
  roomStatus: 1,
  roomPricePerDay: '',
}

function useTimedAlert() {
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (!alert) return undefined

    const timeout = window.setTimeout(() => setAlert(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [alert])

  return [alert, (message) => setAlert({ message })]
}

function ActionAlert({ alert }) {
  if (!alert) return null
  return <div className="action-alert" role="status">{alert.message}</div>
}

export function StaffCustomersPage() {
  const [customers, setCustomers] = useState([])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(emptyCustomer)
  const [editingId, setEditingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [alert, showAlert] = useTimedAlert()

  const refresh = async (search = query) => {
    try {
      setCustomers(await getCustomers(search))
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  useEffect(() => {
    getCustomers('')
      .then(setCustomers)
      .catch((error) => setErrorMessage(getApiError(error)))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    const data = { ...form, customerBirthday: form.customerBirthday || null }
    if (editingId && !data.password) delete data.password
    try {
      const updating = Boolean(editingId)
      if (updating) await updateCustomer(editingId, data)
      else await createCustomer(data)
      setForm(emptyCustomer)
      setEditingId(null)
      await refresh()
      showAlert(updating ? 'Đã cập nhật khách hàng.' : 'Đã tạo khách hàng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  const edit = (customer) => {
    setEditingId(customer.customerId)
    setForm({ ...emptyCustomer, ...customer, password: '' })
  }

  const remove = async (id) => {
    if (!window.confirm('Bạn muốn xóa/vô hiệu hóa khách hàng này?')) return
    try {
      await deleteCustomer(id)
      await refresh()
      showAlert('Đã xóa/vô hiệu hóa khách hàng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  return (
    <section>
      <ActionAlert alert={alert} />
      <p className="eyebrow">STAFF · KHÁCH HÀNG</p>
      <h1>Quản lý khách hàng</h1>
      <div className="admin-layout">
        <form className="content-card form-grid" onSubmit={submit}>
          <h2 className="form-wide">{editingId ? 'Cập nhật khách hàng' : 'Thêm khách hàng'}</h2>
          <label>Họ và tên<input required maxLength={100} value={form.customerFullName} onChange={(event) => setForm({ ...form, customerFullName: event.target.value })} /></label>
          <label>Email<input required type="email" value={form.emailAddress} onChange={(event) => setForm({ ...form, emailAddress: event.target.value })} /></label>
          <label>Điện thoại<input maxLength={20} value={form.telephone || ''} onChange={(event) => setForm({ ...form, telephone: event.target.value })} /></label>
          <label>Ngày sinh<input type="date" value={form.customerBirthday || ''} onChange={(event) => setForm({ ...form, customerBirthday: event.target.value })} /></label>
          <label>Mật khẩu {editingId && '(để trống nếu không đổi)'}<input type="password" minLength={8} value={form.password} required={!editingId} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          <label>Trạng thái<select value={form.customerStatus} onChange={(event) => setForm({ ...form, customerStatus: Number(event.target.value) })}><option value={1}>Hoạt động</option><option value={0}>Vô hiệu hóa</option></select></label>
          {errorMessage && <p className="error form-wide">{errorMessage}</p>}
          <button className="primary-button">{editingId ? 'Lưu' : 'Tạo khách hàng'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyCustomer) }}>Hủy sửa</button>}
        </form>
        <div className="content-card">
          <label className="search-field">Tìm theo tên/email
            <input value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <button onClick={() => refresh()}>Tìm</button>
          <div className="table-scroll">
            <table><thead><tr><th>ID</th><th>Tên</th><th>Email</th><th>Điện thoại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
              <tbody>{customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td><td>{customer.customerFullName}</td><td>{customer.emailAddress}</td>
                  <td>{customer.telephone}</td><td>{customer.customerStatus === 1 ? 'Hoạt động' : 'Vô hiệu hóa'}</td>
                  <td className="actions"><button onClick={() => edit(customer)}>Sửa</button><button className="danger-button" onClick={() => remove(customer.customerId)}>Xóa</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StaffRoomsPage() {
  const [rooms, setRooms] = useState([])
  const [allRooms, setAllRooms] = useState([])
  const [types, setTypes] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [form, setForm] = useState(emptyRoom)
  const [editingId, setEditingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [roomNumberTouched, setRoomNumberTouched] = useState(false)
  const [alert, showAlert] = useTimedAlert()
  const roomNumberValue = form.roomNumber === '' ? null : Number(form.roomNumber)
  const duplicateRoomNumber = roomNumberValue !== null && allRooms.some(
    (room) => room.roomId !== editingId && Number(room.roomNumber) === roomNumberValue,
  )
  const roomNumberError = form.roomNumber === ''
    ? 'Số phòng không được để trống'
    : !Number.isSafeInteger(roomNumberValue) || roomNumberValue < 1
      ? 'Số phòng phải là số nguyên lớn hơn 0'
      : duplicateRoomNumber
        ? 'Số phòng đã tồn tại'
        : ''
  const visibleRoomNumberError = roomNumberTouched ? roomNumberError : ''

  const refresh = async (search = appliedSearch) => {
    try {
      const [matchingRooms, inventory] = await Promise.all([getAllList(search), getAllList('')])
      setRooms(matchingRooms)
      setAllRooms(inventory)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  useEffect(() => {
    getAllList('')
      .then((inventory) => {
        setRooms(inventory)
        setAllRooms(inventory)
      })
      .catch((error) => setErrorMessage(getApiError(error)))
    getRoomTypes().then(setTypes).catch((error) => setErrorMessage(getApiError(error)))
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    if (roomNumberError) return
    const data = {
      ...form,
      roomNumber: roomNumberValue,
      roomMaxCapacity: Number(form.roomMaxCapacity),
      roomTypeId: Number(form.roomTypeId),
      roomStatus: Number(form.roomStatus),
      roomPricePerDay: Number(form.roomPricePerDay),
    }
    try {
      const updating = Boolean(editingId)
      if (updating) await updateRoom(editingId, data)
      else await createRoom(data)
      setEditingId(null)
      setForm(emptyRoom)
      setRoomNumberTouched(false)
      await refresh()
      showAlert(updating ? 'Đã cập nhật phòng.' : 'Đã tạo phòng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  const searchRooms = (event) => {
    event.preventDefault()
    setAppliedSearch(searchInput)
    refresh(searchInput)
  }

  const remove = async (id) => {
    if (!window.confirm('Xóa phòng? Phòng đã có giao dịch sẽ được chuyển sang trạng thái ngừng hoạt động.')) return
    try {
      await deleteRoom(id)
      await refresh()
      showAlert('Đã xóa/cập nhật trạng thái phòng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  return (
    <section>
      <ActionAlert alert={alert} />
      <p className="eyebrow">STAFF · PHÒNG</p>
      <h1>Quản lý phòng</h1>
      <div className="admin-layout">
        <form className="content-card form-grid" onSubmit={submit}>
          <h2 className="form-wide">{editingId ? 'Cập nhật phòng' : 'Thêm phòng'}</h2>
          <label>Số phòng<input type="number" min="1" step="1" required value={form.roomNumber} onChange={(event) => { setRoomNumberTouched(true); setForm({ ...form, roomNumber: event.target.value }); setErrorMessage('') }} />{visibleRoomNumberError && <span className="error">{visibleRoomNumberError}</span>}</label>
          <label>Loại phòng<select required value={form.roomTypeId} onChange={(event) => setForm({ ...form, roomTypeId: event.target.value })}><option value="">Chọn loại phòng</option>{types.map((type) => <option key={type.roomTypeId} value={type.roomTypeId}>{type.roomTypeName}</option>)}</select></label>
          <label>Sức chứa<input type="number" min="1" required value={form.roomMaxCapacity} onChange={(event) => setForm({ ...form, roomMaxCapacity: event.target.value })} /></label>
          <label>Giá mỗi ngày<input type="number" min="0" step="0.01" required value={form.roomPricePerDay} onChange={(event) => setForm({ ...form, roomPricePerDay: event.target.value })} /></label>
          <label>Trạng thái<select value={form.roomStatus} onChange={(event) => setForm({ ...form, roomStatus: event.target.value })}><option value={1}>Hoạt động</option><option value={0}>Ngừng hoạt động</option></select></label>
          <label className="form-wide">Mô tả<textarea maxLength={255} value={form.roomDetailDescription || ''} onChange={(event) => setForm({ ...form, roomDetailDescription: event.target.value })} /></label>
          {errorMessage && <p className="error form-wide">{errorMessage}</p>}
          <button className="primary-button" disabled={Boolean(roomNumberError)}>{editingId ? 'Lưu' : 'Tạo phòng'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyRoom); setRoomNumberTouched(false) }}>Hủy sửa</button>}
        </form>
        <div className="content-card">
          <form onSubmit={searchRooms}>
            <label className="search-field">Tìm số phòng/mô tả<input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} /></label>
            <button type="submit">Tìm</button>
          </form>
          <div className="table-scroll">
            <table><thead><tr><th>ID</th><th>Số phòng</th><th>Loại</th><th>Giá</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
              <tbody>{rooms.map((room) => (
                <tr key={room.roomId}>
                  <td>{room.roomId}</td><td>{room.roomNumber}</td><td>{room.roomTypeName}</td>
                  <td>{Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ</td><td>{room.roomStatus === 1 ? 'Hoạt động' : 'Ngừng'}</td>
                  <td className="actions">
                    <button onClick={() => { setEditingId(room.roomId); setRoomNumberTouched(false); setForm({ ...emptyRoom, ...room, roomTypeId: String(types.find((type) => type.roomTypeName === room.roomTypeName)?.roomTypeId || ''), roomPricePerDay: String(room.roomPricePerDay) }) }}>Sửa</button>
                    <button className="danger-button" onClick={() => remove(room.roomId)}>Xóa</button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StaffBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [alert, showAlert] = useTimedAlert()

  const refresh = async () => {
    try {
      setBookings(await getBookings())
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch((error) => setErrorMessage(getApiError(error)))
  }, [])

  const changeStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, Number(status))
      await refresh()
      showAlert('Đã cập nhật trạng thái đặt phòng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Xóa đơn đặt phòng này?')) return
    try {
      await deleteBooking(id)
      await refresh()
      showAlert('Đã xóa đơn đặt phòng.')
    } catch (error) {
      setErrorMessage(getApiError(error))
    }
  }

  return (
    <section>
      <ActionAlert alert={alert} />
      <p className="eyebrow">STAFF · ĐẶT PHÒNG</p>
      <h1>Quản lý đơn đặt phòng</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="table-scroll content-card">
        <table><thead><tr><th>Mã đơn</th><th>Mã khách hàng</th><th>Ngày tạo</th><th>Phòng/lưu trú</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>{bookings.map((booking) => (
            <tr key={booking.bookingReservationId}>
              <td>{booking.bookingReservationId}</td><td>{booking.customerId}</td><td>{booking.bookingDate}</td>
              <td>{booking.details.map((detail) => `${detail.roomNumber} (${detail.startDate} – ${detail.endDate})`).join(', ')}</td>
              <td>{Number(booking.totalPrice).toLocaleString('vi-VN')} đ</td>
              <td><select value={booking.bookingStatus} onChange={(event) => changeStatus(booking.bookingReservationId, event.target.value)}><option value={0}>Đã hủy</option><option value={1}>Đang hoạt động</option><option value={2}>Hoàn tất</option><option value={3}>Khác</option></select></td>
              <td><button className="danger-button" onClick={() => remove(booking.bookingReservationId)}>Xóa</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  )
}
