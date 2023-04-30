import { TextField, TextFieldProps, Theme } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Styles } from "../../types";

type Props = {
  control: any;
  name: string;
  rules?: any;
  label?: string;
  [rest: string]: any;
};

const TextInput = ({
  control,
  name,
  rules,
  ...rest
}: Props & TextFieldProps) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          required
          type="standard"
          variant={{ ...rest }.variant ? { ...rest }.variant : "outlined"}
          size="medium"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error ? fieldState.error.message : ""}
          InputProps={{
            sx: styles.input,
          }}
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

const styles: Styles = {
  input: {
    "& ::-webkit-calendar-picker-indicator": {
      colorScheme: (theme: Theme) => theme.palette.mode,
      fontSize: 18,
    } as any,
  },
};
