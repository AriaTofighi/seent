import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/UserContext";
import { useAPI } from "../../hooks/useAPI";
import { createRoom } from "../../services/api/roomAxios";
import { UserEntity } from "../../types";
import AutoComplete from "../controls/AutoComplete";
import TextInput from "../controls/TextInput";
import Modal from "../UI/Modal";

const defaultValues = {
  title: "",
  users: [],
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  mutateRooms: () => void;
};

const CreateRoomModal = ({ open, setOpen, mutateRooms }: Props) => {
  const { user } = useUser();
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues,
  });
  const { data: users, loading: usersLoading } = useAPI<UserEntity[]>("users");

  const onSubmit = async (data: typeof defaultValues) => {
    const { title, users } = data;
    const userIds = users.map((u: UserEntity) => u.userId);
    userIds.push(user?.userId as string);
    await createRoom({ title, userIds, ownerId: user?.userId as string });
    setOpen(false);
    mutateRooms();
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Create Room"
      maxWidth="xs"
    >
      {usersLoading ? (
        <Box>Loading...</Box>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", gap: 12, flexDirection: "column" }}
        >
          <TextInput
            label="Room title"
            name="title"
            control={control}
            fullWidth
          />
          <AutoComplete
            label="Add users"
            name="users"
            control={control}
            disablePortal={false}
            TextFieldProps={{ fullWidth: true }}
            renderOption={(props: any, option: any) => (
              <Box display="flex" alignItems="center" gap={2} p={1} {...props}>
                <Avatar src={option.images[0].url} />
                <Typography variant="body1">
                  {option.name} ({option.username})
                </Typography>
              </Box>
            )}
            multiple
            rules={{
              required: "You must add at least one other user to the room",
            }}
            getOptionLabel={(option) => `${option.name} (${option.username})`}
            options={
              users?.filter((u) => u.userId !== user?.userId) as UserEntity[]
            }
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Room
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default CreateRoomModal;
