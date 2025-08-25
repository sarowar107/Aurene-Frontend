import useSWR from 'swr';
import { fetcher } from '../lib/api';
import { Product } from '../lib/types';

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>('/products', fetcher);
  return {
    products: data,
    isLoading,
    isError: error,
  };
}

export function useProduct(id?: string) {
  const { data, error, isLoading } = useSWR<Product>(id ? `/products/${id}` : null, fetcher);
  return {
    product: data,
    isLoading,
    isError: error,
  };
}
