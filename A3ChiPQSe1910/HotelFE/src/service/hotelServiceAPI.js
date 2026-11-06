/*
* Phạm Quốc Chí Ce180289
*/
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8080/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hotelToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const dataOf = (request) => request.then((response) => response.data)

export const getAllList = (q = '') =>
  dataOf(api.get('/rooms', { params: q ? { q } : {} }))
export const getRoomById = (id) => dataOf(api.get(`/rooms/${id}`))
export const getRoomTypes = () => dataOf(api.get('/room-types'))
export const login = (credentials) => dataOf(api.post('/auth/login', credentials))
export const register = (form) => dataOf(api.post('/auth/register', form))
export const getProfile = () => dataOf(api.get('/customers/me'))
export const updateProfile = (form) => dataOf(api.put('/customers/me', form))
export const getMyBookings = () => dataOf(api.get('/bookings/mine'))
export const createBooking = (form) => dataOf(api.post('/bookings', form))
export const cancelBooking = (id) => dataOf(api.post(`/bookings/${id}/cancel`))
export const getCustomers = (q = '') =>
  dataOf(api.get('/customers', { params: q ? { q } : {} }))
export const createCustomer = (form) => dataOf(api.post('/customers', form))
export const updateCustomer = (id, form) => dataOf(api.put(`/customers/${id}`, form))
export const deleteCustomer = (id) => api.delete(`/customers/${id}`)
export const createRoom = (form) => dataOf(api.post('/rooms', form))
export const updateRoom = (id, form) => dataOf(api.put(`/rooms/${id}`, form))
export const deleteRoom = (id) => api.delete(`/rooms/${id}`)
export const getBookings = () => dataOf(api.get('/bookings'))
export const updateBookingStatus = (id, bookingStatus) =>
  dataOf(api.patch(`/bookings/${id}/status`, { bookingStatus }))
export const deleteBooking = (id) => api.delete(`/bookings/${id}`)

export function getApiError(error) {
  return error.response?.data?.message || error.message || 'Đã xảy ra lỗi'
}
