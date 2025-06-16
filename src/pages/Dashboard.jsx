import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale)

function Dashboard() {
  const [data, setData] = useState({ todo: 0, inprogress: 0, done: 0 })

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('devsync_projects') || '[]')
    const counts = { todo: 0, inprogress: 0, done: 0 }
    projects.forEach(p => {
      const tasks = JSON.parse(localStorage.getItem(`tasks_${p.id}`) || '[]')
      tasks.forEach(t => {
        const s = t.status || 'todo'
        counts[s] = (counts[s] || 0) + 1
      })
    })
    setData(counts)
  }, [])

  const chartData = {
    labels: ['À faire', 'En cours', 'Terminé'],
    datasets: [
      {
        label: 'Tâches',
        data: [data.todo, data.inprogress, data.done],
        backgroundColor: ['#f87171', '#60a5fa', '#34d399'],
      },
    ],
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <Link className="text-blue-500" to="/projects">Projets</Link>
      </div>
      <Bar data={chartData} />
    </div>
  )
}

export default Dashboard
