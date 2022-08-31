import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type DefaultContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: DefaultContextType = {
  open: false,
  setOpen: () => {},
};

const NavContext = createContext<typeof defaultContext>(defaultContext);

export const useNav = (open?: boolean) => {
  const ctx = useContext(NavContext);
  const { setOpen } = ctx;
  useEffect(() => {
    setOpen(Boolean(open));
  }, []);
  return ctx;
};

export const NavProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(defaultContext.open);

  return (
    <NavContext.Provider value={{ open, setOpen }}>
      {children}
    </NavContext.Provider>
  );
};
