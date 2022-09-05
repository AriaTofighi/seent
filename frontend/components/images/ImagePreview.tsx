import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React from "react";

const ImagePreview = ({ onClose, src, alt }: Props) => {
  return (
    <Box>
      <IconButton
        sx={{
          mt: 1,
          ml: 1,
          position: "absolute",
          zIndex: 1,
          bgcolor: "background.default",
          borderRadius: 1,
          p: 0.5,
        }}
        onClick={onClose}
      >
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

type Props = {
  onClose: () => void;
  src: string;
  alt: string;
};

export default ImagePreview;
