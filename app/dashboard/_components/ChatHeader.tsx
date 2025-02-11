import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const ChatHeader = () => {
 return ( 
  <header className='flex h-16 border w-full justify-between items-center  border-b-primary/10 '>
    <div className='flex items-center gap-2'>
      <div className='w-10 h-10 rounded-full bg-gray-300'></div>
      <div className='flex flex-col'>
        <h1 className='text-lg font-bold'>Sankar</h1>
      </div>
    </div>
    <div className='flex items-center gap-2'>
      <Button variant='ghost' size='icon' className='cursor-pointer bg-none rounded-full hover:bg-foreground/10'>
       <MoreHorizontal/>
      </Button>
    </div>
  </header>
 );
}