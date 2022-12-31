import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useInfiniteAPI from "../../hooks/useInfiniteAPI";
import { PaginatedResult, UserEntity } from "../../types";
import { infiniteSWRToFlat } from "../../utils";
import Loader from "../UI/Loader";
import UserCard from "./UserCard";

type Props = {
  getUsersKey: (index: number) => string | null;
};

const UserList = ({ getUsersKey }: Props) => {
  const {
    data: usersRes,
    size,
    setSize,
    loading,
  } = useInfiniteAPI<PaginatedResult<UserEntity>>(getUsersKey);
  const hasMore = usersRes?.[usersRes.length - 1].meta?.next;
  const users = infiniteSWRToFlat(usersRes);
  const noResults = users.length === 0 && !loading;

  return (
    <Box>
      {noResults && <Typography p={2}>No results</Typography>}

      {users?.map((user) => {
        return <UserCard user={user} key={user.userId} />;
      })}
      <Loader
        disabled={!hasMore}
        onClick={() => setSize(size + 1)}
        loading={loading}
      />
    </Box>
  );
};

export default UserList;
