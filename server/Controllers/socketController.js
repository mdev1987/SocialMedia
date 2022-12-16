let activeUsers = [];
export default io => {
    io.on('connection', socket => {
        socket.on('new-user-add', ({ userId }) => {
            if (!activeUsers.some(user => user.userId === userId)) {
                activeUsers.push({
                    userId,
                    socketId: socket.id
                })
            }
            io.emit('get-users', activeUsers)
        })

        socket.on('send-message', (messageData) => {
            const { receiverId } = messageData;
            const socketId = activeUsers.find(user => user.userId === receiverId)?.socketId;
            socketId && socket.to(socketId).emit('receive-message', messageData)
        })

        socket.on('disconnect', () => {            
            activeUsers = activeUsers.filter(user => user.socketId !== socket.id);            
            io.emit('get-users', activeUsers);
        })

    })
}