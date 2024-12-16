import requests from "../Api";

export const getAllExercises = async () => {
  try {
    const response = await requests.get("/exercises");

    return response;
  } catch (error) {
    return error;
  }
};

export const createExercise = async (data) => {
  try {
    const response = await requests.post("/exercises", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getExercise = async (idExercise: string) => {
  const url = `/exercises/${idExercise}`;
  try {
    const response = await requests.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateExercise = async (idExercise: string, data: any) => {
  const url = `/exercises/${idExercise}`;
  try {
    const response = await requests.patch(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteExercise = async (idExercise: string) => {
  const url = `/exercises/${idExercise}`;
  try {
    const response = await requests.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};
