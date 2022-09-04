import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import jwtDecode from "jwt-decode";
import { setDefaultHeader } from "../services/api/AxiosInstance";
import { UserEntity } from "../../backend/src/types";
import useSWR from "swr";

type Props = {
  children: ReactNode;
};

const TOKEN_KEY = "token_seent";

type DefaultContextType = {
  user: UserEntity | undefined;
  setUser: (t: string) => void;
  loading: boolean;
  logout: () => void;
  mutate: () => void;
};

const defaultContext: DefaultContextType = {
  user: undefined,
  setUser: () => {},
  loading: true,
  logout: () => {},
  mutate: () => {},
};

const UserContext = createContext<typeof defaultContext>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [tokenData, setTokenData] = useState<UserEntity>();
  const [user, setUserState] = useState<UserEntity>();
  const [loading, setLoading] = useState(true);
  const {
    data: userRes,
    error,
    mutate,
  } = useSWR<UserEntity>(tokenData ? `users/${tokenData.userId}` : null);

  useEffect(() => {
    let t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      setTokenData(jwtDecode(t));
      setDefaultHeader(t);
    } else {
      fakeLoadToCompletion();
    }
  }, []);

  useEffect(() => {
    if (!userRes) return;
    setUserState(userRes);
    setLoading(false);
    // fakeLoadToCompletion();
  }, [userRes]);

  const fakeLoadToCompletion = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const setUser = (t: string) => {
    if (!t) return;

    try {
      localStorage.setItem(TOKEN_KEY, t);
      setDefaultHeader(t);
      setUserState(jwtDecode(t));
    } catch {
      // no user
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, mutate }}>
      {children}
    </UserContext.Provider>
  );
};
