import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('devsync_projects') || '[]')
    setProjects(saved)
  }, [])

  const save = (list) => {
    setProjects(list)
    localStorage.setItem('devsync_projects', JSON.stringify(list))
  }

  const addProject = (e) => {
    e.preventDefault()
    const newProject = { id: uuid(), name }
    const list = [...projects, newProject]
    save(list)
    setName('')
  }

  const removeProject = (id) => {
    const list = projects.filter(p => p.id !== id)
    save(list)
  }

  const logout = async () => {
    const { supabase } = await import('../supabaseClient')
    await supabase.auth.signOut()
    localStorage.removeItem('devsync_user')
    navigate('/')
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projets</h1>
        <button className="text-sm text-red-500" onClick={logout}>Déconnexion</button>
      </div>
      <form onSubmit={addProject} className="space-x-2 mb-4">
        <input
          className="border px-2 py-1"
          placeholder="Nom du projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded" type="submit">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2 flex justify-between">
            <Link to={`/projects/${p.id}`} className="underline">
              {p.name}
            </Link>
            <button className="text-sm text-red-500" onClick={() => removeProject(p.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Projects
