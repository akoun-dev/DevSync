import React from 'react'
import { Link } from 'react-router-dom'
import { useNotifications } from '../contexts/NotificationContext'

function Notifications() {
  const { notifications } = useNotifications()

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Link className="text-blue-500" to="/projects">Projets</Link>
      </div>
      <ul className="space-y-2">
        {notifications.map(n => (
          <li key={n.id} className="border p-2">
            {n.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
