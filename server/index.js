import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const io = new Server(8001);
const app = express();

io.on('connection', (socket) => {
    console.log("Socket connected at ", socket.id)
})

app.listen(8000, () => {
    console.log('Server is running at 8000');
})
io.listen(8001)