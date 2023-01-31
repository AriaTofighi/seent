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
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
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
