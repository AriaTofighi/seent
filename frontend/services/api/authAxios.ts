import { toast } from "react-toastify";
import { DEFAULT_API as axios } from "./AxiosInstance";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/auth/local/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  birthday: string,
  username: string
) => {
  try {
    const response = await axios.post(`/auth/local/signup`, {
      name,
      email,
      password,
      birthday,
      username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signInGoogle = async (token: string) => {
  try {
    const response = await axios.post(`/auth/google/login`, {
      token,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
