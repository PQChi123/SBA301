import { useState, useEffect } from 'react'
import axios from 'axios'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStudent, setNewStudent] = useState({
    email: '',
    firstName: '',
    lastName: '',
    gpa: ''
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/students')
      setStudents(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch students. Make sure the backend is running.')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/students', {
        ...newStudent,
        gpa: parseFloat(newStudent.gpa)
      })
      setNewStudent({ email: '', firstName: '', lastName: '', gpa: '' })
      setShowAddForm(false)
      fetchStudents()
    } catch (err) {
      setError('Failed to add student')
      console.error('Error adding student:', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading students...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div>
      <h2>Students List ({students.length})</h2>
      <button 
        className="tab"
        onClick={() => setShowAddForm(!showAddForm)}
        style={{ marginBottom: '20px' }}
      >
        {showAddForm ? 'Cancel' : '+ Add Student'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddStudent} style={{ marginBottom: '20px', padding: '20px', background: 'white', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              required
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
            <input
              type="text"
              required
              value={newStudent.firstName}
              onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
            <input
              type="text"
              required
              value={newStudent.lastName}
              onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>GPA:</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="4"
              required
              value={newStudent.gpa}
              onChange={(e) => setNewStudent({...newStudent, gpa: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <button type="submit" className="tab active">Add Student</button>
        </form>
      )}
      {students.length === 0 ? (
        <div className="loading">No students found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.email}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
