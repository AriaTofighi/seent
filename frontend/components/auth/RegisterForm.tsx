import React from "react";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import TextInput from "../controls/TextInput";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { signUp } from "../../services/api/authAxios";
import InfoIcon from "@mui/icons-material/Info";
import { convertDateForPicker } from "../../utils";

const defaultValues = {
  name: "",
  email: "",
  username: "",
  birthday: convertDateForPicker(new Date()),
  password: "",
  confirmPassword: "",
};

type Props = {
  onClose: () => void;
};

const RegisterForm = ({ onClose }: Props) => {
  const { control, reset, handleSubmit, getValues } = useForm({
    defaultValues,
  });
  const { setUser } = useUser();

  const handleSignUp = async (formData: typeof defaultValues) => {
    const { name, email, username, birthday, password, confirmPassword } =
      formData;
    const res = await signUp(name, email, password, birthday, username);
    if (!res) {
      toast.error("Not authorized");
    } else {
      setUser(res.accessToken);
      onClose();
      toast.success("Signed up successfully");
    }
  };

  const validateConfirmPassword = (val: string) => {
    if (val !== getValues("password")) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextInput
            name="name"
            label="Name"
            control={control}
            placeholder="Name"
            rules={{ required: true }}
            type="text"
          />
          <TextInput
            name="email"
            label="Email"
            control={control}
            placeholder="Email"
            rules={{ required: true, isEmail: true }}
          />
          <TextInput
            name="username"
            label="Username"
            control={control}
            placeholder="Username"
            rules={{ required: true }}
            InputProps={{
              endAdornment: (
                <Tooltip title="Your username will be used in your profile URL">
                  <InfoIcon fontSize="medium" />
                </Tooltip>
              ),
            }}
            fullWidth
          />
          <TextInput
            name="birthday"
            label="Birth date (yyyy-mm-dd)"
            control={control}
            placeholder="Birth date"
            rules={{ required: true }}
            type="date"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            control={control}
            type="password"
            rules={{ required: true }}
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            control={control}
            type="password"
            rules={{ required: true, validate: validateConfirmPassword }}
          />
          <Button type="submit" variant="contained">
            <Typography variant="body2">Sign up</Typography>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
