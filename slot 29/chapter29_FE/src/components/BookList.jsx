import { useState, useEffect } from 'react'
import axios from 'axios'

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: ''
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/books')
      setBooks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend is running.')
      console.error('Error fetching books:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/books', newBook)
      setNewBook({ isbn: '', title: '', author: '' })
      setShowAddForm(false)
      fetchBooks()
    } catch (err) {
      setError('Failed to add book')
      console.error('Error adding book:', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading books...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div>
      <h2>Books List ({books.length})</h2>
      <button 
        className="tab"
        onClick={() => setShowAddForm(!showAddForm)}
        style={{ marginBottom: '20px' }}
      >
        {showAddForm ? 'Cancel' : '+ Add Book'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddBook} style={{ marginBottom: '20px', padding: '20px', background: 'white', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>ISBN:</label>
            <input
              type="text"
              required
              value={newBook.isbn}
              onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
            <input
              type="text"
              required
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Author:</label>
            <input
              type="text"
              required
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <button type="submit" className="tab active">Add Book</button>
        </form>
      )}
      {books.length === 0 ? (
        <div className="loading">No books found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
