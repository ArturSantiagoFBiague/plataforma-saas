import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      } else {
        alert(data.message || 'Erro ao registrar')
      }
    } catch (err) {
      console.error(err)
      alert('Erro de conexão com o servidor')
    }
  }

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar</h2>
      <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="block w-full p-2 mb-2 border" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full p-2 mb-2 border" />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="block w-full p-2 mb-2 border" />
      <button className="bg-green-500 text-white px-4 py-2">Registrar</button>
      <p className="mt-2">
        Já tem conta? <a href="/login" className="text-blue-500 underline">Entrar</a>
      </p>
    </form>
  )
}

export default Register
