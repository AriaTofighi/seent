import { Styles } from "../types";

const styles: Styles = {
  profileHeaderContainer: {
    p: 3,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    justifyContent: "center",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  editBtn: {
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
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    my: 2,
    width: "90%",
    flexWrap: "wrap",
    alignItems: "center",
  },
};

export default styles;
