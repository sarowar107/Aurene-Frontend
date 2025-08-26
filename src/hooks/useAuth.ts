import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://aurene.onrender.com/api';


export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: setAuthState, logout: clearAuthState } = useAuthStore();
  const { closeAuthModal } = useUIStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: email,  // Backend expects username field
          password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid email or password');
      }
      
      const user = {
        id: '0',  // We don't have user id from the backend
        email: email,
        name: email.split('@')[0]  // Using email prefix as name
      };
      setAuthState(user, data.access);  // Using access token from JWT
      closeAuthModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      if (!data.success) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      const user = {
        id: '0',
        email: email,
        name: name || email.split('@')[0]
      };
      setAuthState(user, data.token);
      closeAuthModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthState();
    // Here you might want to redirect the user to the home page
    // or perform other cleanup actions.
  };

  return { login, signup, logout, isLoading, error };
};
