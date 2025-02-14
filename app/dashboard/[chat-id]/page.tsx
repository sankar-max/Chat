import { getChat, getUserById } from '@/app/actions'
import { Chat } from '../_components/Chat'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ChatHeader } from '../_components/ChatHeader'
import { ChatSection } from '../_components/ChatSection'
import { ChatInput } from '../_components/ChatInput'

export default async function ChatPage({
  params,
}: {
  params: Promise<{ ['chat-id']: string }>
}) {

  const chatId = (await params)?.['chat-id']

  const { data } = await getChat(chatId)

  const { data: user } = await getUserById(chatId)
  return (
    <div className='flex flex-col flex-1 overflow-hidden  bg-gray-100/5 rounded-2xl p-2'>
      <LogoutLink>out</LogoutLink>
      <ChatHeader user={user} />
      <ChatSection />

      <ChatInput  />
    </div>
  )
}
