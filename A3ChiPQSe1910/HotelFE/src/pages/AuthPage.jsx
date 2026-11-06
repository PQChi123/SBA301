/*
* Phạm Quốc Chí Ce180289
*/
import { useState } from 'react'
import { getApiError, login, register } from '../service/hotelServiceAPI.js'

export default function AuthPage({ initialMode = 'login', onAuthenticated }) {
  const [mode, setMode] = useState(initialMode)
  const [form, setForm] = useState({
    customerFullName: '',
    emailAddress: '',
    email: '',
    telephone: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setLoading(true)
    try {
      const result =
        mode === 'login'
          ? await login({ email: form.email, password: form.password })
          : await register({
              customerFullName: form.customerFullName,
              emailAddress: form.emailAddress,
              telephone: form.telephone,
              password: form.password,
            })
      onAuthenticated(result)
    } catch (error) {
      setErrorMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <p className="eyebrow">{mode === 'login' ? 'CHÀO MỪNG TRỞ LẠI' : 'TẠO TÀI KHOẢN'}</p>
      <h1>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký khách hàng'}</h1>
      <form className="form-grid" onSubmit={submit}>
        {mode === 'register' && (
          <>
            <label>
              Họ và tên
              <input
                name="customerFullName"
                value={form.customerFullName}
                onChange={update}
                maxLength={100}
                required
              />
            </label>
            <label>
              Số điện thoại
              <input name="telephone" value={form.telephone} onChange={update} maxLength={20} />
            </label>
            <label>
              Email
              <input
                name="emailAddress"
                type="email"
                value={form.emailAddress}
                onChange={update}
                required
              />
            </label>
          </>
        )}
        {mode === 'login' && (
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={update} required />
          </label>
        )}
        <label>
          Mật khẩu
          <input
            name="password"
            type="password"
            minLength={8}
            maxLength={72}
            value={form.password}
            onChange={update}
            required
          />
        </label>
        {errorMessage && <p className="error form-wide">{errorMessage}</p>}
        <button className="primary-button form-wide" disabled={loading}>
          {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </button>
      </form>
      <button
        className="link-button"
        type="button"
        onClick={() => {
          setErrorMessage('')
          setMode(mode === 'login' ? 'register' : 'login')
        }}
      >
        {mode === 'login' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </section>
  )
}
