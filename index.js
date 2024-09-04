const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'], 
        credentials: true 
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
