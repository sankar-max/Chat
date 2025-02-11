import { chatMessages } from "./ChatList"
import { cn } from "@/lib/utils"
export const ChatSection = () => {
  return (
    <div className='flex flex-1 p-1 py-3 flex-col scroll-p-1 scroll-m-1 overflow-auto'>
      <div className='flex flex-col gap-2'>
        {chatMessages.map((message) => (
          <div
            className={cn(
              'flex   items-center gap-0.5',
              message.senderId === 1 ? 'justify-end' : 'justify-start'
            )}
            key={message.id}
          >
            <div className='bg-primary/10 max-w-[50%] rounded-2xl py-2 px-4'>
              <p className=' text-foreground/90'>{message.message}</p>
              <p className='text-sm text-foreground/40 text-right'>{message.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}