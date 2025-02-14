'use server'

import { db } from '@/db'
import { friends } from '@/db/schema'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const addFriend = async (friendId: string) => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }

  const user = await getUser()

  const newFriend = await db.insert(friends).values({
    userId: user.id,
    friendId: friendId,
    accepted: false,
    
  })

  return { data: newFriend, message: 'Friend added successfully' }
}
