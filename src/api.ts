import type { Category, Product } from "./types";

const API_BASE = "https://api.escuelajs.co/api/v1";

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  return request<Category[]>("/categories", signal);
}

export async function fetchProductsByCategory(categoryId: number, signal?: AbortSignal): Promise<Product[]> {
  return request<Product[]>(`/products?offset=0&limit=24&categoryId=${categoryId}`, signal);
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  return request<Product[]>("/products?offset=0&limit=24", signal);
}

export async function fetchProductById(id: number, signal?: AbortSignal): Promise<Product> {
  return request<Product>(`/products/${id}`, signal);
}
