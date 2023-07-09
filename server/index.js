import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const io = new Server(8001, {
    cors: true,
});
const app = express();

const emailToSocketIDMap = new Map();
const socketIdToEmailMap = new Map();

io.on('connection', (socket) => {
    console.log("Socket connected at ", socket.id)
    socket.on('room:join', data => {
        const {email, room} = data;
        emailToSocketIDMap.set(email, socket.id)
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", {email, id: socket.id})
        socket.join(room)
        io.to(socket.id).emit('room:join', data)
    })
})