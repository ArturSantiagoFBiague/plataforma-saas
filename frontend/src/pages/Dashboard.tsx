import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUserId(data.userId))
      .catch(() => navigate('/login'))
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Painel</h2>
      <p>Usuário logado: {userId}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2">Sair</button>
    </div>
  )
}

export default Dashboard