import { Styles } from "../../types";

const styles: Styles = {
  root: {
    color: "text.primary",
    position: "sticky",
    top: 0,
    minWidth: 240,
    height: "100vh",
    p: 2,
  },
  signUpBtn: { textTransform: "initial", mt: 2 },
  drawerPaper: {
    backgroundColor: "background.default",
    backgroundImage: "none",
  },
  avatar: {
    width: 60,
    height: 60,
  },
};

export default styles;
