import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Teams from './pages/Teams'
import NavBar from './components/NavBar'

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('devsync_user') || 'null')
  if (!user) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/projects"
          element={
            <RequireAuth>
              <div>
                <NavBar />
                <Projects />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <RequireAuth>
              <div>
                <NavBar />
                <ProjectDetail />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/teams"
          element={
            <RequireAuth>
              <div>
                <NavBar />
                <Teams />
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
