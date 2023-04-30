import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddTags from "./AddTags";

type Props = {
  anchorEl: any;
  handleClose: (event: React.SyntheticEvent) => void;
  open: boolean;
  setValue: any;
  getValues: any;
  control: any;
  watch: any;
};

const AddTagsMenu = ({
  anchorEl,
  handleClose,
  open,
  setValue,
  getValues,
  control,
  watch,
}: Props) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <AddTags
        setValue={setValue}
        getValues={getValues}
        control={control}
        watch={watch}
      />
    </Menu>
  );
};

export default AddTagsMenu;
