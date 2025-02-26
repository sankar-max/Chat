import { db } from "@/db"
import { messages, users } from "@/db/schema"
import { eq, or, and } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
  const usersList = await db.select().from(users)
  console.log("usersList", usersList)
  return NextResponse.json({ data: usersList })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { message, senderId, receiverId } = body

  const newMessage = await db.insert(messages).values({
    content: message,
    senderId,
    receiverId,
  })

  return NextResponse.json({ data: newMessage })
}
