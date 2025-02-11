import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

export const ChatInput = () => {
  return (
    <div className='flex bg-foreground/10 rounded-2xl px-2 items-center gap-2'>
      <Textarea placeholder='Type a message...' className='bg-transparent placeholder:text-foreground/40 !text-lg  border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none appearance-none resize-none' />
      <Button
        size='icon'
        className='cursor-pointer bg-none rounded-full '
      >
        <Send />
      </Button>
    </div>
  )
}
