import { useState } from "react";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (url: string, data?: any) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${url}`, {
      query: data,
    });
    socket.on("connect", () => {
      console.log("Connected to socket");
      setSocket(socket);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
      setSocket(undefined);
    });

    const cleanup = () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
    return cleanup;
  }, []);

  return socket;
};

export default useSocket;
