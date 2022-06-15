import { DEFAULT_API as axios } from "./AxiosInstance";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/auth/local/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  birthday: string
) => {
  try {
    const response = await axios.post(`/auth/local/signup`, {
      name,
      email,
      password,
      birthday,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
