'use server'

import { db } from '@/db'
import { friends, messages, users } from '@/db/schema'
import { and, eq, or } from 'drizzle-orm'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
export type chats = Awaited<ReturnType<typeof getChat>>['data']
export type user = Awaited<ReturnType<typeof getUserById>>['data']
export const addUser = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser()

  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email!))

  if (existingUser.length > 0) {
    return { data: existingUser, message: 'User already exists' }
  } else {
    const newUser = await db
      .insert(users)
      .values({
        id: user.id!,
        name: user.username || '',
        email: user.email!,
        password: '123456',
        profileImage: user.picture,
      })
      .returning()

    return { data: newUser, message: 'User added successfully' }
  }
}

export const getUsers = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }
  const user = await db.select().from(users)

  return { data: user, message: 'User fetched successfully' }
}
export const getUserById = async (id: string) => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }
  const user = await db.select().from(users).where(eq(users.id, id))
  if (user.length === 0) {
    return { message: 'User not found', data: null }
  }
  return { data: user[0], message: 'User fetched successfully' }
}

export const addFriend = async (friendId: number) => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }

  const friend = await db.insert(friends).values({
    userId: '6',
    friendId: '7',
  })

  return { data: friend, message: 'Friend added successfully' }
}

export const getChat = async (chatId: string) => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }
  const user = await getUser()

  const chat = await db
    .select()
    .from(messages)
    .where(
      or(
        and(eq(messages.receiverId, chatId), eq(messages.senderId, user.id!)),
        and(eq(messages.receiverId, user.id!), eq(messages.senderId, chatId))
      )
    )
  console.log('chat', chat)
  return { data: chat, message: 'Chat fetched successfully' }
}

export const sendMessage = async (msgData: {
  message: string
  senderId: string
  receiverId: string
}) => {
  const { isAuthenticated, getUser } = getKindeServerSession()

  if (!isAuthenticated) {
    return { message: 'Unauthorized', data: null }
  }
  if (!msgData.message || !msgData.senderId || !msgData.receiverId) {
    return { message: 'Invalid message data', data: null }
  }

  const newMessage = await db.insert(messages).values({
    content: msgData.message,
    senderId: msgData.senderId,
    receiverId: msgData.receiverId,
  })

  return { data: newMessage, message: 'Message sent successfully' }
}
