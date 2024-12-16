import api from "./api/api";

export const getTrainingSheetById = async (id: string) => {
  try {
    const response = await api.get(`/training-sheets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching training sheet:', error);
    throw error;
  }
};

export const getTrainingSheets = async () => {
    try {
      const response = await api.get('/training-sheets');
      return response.data;
    } catch (error) {
      console.error('Error fetching training sheet:', error);
      throw error;
    }
  };


export const getExercise = async (id: string) => {
    try {
      const response = await api.get(`/exercises/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching exercise with id ${id}:`, error);
      throw error;
    }
};