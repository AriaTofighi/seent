import { Theme, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { getMessagesLayout } from "../../components/layouts/MessagesLayout";
import Title from "../../components/UI/Title";
import { NextPageWithLayout, Styles } from "../../types";

const Messages: NextPageWithLayout = () => {
  const router = useRouter();
  const breakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  return (
    <>
      <Title title="Messages" />
      {breakpoint && (
        <Box sx={styles.root}>
          <Typography variant="body1" textAlign="center">
            Send messages to your friends, in private or group conversations.
          </Typography>
        </Box>
      )}
    </>
  );
};

const styles: Styles = {
  root: {
    height: "100%",
    p: 2.5,
    display: "grid",
    placeContent: "center",
  },
};

Messages.getLayout = getMessagesLayout;

export default Messages;
