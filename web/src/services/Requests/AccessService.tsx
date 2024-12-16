import { UserLogin } from "Utils/Schemas";
import requests from "../Api";

const getManager = async (id: string) => {
  const url = `/manager/${id}`;

  try {
    const response = await requests.get(url);

    return response;
  } catch (error) {
    return error;
  }
};

const registerManager = async (data) => {
  const manager = {
    name: data.name,
    email: data.email,
    document: data.document,
    phone: data.phone,
    password: data.password,
  };

  try {
    const response = await requests.post("/manager", manager);
    return response;
  } catch (error) {
    return error;
  }
};

const accessManager = async (data: UserLogin) => {
  try {
    const response = await requests.post("/manager/login", data);
    return response;
  } catch (error) {
    return error;
  }
};

const updateManager = async (idManager: string, data: any) => {
  const url = `/manager/${idManager}`;
  try {
    const response = await requests.patch(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

export { getManager, registerManager, accessManager, updateManager };
