import { ChatsList } from './_components/ChatsList'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-1 gap-4 bg-primary/10 p-2 overflow-hidden'>
      <ChatsList />
      {children}
    </div>
  )
}