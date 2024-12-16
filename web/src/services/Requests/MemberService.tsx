import { RegisterAluno } from "Utils/Schemas";
import requests from "../Api";

const getAllMembers = async () => {
  try {
    const response = await requests.get("/users");

    return response;
  } catch (error) {
    return error;
  }
};

const getMembersByGym = async (gymId: string) => {
  const response = await requests.get(`/users?gymId=${gymId}`);
  return response.data;
};

const createMember = async (data: RegisterAluno) => {
  try {
    const response = await requests.post("/user", data);
    return response;
  } catch (error) {
    return error;
  }
};

const updateMember = async (id: string, data: any) => {
  const url = `/user/${id}`;
  try {
    const response = await requests.patch(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteMember = async (idMember: string) => {
  const url = `/user/${idMember}`;
  try {
    const response = await requests.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};
export {
  createMember,
  updateMember,
  getAllMembers,
  deleteMember,
  getMembersByGym,
};
