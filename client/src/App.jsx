import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/AddTask'
import EditTask from './pages/EditTask'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Register/>} />
            <Route path="/signin" element={<Login/>} />
            <Route path="/add-task" element={<Tasks/>} />
            <Route path="/edit-task/:taskId" element={<EditTask />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
