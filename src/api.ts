import type { Category, Product } from "./types";

const API_BASE = "https://api.escuelajs.co/api/v1";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}

export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  return request<Product[]>(`/products?offset=0&limit=24&categoryId=${categoryId}`);
}

export async function fetchProducts(): Promise<Product[]> {
  return request<Product[]>("/products?offset=0&limit=24");
}

export async function fetchProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`);
}