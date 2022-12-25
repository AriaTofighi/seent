import { useState } from "react";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketIo = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/${url}`);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
};

export default useSocket;
