import { Box, Typography, Stack, Button } from "@mui/material";
import styles from "../../styles/[id].styles";
import UserAvatar from "../users/UserAvatar";

type Props = {
  profileUser: any;
  userIsOwner: boolean;
  handleEditProfileClick: () => void;
};

const ProfileHeader = ({
  profileUser,
  userIsOwner,
  handleEditProfileClick,
}: Props) => {
  return (
    <Box sx={styles.profileHeaderContainer}>
      <Box sx={styles.profileHeader}>
        <UserAvatar
          userId={profileUser.userId}
          username={profileUser.username}
          avatarUrl={profileUser.images?.[0]?.url}
          AvatarProps={{ sx: styles.avatar }}
        />
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h4">{profileUser?.name}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {`@${profileUser.username}`}{" "}
            {profileUser.location && ` | ${profileUser.location}`}
            {profileUser.gender && ` | ${profileUser.gender}`}
          </Typography>
          {profileUser.bio && (
            <Typography
              variant="body2"
              sx={{ mt: 2, mb: 1, textAlign: "center" }}
            >
              {profileUser.bio}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
