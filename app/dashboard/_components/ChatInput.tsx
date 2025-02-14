'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSocket } from '@/providers/socketProvider'
import { Send } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { socket } from '@/app/socket'

export const ChatInput = () => {
  const { isAuthenticated, getUser } = useKindeBrowserClient()
  const user = getUser()
  const socketContext = useSocket()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('')

  const handleSendMessage = async () => {
    if (!socketContext || !isAuthenticated) return
    socket.emit('add:message', {
      message,
      senderId: user?.id,
      receiverId: searchParams.get('id'),
    })
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className='flex bg-foreground/10 rounded-2xl px-2 items-center gap-2'
    >
      <Textarea
        disabled={!socketContext || !isAuthenticated}
        placeholder='Type a message...'
        className='bg-transparent placeholder:text-foreground/40 !text-lg  border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none appearance-none resize-none'
      />
      <Button
        type='submit'
        disabled={!socketContext || !isAuthenticated || message.trim().length === 0}
        size='icon'
        className='cursor-pointer bg-none rounded-full '
      >
        <Send />
      </Button>
    </form>
  )
}
