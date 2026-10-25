// src/services/categoryService.ts
import axios from "axios";
import { type Category } from "../types";

const API_BASE_URL = "http://localhost:8000";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${API_BASE_URL}/categories/`);
  return response.data;
};
