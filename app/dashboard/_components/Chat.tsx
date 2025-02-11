import { ChatHeader } from "./ChatHeader"
import { ChatInput } from "./ChatInput"
import { ChatSection } from "./ChatSection"

export const Chat = () => {
  return (
    <div className='flex flex-col flex-1 overflow-hidden  bg-gray-100/5 rounded-2xl p-2'>
     <ChatHeader/>
     <ChatSection/>

     <ChatInput/>
    </div>
  )
}
