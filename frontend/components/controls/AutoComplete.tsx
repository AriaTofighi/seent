import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  rules?: any;
  options: any[];
  label: string;
  getOptionLabel: (option: any) => string;
  TextFieldProps?: TextFieldProps;
  rest?: AutocompleteProps<any, true, true, true>;
};

const AutoComplete = ({
  control,
  name,
  rules,
  options,
  label,
  getOptionLabel,
  TextFieldProps,
  ...rest
}: Props) => {
  return (
    <Controller
      render={({
        field: { onChange, value },
        fieldState,
        formState,
        ...props
      }) => (
        <Autocomplete
          {...props}
          {...rest}
          getOptionLabel={getOptionLabel}
          onChange={(e, data) => onChange(data)}
          value={value}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              {...TextFieldProps}
              variant="outlined"
              label={label}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error ? fieldState.error.message : ""}
            />
          )}
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
};

export default AutoComplete;
