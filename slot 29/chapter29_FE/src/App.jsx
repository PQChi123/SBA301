import { useState } from 'react'
import StudentList from './components/StudentList'
import BookList from './components/BookList'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('students')

  return (
    <div className="container">
      <h1>Library Management System</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button 
          className={`tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
      </div>

      {activeTab === 'students' && <StudentList />}
      {activeTab === 'books' && <BookList />}
    </div>
  )
}

export default App
