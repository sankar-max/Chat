import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'
import { getChat, getUsers, sendMessage } from '@/app/actions'
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 5050
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    socket.on('get:users', async () => {
      const { data } = await getUsers()
      io.emit('receive:users', data)
    })

    socket.emit('get:messages', async (chatterId:string) => {
      const { data } = await getChat(chatterId)
      return data
    })

    socket.on('add:message', async (message) => {
      const { data } = await sendMessage(message)
      io.emit('get:messages', data)
    })
  })

  io.on('disconnect', (socket) => {})

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.dir(`> Ready on http://${hostname}:${port}`)
    })
})
