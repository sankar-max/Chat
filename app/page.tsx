'use client'

import { use, useEffect, useState } from 'react'
import { socket } from './socket'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')

  const [onlineUsers, setOnlineUsers] = useState<
    { id: string; name: string }[]
  >([])

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  useEffect(() => {
    socket.emit('user:online', { name: 'sankar', id: '123' })

    socket.on('get:online', (user) => {
      // console.log('user', user)
      setOnlineUsers(user)
    })
    return () => {
      socket.off('get:online')
      socket.off('user:online')
    }
  }, [])
  // console.log('client', onlineUsers)
  return (
    <div>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>
      <p>Online Users: {onlineUsers.length}</p>

      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user.id}</li>
        ))}
      </ul>
    </div>
  )
}
