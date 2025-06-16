import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('developer')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    })
    if (error) {
      setError(error.message)
      return
    }
    if (data.user) {
      localStorage.setItem(
        'devsync_user',
        JSON.stringify({ id: data.user.id, email: data.user.email, role })
      )
      navigate('/projects')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Inscription</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border px-2 py-1 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border px-2 py-1 w-full"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Créer le compte
        </button>
      </form>
      <p className="text-sm">
        Déjà un compte ? <Link className="underline" to="/">Se connecter</Link>
      </p>
    </div>
  )
}

export default Signup
