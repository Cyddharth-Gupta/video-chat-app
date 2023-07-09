import React, { useCallback, useEffect, useState } from 'react'
import {useSocket} from '../context/SocketProvider'
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    // const emailRef = useRef();
    // const roomRef = useRef();  //use these useRef hooks instead of event.target.value for concept building

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', {email, room})
    },[email, room, socket]) 

    const handleJoinRoom = useCallback((data) => {
        const {email, room} = data
       navigate(`/room/${room}`);
    }, [navigate])

    useEffect(()=>{
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off('room:join')
        }
    },[socket, handleJoinRoom])
  return (
    <div>
        <h1>
            Lobby
        </h1>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email ID</label>
            <input type="email" id='email' value={email} onChange={(event)=>{
                setEmail(event.target.value)
            }} />
            <br/>
            <label htmlFor="room">Room Number</label>
            <input type="text" id='room' value={room} onChange={(event)=>{
                setRoom(event.target.value)
            }} />
            <br/>
            <button type='submit'>Join</button>
        </form>
    </div>
  )
}

export default Lobby