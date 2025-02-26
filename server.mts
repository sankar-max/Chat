import { createServer } from "node:http"
import next from "next"
import { Server, Socket } from "socket.io"
interface MessageData {
  message: string
  senderId: string
  receiverId: string
}

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 5050

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)

  io.on("connection", (socket: Socket) => {
    socket.on("get:users", async () => {
      const response = await fetch('http://localhost:5050/api/socket')
      const { data } = await response.json()
      io.emit("receive:users", data)
    })

    socket.on("add:message", async (message: MessageData) => {
      const response = await fetch('http://localhost:5050/api/socket', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { data } = await response.json()
      io.emit("get:messages", data)
    })
  })

  io.on("disconnect", (socket: Socket) => {})

  httpServer
    .once("error", (err: Error) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.dir(`> Ready on http://${hostname}:${port}`)
    })
})
