import { useAppSocket } from "./../contexts/SocketContext";
import { useEffect } from "react";

type EventCallback = (...args: any[]) => void;

const useSocketEvent = (eventName: string, callback: EventCallback) => {
  const { socket } = useAppSocket();

  useEffect(() => {
    if (!socket) return;

    const eventListener = (...args: any[]) => {
      callback(...args);
    };

    socket.on(eventName, eventListener);

    return () => {
      socket.off(eventName, eventListener);
    };
  }, [socket, eventName, callback]);
};

export default useSocketEvent;
