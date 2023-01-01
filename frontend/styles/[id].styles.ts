import { Styles } from "../types";

const styles: Styles = {
  profileHeaderContainer: {
    borderBottom: "1px solid",
    borderColor: "divider",
    p: 3,
    position: "relative",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  editBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    m: 2,
    color: "primary.main",
  },
  avatar: {
    maxWidth: {
      lg: 135,
      xs: 75,
    },
    maxHeight: {
      lg: 135,
      xs: 75,
    },
    width: "100%",
    height: "auto",
  },
  profileStatsContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    mt: 2,
    width: "70%",
    flexWrap: "wrap",
  },
};

export default styles;
