import express from 'express'
import http from 'http'
import cors from 'cors'

const app = express()
app.use(cors({ origin: '*' }))

const PORT = 5000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`start listening on port ${PORT}`)
})
