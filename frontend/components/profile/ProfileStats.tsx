import { Typography, Stack, Button, Divider } from "@mui/material";
import styles from "../../styles/[id].styles";

type Props = {
  postsCount: number;
  repliesCount: number;
  reactionCount: number;
  friendsCount: number;
  handleShowFriendsClick: () => void;
};

const ProfileStats = ({
  postsCount,
  repliesCount,
  reactionCount,
  friendsCount,
  handleShowFriendsClick,
}: Props) => {
  return (
    <Stack sx={styles.profileStatsContainer}>
      <Stack sx={styles.profileStats}>
        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Typography fontWeight={600}>{postsCount}</Typography>
          <Typography variant="subtitle2">Posts</Typography>
        </Stack>

        <Divider orientation="vertical" />

        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Typography fontWeight={600}>{repliesCount}</Typography>
          <Typography variant="subtitle2">Replies</Typography>
        </Stack>

        <Divider orientation="vertical" />

        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Typography fontWeight={600}>{reactionCount}</Typography>
          <Typography variant="subtitle2">
            {reactionCount === 1 ? "Like" : "Likes"}
          </Typography>
        </Stack>

        <Divider orientation="vertical" />

        <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={handleShowFriendsClick}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              color: "text.primary",
              textTransform: "none",
              m: 0,
            }}
          >
            <Typography fontWeight={600}>{friendsCount}</Typography>
            <Typography variant="subtitle2">
              {friendsCount === 1 ? "Friend" : "Friends"}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfileStats;
