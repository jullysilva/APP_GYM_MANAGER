import { User } from "../@types/signIn.interface";
import { UserLogin } from "../@types/signOff.interface";
import api from "./api/api";


export const authenticateUser = async (values: UserLogin) => {
  try {
    const response = await api.post('/user/authenticate',  values);
    return response;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

export const updateUser = async (id: string, updatedFields: Partial<Omit<User, 'id'>>) => {
  try {
    const response = await api.patch(`/user/${id}`, updatedFields);
    return response.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};



export const listUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
};
