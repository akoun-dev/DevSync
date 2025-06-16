import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNotifications } from '../contexts/NotificationContext'
import { v4 as uuid } from 'uuid'

const statuses = ['todo', 'inprogress', 'done']

function ProjectDetail() {
  const { id } = useParams()
  const { addNotification } = useNotifications()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('devsync_projects') || '[]')
    const current = projects.find(p => p.id === id)
    setProject(current)
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${id}`) || '[]')
    setTasks(savedTasks)
  }, [id])

  const save = (list) => {
    setTasks(list)
    localStorage.setItem(`tasks_${id}`, JSON.stringify(list))
  }

  const addTask = (e) => {
    e.preventDefault()
    const newTask = { id: uuid(), title, status: 'todo', dueDate, comments: [] }
    const list = [...tasks, newTask]
    save(list)
    setTitle('')
    setDueDate('')
  }

  const moveTask = (taskId, direction) => {
    const list = tasks.map(t => {
      if (t.id === taskId) {
        const idx = statuses.indexOf(t.status)
        const next = statuses[idx + direction]
        return next ? { ...t, status: next } : t
      }
      return t
    })
    save(list)
  }

  if (!project) return <div className="p-4">Projet introuvable</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Link className="text-blue-500" to="/projects">Retour</Link>
      </div>
      <form onSubmit={addTask} className="space-x-2">
        <input
          className="border px-2 py-1"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border px-2 py-1"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded" type="submit">
          Ajouter
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="border p-2 space-y-2">
            <h2 className="font-semibold capitalize text-center mb-2">
              {status}
            </h2>
            {tasks.filter(t => t.status === status).map(t => (
              <div key={t.id} className="border p-2 space-y-2">
                <div className="flex justify-between">
                  <span>{t.title} {t.dueDate && <em>({t.dueDate})</em>}</span>
                  <div className="space-x-1">
                    <button
                      className="px-1 text-sm"
                      onClick={() => moveTask(t.id, -1)}
                      disabled={t.status === 'todo'}
                    >
                      ◀
                    </button>
                    <button
                      className="px-1 text-sm"
                      onClick={() => moveTask(t.id, 1)}
                      disabled={t.status === 'done'}
                    >
                      ▶
                    </button>
                  </div>
                </div>
                <ul className="ml-4 list-disc">
                  {t.comments?.map((c) => (
                    <li key={c.id}>{c.text}</li>
                  ))}
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const list = tasks.map(task =>
                      task.id === t.id
                        ? {
                            ...task,
                            comments: [...(task.comments || []), { id: uuid(), text: commentText }],
                          }
                        : task
                    )
                    save(list)
                    addNotification(`Commentaire ajouté sur ${t.title}`)
                    setCommentText('')
                  }}
                  className="flex space-x-2"
                >
                  <input
                    className="border px-2 py-1 flex-1"
                    placeholder="Commentaire"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button className="text-sm" type="submit">
                    Ajouter
                  </button>
                </form>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectDetail
