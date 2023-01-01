import { useAppSocket } from "./../contexts/SocketContext";
import { useEffect } from "react";

const useSocketEvent = (
  eventName: string,
  callback: () => void,
  ...deps: any
) => {
  const { socket } = useAppSocket();

  useEffect(() => {
    socket?.on(eventName, callback);
    return () => {
      socket?.off(eventName, callback);
    };
  }, [eventName, callback, ...deps]);
};

export default useSocketEvent;
