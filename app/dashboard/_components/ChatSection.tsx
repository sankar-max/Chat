'use client'

import { cn } from '@/lib/utils'
import { chats } from '@/app/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { socket } from '@/app/socket'
import { useEffect, useState } from 'react'

export const ChatSection = () => {
  const { isAuthenticated, getUser } = useKindeBrowserClient()
  const user = getUser()
  const [messages, setMessages] = useState<chats>([])

  useEffect(() => {
    socket.emit('get:messages', user.id)

    socket.on('add:message', (messages) => {
      setMessages((prev) => [...prev!, ...messages])
    })
    return () => {
      socket.off('add:message')
    }
  }, [user.id])

  if (!isAuthenticated) return null
  return (
    <div className='flex flex-1 p-1 py-3 flex-col scroll-p-1 scroll-m-1 overflow-auto'>
      <div className='flex flex-col gap-2'>
        {messages?.map((message) => (
          <div
            className={cn(
              'flex   items-center gap-0.5',
              message.senderId === user.id ? 'justify-end' : 'justify-start'
            )}
            key={message.id}
          >
            <div className='bg-primary/10 max-w-[50%] rounded-2xl py-2 px-4'>
              <p className=' text-foreground/90'>{message.content}</p>
              <p className='text-sm text-foreground/40 text-right'>
                {message.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
