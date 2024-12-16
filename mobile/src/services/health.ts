import { HealthFile } from "../@types/signIn.interface";
import api from "./api/api";



export const createHealthFile = async (healthFile: Omit<HealthFile, 'id'>) => {
  try {
    const response = await api.post('/healthfiles', healthFile);
    return response.data;
  } catch (error) {
    console.error("Error creating health file:", error);
    throw error;
  }
};

export const getHealthFileById = async (id: string) => {
  try {
    const response = await api.get(`/healthfiles/${id}`);
   
    return response.data;
  } catch (error) {
    console.error("Error fetching health file by id:", error);
    throw error;
  }
};

export const getAllHealthFiles = async () => {
  try {
    const response = await api.get('/healthfiles');
    return response.data;
  } catch (error) {
    console.error("Error fetching all health files:", error);
    throw error;
  }
};

export const updateHealthFile = async (id: string, updatedFields: Partial<Omit<HealthFile, 'id'>>) => {
  try {
    const response = await api.patch(`/healthfiles/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error("Error updating health file:", error);
    throw error;
  }
};


