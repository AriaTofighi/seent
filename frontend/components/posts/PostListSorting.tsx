import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import { POSTS_SORT_MODES } from "../../types";

type Props = {
  setMode: (mode: string) => void;
};

const PostListSorting = ({ setMode }: Props) => {
  const { anchorEl, handleClose, open, handleClick } = useMenu();
  const {
    handleClose: handleCloseTop,
    open: openTop,
    handleClick: handleClickTop,
  } = useMenu();

  const handleCloseTopLocal = () => {
    handleCloseTop();
    handleClose();
  };

  const handleClickTopLocal = (e: any) => {
    handleClickTop(e);
  };

  const handleNew = () => {
    setMode(POSTS_SORT_MODES.NEW);
    handleClose();
  };

  const handleOld = () => {
    setMode(POSTS_SORT_MODES.OLD);
    handleClose();
  };

  const handleTopSpecify = (mode: string) => {
    handleCloseTopLocal();
    setMode(mode);
  };

  const baseMenuItems = [
    {
      label: "Top",
      onClick: handleClickTopLocal,
    },
    {
      label: "New",
      onClick: handleNew,
    },
    {
      label: "Old",
      onClick: handleOld,
    },
  ];

  const topMenuItems = [
    {
      label: "Day",
      onClick: () => handleTopSpecify(POSTS_SORT_MODES.TOP_DAY),
    },
    {
      label: "Week",
      onClick: () => handleTopSpecify(POSTS_SORT_MODES.TOP_WEEK),
    },
    {
      label: "Month",
      onClick: () => handleTopSpecify(POSTS_SORT_MODES.TOP_MONTH),
    },
    {
      label: "Year",
      onClick: () => handleTopSpecify(POSTS_SORT_MODES.TOP_YEAR),
    },
    {
      label: "All Time",
      onClick: () => handleTopSpecify(POSTS_SORT_MODES.TOP_ALL),
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" width="100%">
        <IconButton onClick={handleClick}>
          <SortIcon />
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {baseMenuItems.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
      <Menu anchorEl={anchorEl} open={openTop} onClose={handleCloseTopLocal}>
        {topMenuItems.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PostListSorting;
