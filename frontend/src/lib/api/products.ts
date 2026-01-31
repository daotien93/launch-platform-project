import { apiClient } from "./client";
import type { Product } from "../types/product";

export const getProducts = async () => {
  const res = await apiClient.get<Product[]>("/products");
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await apiClient.get<Product>(`/products/${id}`);
  return res.data;
};

