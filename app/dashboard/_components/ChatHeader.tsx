import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { getUserById, user } from '@/app/actions'

export const ChatHeader = ({ user }: { user: user }) => {
  return (
    <header className='flex h-16 border w-full justify-between items-center  border-b-primary/10 '>
      <div className='flex items-center gap-2'>
        {user?.profileImage ? (
          <Image
            src={user?.profileImage || ''}
            alt='user'
            width={32}
            height={32}
            className='rounded-full size-10'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-gray-300'></div>
        )}
        <div className='flex flex-col'>
          <h1 className='text-lg font-bold'>{user?.name}</h1>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='cursor-pointer bg-none rounded-full hover:bg-foreground/10'
        >
          <MoreHorizontal />
        </Button>
      </div>
    </header>
  )
}
