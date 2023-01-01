import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";

type SocketWithUsers = {
  socket: Socket | null;
  onlineUsers: string[];
};

const SocketContext = createContext<SocketWithUsers>({
  socket: null,
  onlineUsers: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
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
    newSocket?.on("userConnected", (data) => {
      setOnlineUsers(data);
    });
    newSocket?.on("userDisconnected", (data) => {
      setOnlineUsers(data);
    });
    newSocket?.on("disconnect", () => {
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
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useAppSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
