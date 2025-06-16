import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Calendar() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('devsync_projects') || '[]')
    const all = []
    projects.forEach(p => {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${p.id}`) || '[]')
      tasks.forEach(t => {
        if (t.dueDate) {
          all.push({
            date: t.dueDate,
            project: p.name,
            title: t.title,
            status: t.status,
          })
        }
      })
    })
    all.sort((a, b) => a.date.localeCompare(b.date))
    setItems(all)
  }, [])

  const grouped = items.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || []
    acc[item.date].push(item)
    return acc
  }, {})

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendrier</h1>
        <Link className="text-blue-500" to="/projects">Projets</Link>
      </div>
      {Object.keys(grouped).length === 0 && <p>Aucune tâche planifiée</p>}
      {Object.entries(grouped).map(([date, tasks]) => (
        <div key={date} className="border p-2 space-y-1">
          <h2 className="font-semibold">{date}</h2>
          <ul className="ml-4 list-disc">
            {tasks.map((t, i) => (
              <li key={i}>
                {t.project} : {t.title} ({t.status})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Calendar
