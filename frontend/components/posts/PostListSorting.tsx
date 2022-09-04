import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import { POSTS_SORT_MODES } from "../../pages/feed";

type Props = {
  setMode: (mdoe: string) => void;
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

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" width="100%">
        <IconButton onClick={handleClick}>
          <SortIcon />
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClickTopLocal as any}>Top</MenuItem>
        <MenuItem onClick={handleNew}>New</MenuItem>
        <MenuItem onClick={handleOld}>Old</MenuItem>
      </Menu>
      <Menu anchorEl={anchorEl} open={openTop} onClose={handleCloseTopLocal}>
        <MenuItem onClick={() => handleTopSpecify(POSTS_SORT_MODES.TOP_DAY)}>
          Day
        </MenuItem>
        <MenuItem onClick={() => handleTopSpecify(POSTS_SORT_MODES.TOP_WEEK)}>
          Week
        </MenuItem>
        <MenuItem onClick={() => handleTopSpecify(POSTS_SORT_MODES.TOP_MONTH)}>
          Month
        </MenuItem>
        <MenuItem onClick={() => handleTopSpecify(POSTS_SORT_MODES.TOP_YEAR)}>
          Year
        </MenuItem>
        <MenuItem onClick={() => handleTopSpecify(POSTS_SORT_MODES.TOP_ALL)}>
          All
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostListSorting;
