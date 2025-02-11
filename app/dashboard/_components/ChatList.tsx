import { cn } from "@/lib/utils"

export const ChatList = ({ userData }: { userData: (typeof friends)[number] }) => {
  return (
    <div
      className={cn(
        'flex items-center cursor-pointer hover:bg-primary/10 rounded-[10px] p-2 gap-2',
        userData.id === 1 && 'bg-primary/10'
      )}
    >
      <div className='w-10 h-10 rounded-full overflow-hidden'>
        {/* <Image src={image} alt={name} width={40} height={40} /> */}

        <div className='size-full rounded-full bg-gray-300'></div>
      </div>
      <div className='flex-1 '>
        <div className='text-sm font-medium capitalize'>{userData.name}</div>
        <div className='text-sm text-gray-500'>{userData.lastMessage}</div>
      </div>
      <div className='text-sm text-gray-500'>{userData.time}</div>
    </div>
  )
}

export const friends = [
  {
    id: 1,
    userId: 1,
    friendId: 2,
    name: 'Sankar',
    lastMessage: 'Hello, how are you?',
    image: '',
    time: '12:00',
  },
  {
    id: 2,
    userId: 1,
    friendId: 1,
    name: 'Vijay',
    lastMessage: 'Hello, how are you?',
    image: '',
    time: '01:00',
  },
]


export const chatMessages = [
  {
    id: 1,
    name: 'Sankar',
    message: 'Hello, how are you? 🤞',
    senderId: 1,
    receiverId: 2,
    createdAt: '2024-01-01 12:00:00',
    updatedAt: '2024-01-01 12:00:00',
    content: 'Hello, how are you?',
  },
  {
    id: 2,
    name: 'Vijay',
    message: 'im good 👍, how about you?',
    senderId: 2,
    receiverId: 1,
    createdAt: '2024-01-01 12:00:00',
    updatedAt: '2024-01-01 12:00:00',
  },
  {
    id: 3,
    name: 'Sankar',
    message: 'im good 👍, how about you?',
    senderId: 1,
    receiverId: 2,
    createdAt: '2024-01-01 12:00:00',
    updatedAt: '2024-01-01 12:00:00',
  },
  {
    id: 4,
    name: 'Vijay',
    message: 'im good 👍, how about you?',
    senderId: 2,
    receiverId: 1,
  },
]

