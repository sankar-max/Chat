import { ChatList, friends } from './ChatList'

export const ChatsList = () => {
  return (
    <div className='hidden md:flex flex-col gap-2 bg-popover rounded-2xl overflow-y-auto w-[300px] h-full shadow-2xl  p-4'>
      <div className='flex flex-col gap-2'>
          {friends.map((item) => (
          <ChatList
            key={item.id}
            userData={item}
          />
        ))}
      </div>
    </div>
  )
}
