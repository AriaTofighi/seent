import React from "react";
import Image, { ImageLoader, ImageLoaderProps } from "next/image";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ImageEnlargedModal from "../images/ImageEnlargedModal";
import useModal from "../../hooks/useModal";
import Modal from "../UI/Modal";

const PostCardBody = ({ body, image }: any) => {
  const contentfulImageLoader: ImageLoader = ({
    src,
    width,
  }: ImageLoaderProps) => {
    return `${src}?w=${width}`;
  };
  const { closeModal, open, openModal } = useModal();

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openModal();
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="body1"
        sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
      >
        {body}
      </Typography>
      {image && (
        <>
          <Box
            sx={{
              height: 500,
              maxHeight: "33vh",
              position: "relative",
              my: 1,
              border: "1px solid",
              borderColor: "background.default",
              borderRadius: 5,
              bgcolor: "#040a0c",
              overflow: "hidden",
            }}
            // onClick={handleImageClick}
          >
            <Image
              loader={contentfulImageLoader}
              layout="fill"
              objectFit="contain"
              src={image?.url}
              alt="Post"
            />
          </Box>
          <Modal
            open={open}
            onClose={closeModal}
            maxWidth="xl"
            PaperProps={{
              sx: {
                height: "20%",
                overflow: "hidden",
                bgcolor: "black",
              },
            }}
          >
            <Box sx={{}}>
              <Image
                loader={contentfulImageLoader}
                layout="fill"
                objectFit="contain"
                src={image?.url}
                alt="Post"
              />
            </Box>
          </Modal>
        </>
      )}
      <ImageEnlargedModal />
    </Box>
  );
};

export default PostCardBody;
