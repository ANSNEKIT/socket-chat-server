import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
app.use(cors({ origin: '*' }))

const PORT = 5000
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST' ],
    }
})

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    })
})

server.listen(PORT, () => {
    console.log(`start listening on port ${PORT}`)
})
