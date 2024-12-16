import requests from "../Api";
import { IGym } from "../../Utils/Interfaces/Interface";

export const createGym = async (data: IGym) => {
  try {
    const response = await requests.post("/gym", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getGym = async (managerId: string) => {
  const url = `/gym/${managerId}`;
  try {
    const response = await requests.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateGym = async (managerId: string, data: IGym) => {
  const gym = {
    about: data?.about,
    city: data?.city,
    complement: data?.complement,
    managerId: data?.managerId,
    name: data?.name,
    neighborhood: data?.neighborhood,
    number: data?.number,
    phone: data?.phone,
    state: data?.state,
    street: data?.street,
    zip_code: data?.zip_code,
  };

  const url = `/gym/${managerId}`;
  try {
    const response = await requests.patch(url, gym);
    return response;
  } catch (error) {
    return error;
  }
};
