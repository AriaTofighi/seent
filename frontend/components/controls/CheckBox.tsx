import { Checkbox as MuiCheckBox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  rules?: any;
  label: string;
};

const CheckBox = ({ control, name, rules, label, ...rest }: Props) => {
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          label={label}
          control={
            <MuiCheckBox
              onChange={onChange}
              checked={value}
              size="medium"
              {...rest}
            />
          }
        />
      )}
      rules={rules}
      name={name}
      control={control}
    />
  );
};

export default CheckBox;
