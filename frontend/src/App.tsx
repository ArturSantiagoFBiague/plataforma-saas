import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import React from 'react'

function App() {
  const isLogged = !!localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={isLogged ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isLogged ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
