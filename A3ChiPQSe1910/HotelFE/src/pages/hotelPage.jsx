/*
* Phạm Quốc Chí Ce180289
*/
import { useEffect, useState } from 'react'
import HotelTable from '../components/hotelTable.jsx'
import { getAllList, getApiError } from '../service/hotelServiceAPI.js'

export default function HotelPage({ user, onLogin, onBook }) {
  const [rooms, setRooms] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let active = true
    getAllList(query)
      .then((data) => {
        if (active) setRooms(data)
      })
      .catch((error) => {
        if (active) setErrorMessage(`Không thể tải danh sách phòng: ${getApiError(error)}`)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [query])

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">KHÁCH SẠN</p>
          <h1>Danh sách phòng</h1>
          <p>Chọn phòng phù hợp và đặt trực tuyến.</p>
        </div>
      </div>
      <label className="search-field">
        Tìm số phòng hoặc mô tả
        <input
          value={query}
          onChange={(event) => {
            setLoading(true)
            setErrorMessage('')
            setQuery(event.target.value)
          }}
        />
      </label>
      {!user && <p className="notice">Đăng nhập hoặc đăng ký để đặt phòng trực tuyến.</p>}
      {loading ? <p>Đang tải danh sách phòng...</p> : null}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!loading && !errorMessage && (
        <HotelTable
          listHotel={rooms}
          canBook={Boolean(user?.role === 'CUSTOMER')}
          onBook={user?.role === 'CUSTOMER' ? onBook : onLogin}
        />
      )}
    </section>
  )
}
