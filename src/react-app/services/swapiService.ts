// src/react-app/services/swapiService.ts
import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api';

export const getResources = async (resource: string, page: number = 1, search: string = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${resource}/`, {
      params: { page, search },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    throw error;
  }
};

export const getResourceById = async (resource: string, id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${resource}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${resource} with id ${id}:`, error);
    throw error;
  }
};
