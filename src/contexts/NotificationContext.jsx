import React, { createContext, useContext, useEffect, useState } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('devsync_notifications') || '[]')
    setNotifications(saved)
  }, [])

  const save = (list) => {
    setNotifications(list)
    localStorage.setItem('devsync_notifications', JSON.stringify(list))
  }

  const addNotification = (text) => {
    const newNotif = { id: Date.now(), text }
    const list = [newNotif, ...notifications]
    save(list)
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
