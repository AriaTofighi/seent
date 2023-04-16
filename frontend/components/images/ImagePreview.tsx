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
    bgcolor: "primary.dark",
    borderRadius: 1,
    p: 0.5,
    "&:hover": {
      bgcolor: "secondary.dark",
    },
  },
};

const ImagePreview = ({ onClose, src, alt }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        border: "1px solid black",
        borderRadius: 1,
        bgcolor: "black",
      }}
    >
      <IconButton sx={styles.closeBtn} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Box
        sx={{ position: "relative", maxWidth: "100%", width: 400, height: 280 }}
      >
        <Image
          src={src as string}
          layout="fill"
          objectFit="contain"
          alt={alt}
        />
      </Box>
    </Box>
  );
};

export default ImagePreview;
