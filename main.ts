import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { addUser, findUser, getRoomUsers } from './users'
import router from './router'

const app = express()

app.use(cors({ origin: '*' }))
app.use(router)

const PORT = 5000
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    // Пользователь зашел в комнату
    socket.on('join', ({ nickname, room }) => {
        socket.join(room)

        // Добавляем пользователя в state
        const { user, isExist } = addUser({ nickname, room });

        const userMessage = isExist ? `${user.nickname}, вернулся` : `Добро пожаловать, ${user.nickname}!`

        // Генерируем приветственное сообщение только для пользователя от админа
        socket.emit('message', {
            data: {user: { nickname: "Admin" }, message: userMessage, socketId: socket.id},
        })

        // Генерируем приветственное сообщение для всех в комнате кроме текущего пользователя    
        socket.broadcast.to(room).emit("message", {
            data: { user: { nickname: "Admin" }, message: `${user.nickname} присоединился`, socketId: socket.id },
        });

        // Обновляем список всех пользователей в комнате
        io.to(user.room).emit("room", {
            data: { users: getRoomUsers(user.room) },
        });
    })
    console.log(`user ${socket.id} connected`)

    // Пользователь ввел сообщение в форме
    socket.on("sendMessage", ({ message, params, socketId }) => {
        const user = findUser(params);
    
        if (user) {
          io.to(user.room).emit("message", { data: { user, message, socketId } });
        }
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`)
    })
})

server.listen(PORT, () => {
    console.log(`start listening on port ${PORT}`)
})
