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
import useSWR from "swr";
import { JwtPayload, UserEntity } from "../types";

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
  tokenData: any;
};

const defaultContext: DefaultContextType = {
  user: undefined,
  setUser: () => {},
  loading: true,
  logout: () => {},
  mutate: () => {},
  tokenData: undefined,
};

const UserContext = createContext<typeof defaultContext>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [tokenData, setTokenData] = useState<any>();
  const [user, setUserState] = useState<UserEntity>();
  const [loading, setLoading] = useState(true);
  const { data: userRes, mutate } = useSWR<UserEntity>(
    tokenData ? `users/${tokenData.userId}` : null
  );

  const fakeLoadToCompletion = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const setUser = (t: string) => {
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setDefaultHeader(t);
    setTokenData({ ...jwtDecode(t), accessToken: t });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  };

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      setTokenData({ ...jwtDecode(t), accessToken: t });
      setDefaultHeader(t);
    } else {
      fakeLoadToCompletion();
    }
  }, []);

  useEffect(() => {
    if (!userRes) return;
    setUserState(userRes);
    setLoading(false);
  }, [userRes]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, logout, mutate, tokenData }}
    >
      {children}
    </UserContext.Provider>
  );
};
