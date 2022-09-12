import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React from "react";
import { Styles } from "../../types";

type Props = {
  onClose: () => void;
  src: string;
  alt: string;
};

const styles: Styles = {
  closeBtn: {
    mt: 1,
    ml: 1,
    position: "absolute",
    zIndex: 1,
    bgcolor: "background.default",
    borderRadius: 1,
    p: 0.5,
  },
};

const ImagePreview = ({ onClose, src, alt }: Props) => {
  return (
    <Box>
      <IconButton sx={styles.closeBtn} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Image
        src={src as string}
        width="250"
        height="200"
        alt={alt}
        layout="fixed"
      />
    </Box>
  );
};

export default ImagePreview;
