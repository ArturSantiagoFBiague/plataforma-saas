import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('http://localhost:3000//api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          setUserName(data.name)
        } else {
          throw new Error('Usuário inválido')
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Painel</h2>
      <p>Usuário logado: {userName}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2">Sair</button>
    </div>
  )
}

export default Dashboard
