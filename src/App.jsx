import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Teams from './pages/Teams'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Notifications from './pages/Notifications'
import NavBar from './components/NavBar'
import { NotificationProvider } from './contexts/NotificationContext'

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('devsync_user') || 'null')
  if (!user) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <NotificationProvider>
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
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <div>
                  <NavBar />
                  <Dashboard />
                </div>
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <div>
                  <NavBar />
                  <Calendar />
                </div>
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <div>
                  <NavBar />
                  <Notifications />
                </div>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
