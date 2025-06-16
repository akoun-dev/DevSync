import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  const user = JSON.parse(localStorage.getItem('devsync_user') || 'null')

  return (
    <nav className="bg-gray-100 p-2 mb-4 space-x-4">
      <Link className="underline" to="/projects">Projets</Link>
      <Link className="underline" to="/teams">Équipes</Link>
      <Link className="underline" to="/calendar">Calendrier</Link>
      <Link className="underline" to="/notifications">Notifications</Link>
      {user?.role === 'manager' && (
        <Link className="underline" to="/dashboard">Dashboard</Link>
      )}
    </nav>
  )
}

export default NavBar
