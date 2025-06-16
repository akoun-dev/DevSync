import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

function Teams() {
  const [teams, setTeams] = useState([])
  const [name, setName] = useState('')
  const [member, setMember] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('devsync_teams') || '[]')
    setTeams(saved)
  }, [])

  const save = (list) => {
    setTeams(list)
    localStorage.setItem('devsync_teams', JSON.stringify(list))
  }

  const addTeam = (e) => {
    e.preventDefault()
    const newTeam = { id: uuid(), name, members: [] }
    const list = [...teams, newTeam]
    save(list)
    setName('')
  }

  const addMember = (teamId) => {
    const list = teams.map(t =>
      t.id === teamId ? { ...t, members: [...t.members, member] } : t
    )
    save(list)
    setMember('')
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Équipes</h1>
        <Link className="text-blue-500" to="/projects">Projets</Link>
      </div>
      <form onSubmit={addTeam} className="space-x-2">
        <input
          className="border px-2 py-1"
          placeholder="Nom de l'équipe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded" type="submit">
          Ajouter équipe
        </button>
      </form>
      <div className="space-y-4">
        {teams.map(team => (
          <div key={team.id} className="border p-2">
            <h2 className="font-semibold mb-2">{team.name}</h2>
            <ul className="list-disc ml-4 mb-2">
              {team.members.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <input
                className="border px-2 py-1 flex-1"
                placeholder="Nom du membre"
                value={member}
                onChange={(e) => setMember(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => addMember(team.id)}
                type="button"
              >
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams
