import requests from "../Api";

const getAllSheets = async () => {
  try {
    const response = await requests.get("/training-sheets");

    return response;
  } catch (error) {
    return error;
  }
};

const createTrainingSheet = async (data: any) => {
  try {
    const response = await requests.post("/training-sheets", data);
    return response;
  } catch (error) {
    return error;
  }
};

const getTrainingSheet = async (idTrainingSheet: string) => {
  const url = `/training-sheets/${idTrainingSheet}`;
  try {
    const response = await requests.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

const updateTrainingSheet = async (idTrainingSheet: string, data: any) => {
  const url = `/training-sheets/${idTrainingSheet}`;
  try {
    const response = await requests.patch(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteTrainingSheet = async (idTrainingSheet: string) => {
  const url = `/training-sheets/${idTrainingSheet}`;
  try {
    const response = await requests.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};
export {
  createTrainingSheet,
  getTrainingSheet,
  updateTrainingSheet,
  getAllSheets,
  deleteTrainingSheet,
};
