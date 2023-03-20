import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction,
} from "react";
import jwtDecode from "jwt-decode";
import {
  checkTokenValidity,
  setDefaultHeader,
} from "../services/api/AxiosInstance";
import useSWR from "swr";
import { JwtPayload, UserEntity } from "../types";
import { DEFAULT_API as axios } from "../services/api/AxiosInstance";
import { AxiosRequestConfig } from "axios";
import { PaletteMode, ThemeProvider } from "@mui/material";
import getTheme from "../styles/theme";

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
  paletteMode: PaletteMode;
  setPaletteMode: (mode: PaletteMode) => void;
};

const defaultContext: DefaultContextType = {
  user: undefined,
  setUser: () => {},
  loading: true,
  logout: () => {},
  mutate: () => {},
  tokenData: undefined,
  paletteMode: "dark",
  setPaletteMode: () => {},
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
  const [paletteMode, setPaletteMode] = useState<PaletteMode>("dark");

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

  const handleSetPaletteMode = (mode: PaletteMode) => {
    localStorage.setItem("paletteMode", mode);
    setPaletteMode(mode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("paletteMode") === "dark";
    if (isDarkMode) {
      setPaletteMode("dark");
    } else {
      setPaletteMode("light");
    }
  }, []);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);

    if (t) {
      axios.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (checkTokenValidity(token)) {
          logout();
        } else {
          return config;
        }
      });

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
      value={{
        user,
        setUser,
        loading,
        logout,
        mutate,
        tokenData,
        paletteMode,
        setPaletteMode: handleSetPaletteMode,
      }}
    >
      <ThemeProvider theme={getTheme(paletteMode)}>{children}</ThemeProvider>
    </UserContext.Provider>
  );
};
