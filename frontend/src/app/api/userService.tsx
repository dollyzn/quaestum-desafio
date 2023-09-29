import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000";

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(
      `${API_BASE_URL}/users`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response.data;
  } catch (error) {
    throw error;
  }
};
