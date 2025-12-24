const API_BASE_URL = 'http://localhost:5000';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
  rating?: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export const api = {
  // GET all products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  },

  // GET single product
  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
    }
    return response.json();
  },

  // POST create new product
  async createProduct(productData: CreateProductDto): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }
    return response.json();
  },

  // PATCH update product
  async updateProduct(id: number, updateData: UpdateProductDto): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product ${id}: ${response.statusText}`);
    }
    return response.json();
  },

  // DELETE product
  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product ${id}: ${response.statusText}`);
    }
  },
};