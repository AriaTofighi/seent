import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import jwtDecode from "jwt-decode";
import { setDefaultHeader } from "../services/api/AxiosInstance";

type Props = {
  children: ReactNode;
};

const TOKEN_KEY = "token_seent";

const UserContext = createContext({
  user: undefined,
  setUser: (t: string) => {},
  loading: true,
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUserState] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      setUserState(jwtDecode(t));
      setDefaultHeader(t);
    }

    setLoading(false);
  }, []);

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
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
