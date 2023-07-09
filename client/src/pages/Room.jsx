import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider';

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setmyStream] = useState(null);
    const handleUserJoined = useCallback(({email, id})=>{
        console.log(`Email: ${email} joined the room`)
        setSocketId(id)

    },[])
    const handleCallUser = useCallback( async() => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setmyStream(stream);
    }, [])
    useEffect(()=>{
        socket.on("user:joined", handleUserJoined )
        return ()=>{
            socket.off("user:joined", handleUserJoined)
        }
    }, [socket, handleUserJoined])
  return (
    <div>
        <h1>Room Page</h1>
        <h4>
            {
                remoteSocketId ? 'Connected' : "No one in room"
            }
        </h4>
        {remoteSocketId && (<button onClick={handleCallUser}>Call</button>)}
    </div>

  )
}

export default Room;