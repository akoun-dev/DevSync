import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="bg-gray-100 p-2 mb-4 space-x-4">
      <Link className="underline" to="/projects">Projets</Link>
      <Link className="underline" to="/teams">Équipes</Link>
    </nav>
  )
}

export default NavBar
