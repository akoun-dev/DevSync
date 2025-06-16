import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [role, setRole] = useState('developer')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { name, role }
    localStorage.setItem('devsync_user', JSON.stringify(user))
    navigate('/projects')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border px-2 py-1 w-full"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="border px-2 py-1 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="developer">Développeur</option>
          <option value="manager">Manager</option>
        </select>
        <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
          Entrer
        </button>
      </form>
    </div>
  )
}

export default Login
