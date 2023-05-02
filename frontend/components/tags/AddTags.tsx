import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import AutoComplete from "../controls/AutoComplete";
import { useAPI } from "../../hooks/useAPI";
import TextInput from "../controls/TextInput";
import { createTag } from "../../services/api/tagAxios";
import { useUser } from "../../contexts/UserContext";
import AddIcon from "@mui/icons-material/Add";

const defaultValues = {
  createTag: "",
};

type Props = {
  setValue: any;
  getValues: any;
  control: any;
  watch: any;
};

const AddTags = ({ setValue, getValues, control, watch }: Props) => {
  const selectedTags = watch("tags");
  const {
    control: addTagControl,
    handleSubmit,
    resetField,
  } = useForm({
    defaultValues,
  });
  const { user } = useUser();
  const { data: tagsData, mutate: mutateTags } = useAPI<any>(`tags`);
  const tags = tagsData;

  const onSubmit = async (data: any) => {
    if (!user) return;
    const { createTag: createTagData } = data;
    const newTag = await createTag(createTagData, user.userId);
    await mutateTags();
    if (newTag) {
      setValue("tags", [...getValues("tags"), newTag]);
      resetField("createTag");
    }
  };

  const checkDisable = (option: any) => {
    return (
      selectedTags.length > 2 &&
      !selectedTags.some((tag: any) => tag.tagId === option.tagId)
    );
  };

  return (
    <Box
      sx={{
        pt: 1,
        px: 1.5,
        width: 300,
        flexDirection: "column",
        display: "flex",
        gap: 1.5,
      }}
    >
      <Typography variant="h6">Tags</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          control={addTagControl}
          required
          name="createTag"
          label="Create new tag"
          variant="standard"
          placeholder="Enter tag name..."
          fullWidth
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={selectedTags.length > 2}
          rules={{
            validate: (value: string) =>
              value.trim().length > 0 ? true : "Tag name cannot be empty",
          }}
        />
        <IconButton
          size="small"
          onClick={handleSubmit(onSubmit)}
          disabled={selectedTags.length > 2}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <AutoComplete
        control={control}
        name="tags"
        label="Select tags (max 3)..."
        options={tags ?? []}
        multiple
        getOptionDisabled={checkDisable}
        limitTags={3}
        getOptionLabel={(tag) => tag.name ?? ""}
        renderOption={(props: any, option: any) => (
          <Box display="flex" alignItems="center" gap={2} p={1} {...props}>
            <Typography variant="body1">{option.name}</Typography>
          </Box>
        )}
        isOptionEqualToValue={(option: any, value: any) => {
          return option.name === value.name;
        }}
      />
    </Box>
  );
};

export default AddTags;
