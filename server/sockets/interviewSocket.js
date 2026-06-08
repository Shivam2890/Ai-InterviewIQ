function interviewSocket(socket) {
    socket.on("first-message", (data) => {
        console.log('first message received', data)

        socket.emit('confirm-interview', { message: 'first message recieved good to start interview' })
    })

    socket.on('start-interview', (data) => {
        console.log(data, 'start-interview')
        socket.emit('start-interview', { message: 'interview question no 1' })
    })
}