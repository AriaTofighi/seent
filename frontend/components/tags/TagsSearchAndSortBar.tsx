import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import TextInput from "../controls/TextInput";
import { debounce } from "lodash";

type Props = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (data: any) => void;
  search: string;
};

const TagsSearchAndSortBar = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onSearch,
  search,
}: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        onChange={handleSearchChange}
        value={search}
        name="search"
        label="Search tags"
        placeholder="Search..."
        required={false}
        sx={{ flex: 2 }}
        autoComplete="off"
      />
      <FormControl fullWidth sx={{ flex: 1 }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortBy} label="Sort by" onChange={handleChange}>
          <MenuItem value="posts">Posts made</MenuItem>
          <MenuItem value="createdAt">Date created</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ flex: 1 }}>
        <InputLabel>Sort order</InputLabel>
        <Select
          value={sortOrder}
          label="Sort order"
          onChange={handleOrderChange}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TagsSearchAndSortBar;
