import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import interviewRouter from './routes/interview.js';
import http from 'http';
import { Server } from 'socket.io';
import interviewSocket from './sockets/interviewSocket.js';
import jwt from 'jsonwebtoken';
import { ioMiddlewareToken } from './middleware/authMiddleware.js';

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('DB connected')
}).catch((err) => {
    console.log(err.message)
})

// app.post('/auth/signup', (req, res) => {

// })

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/interview', interviewRouter)

//create a new for socket.io
const server = http.createServer(app)
// Create instance for socket io by providing server info
const io = new Server(server, {
    cors: "*",
    methods: ["GET", "POST"]
})

//create a io middleware to get token , bcz we don't have access of req,res
io.use(ioMiddlewareToken)

//once connection io established execute callback

io.on('connection', (socket) => {
    console.log(socket.id, 'socket id')

    interviewSocket(socket)


    console.log('socket connection establiahsed')
})

const port = process.env.PORT
// change app (express default server) to http created server with socket.io
server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})