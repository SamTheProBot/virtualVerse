import { useRef, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current?.on('connect', () => {
      console.log("socket connected");
      setSocket(socketRef.current);
    })
    return () => {
      socketRef.current?.disconnect()
    }
  }, []);

  return socket;

}
