import { useEffect } from "react";

const useScrollToBottom = (ref: React.RefObject<HTMLDivElement>, data: any) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [data]);
};

export default useScrollToBottom;
