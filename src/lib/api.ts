// ...removed duplicate declaration...
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aurene.onrender.com/api';

import { Product } from './types';
// A helper function to sanitize a single product object
const sanitizeProduct = (product: any): Product => {
  return {
    ...product,
    price: Number(product.price),
    discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
    is_trending: Boolean(product.is_trending),
    is_new_arrival: Boolean(product.is_new_arrival)
  };
};

export const fetcher = async (url: string) => {
  const res = await fetch(`${API_BASE_URL}${url}`);

  if (!res.ok) {
    let errorMessage = 'An error occurred while fetching the data.';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Keep default error message
    }
    throw new Error(`${errorMessage} (Status: ${res.status})`);
  }

  const data = await res.json();

  // Sanitize the data to prevent type errors
  if (Array.isArray(data)) {
    // This is likely the /products endpoint
    return data.map(sanitizeProduct);
  } else if (typeof data === 'object' && data !== null) {
    // This is likely a single product endpoint /products/:id
    return sanitizeProduct(data);
  }

  return data;
};

// Response types
interface ApiResponse {
  success?: boolean;
  error?: string;
  detail?: string;
}

interface AuthResponse extends ApiResponse {
  token?: string;
  access?: string;
  refresh?: string;
  refresh_token?: string;
}

// Register a new user
export const registerUser = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data: AuthResponse = await response.json();

        if (response.status === 201) {
            return { 
                success: true, 
                token: data.token,
                refresh: data.refresh_token,
                user: {
                    email: email,
                    name: email.split('@')[0],
                    id: '0'
                }
            };
        } else {
            throw new Error(data.error || 'Registration failed');
        }
    } catch (error: any) {
        console.error("Registration error:", error.message);
        throw new Error(error.message || 'Registration failed. Please try again.');
    }
};

// Login an existing user
export const loginUser = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: email,  // Django's JWT expects username
                password: password 
            }),
        });

        const data: AuthResponse = await response.json();

        if (response.ok) {
            return {
                success: true,
                token: data.access,
                refresh: data.refresh,
                user: {
                    email: email,
                    name: email.split('@')[0],
                    id: '0'
                }
            };
        } else {
            throw new Error(data.detail || 'Invalid email or password');
        }
    } catch (error: any) {
        console.error("Login error:", error.message);
        throw new Error(error.message || 'Login failed. Please try again.');
    }
};