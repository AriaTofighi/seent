import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { tokenData } = useUser();

  useEffect(() => {
    if (!tokenData) return;

    const token = tokenData.accessToken;

    const socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    };

    const newSocket = io(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
      socketOptions
    );
    socket?.on("disconnect", () => {
      setTimeout(() => {
        newSocket.connect();
      }, 3000);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [tokenData]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useAppSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
