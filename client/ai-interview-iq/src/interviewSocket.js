import { io } from 'socket.io-client';

const token = localStorage.getItem("token")

console.log(token,'token sending from frontend')

const socket = io(`http://localhost:4000`, {
    autoConnect: false,
    auth: { token: localStorage.getItem('token') }
})

export default socket
