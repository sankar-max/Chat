import { ChatsList } from './_components/ChatsList'
import { addUser } from '../actions'
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
   await addUser()
  return (

    <div className='flex flex-1 gap-4 bg-primary/10 p-2 overflow-hidden'>
      <ChatsList />
      {children}
    </div>
  )
}