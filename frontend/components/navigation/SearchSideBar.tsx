import { useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "./SearchBar";

const SearchSideBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("xl"));

  return <>{!mobileMode && <SearchBar />}</>;
};

export default SearchSideBar;
