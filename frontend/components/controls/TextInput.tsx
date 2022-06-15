import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  rules?: any;
  label: string;
  [rest: string]: any;
};

const TextInput = ({ control, name, rules, ...rest }: Props) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          required
          type="standard"
          variant="outlined"
          size="medium"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error ? fieldState.error.message : ""}
          {...field}
          {...rest}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
};

export default TextInput;
