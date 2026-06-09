function interviewSocket(socket) {
    socket.on("first-message", (data) => {
        console.log('first message received', data)

        socket.emit('confirm-interview', { message: 'first message recieved good to start interview' })
    })
    socket.emit('start-interview', { message: 'interview question no 1' })

    socket.on("disconnect", (data) => {
        console.log("socket connection closed")
    })
}
export default interviewSocket