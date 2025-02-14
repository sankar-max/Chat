import { ChatInput } from "./ChatInput"
import { ChatSection } from "./ChatSection"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { chats } from "@/app/actions"
import { ChatHeader } from "./ChatHeader"
export const Chat = ({data}:{data: chats}) => {
 
  return (
    <div className='flex flex-col flex-1 overflow-hidden  bg-gray-100/5 rounded-2xl p-2'>

      <LogoutLink>
        out
      </LogoutLink>
     <ChatHeader/>
     <ChatSection data={data}/>

     <ChatInput/>
    </div>
  )
}
