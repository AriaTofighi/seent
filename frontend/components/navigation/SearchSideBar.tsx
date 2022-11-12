import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../controls/TextInput";
import SearchBar from "./SearchBar";
import styles from "./SearchSideBar.styles";

const SearchSideBar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("lg"));

  return !mobileMode && <SearchBar />;
};

export default SearchSideBar;
