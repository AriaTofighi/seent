import { Box, AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../controls/TextInput";

const defaultValues = {
  search: "",
};

const SearchBar = () => {
  const { control, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();

  const onSubmit = (data: typeof defaultValues) => {
    router.push(`/search/${data.search}`);
  };

  return (
    <Box sx={{ px: 2 }}>
      <AppBar
        component="aside"
        elevation={0}
        sx={{
          position: "sticky",
          width: 240,
          border: "none",
        }}
      >
        <Toolbar disableGutters sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextInput
              name="search"
              label="Search"
              control={control}
              fullWidth
              variant="standard"
            />
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
