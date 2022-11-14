import { Avatar, Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { UserEntity } from "../../types";
import StyledCard from "../UI/cards/StyledCard";

type Props = {
  user: UserEntity;
};

const UserCard = ({ user }: Props) => {
  const avatar = user.images?.[0].url;

  return (
    <Link href={`/profiles/${user.username}`}>
      <a>
        <StyledCard variant="outlined">
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar src={avatar} />
            <Typography variant="body1">
              {user.name}
              {` (@${user.username})`}
            </Typography>
          </Stack>
        </StyledCard>
      </a>
    </Link>
  );
};

export default UserCard;
