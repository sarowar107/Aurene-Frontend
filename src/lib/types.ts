export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  image_url: string;
  product_type: 'saree' | 'panjabi';
  is_trending: boolean;
  is_new_arrival: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  error?: string;
  errors?: {
    [key: string]: string[];
  };
}
