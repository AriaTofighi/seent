import { useAppSocket } from "./../contexts/SocketContext";
import { useEffect } from "react";

const useSocketEvent = (eventName: string, callback: () => void) => {
  const { socket } = useAppSocket();

  useEffect(() => {
    socket?.on(eventName, callback);
    return () => {
      socket?.off(eventName, callback);
    };
  }, [eventName, callback]);
};

export default useSocketEvent;
