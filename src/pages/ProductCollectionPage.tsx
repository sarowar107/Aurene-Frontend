import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../lib/types';
import { ProductCard } from '../components/ProductCard';
import { fetcher } from '../lib/api';
import { ProductGridSkeleton } from '../components/skeletons/ProductGridSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';

type CollectionType = 'trending' | 'new-arrivals' | 'discount' | 'saree' | 'panjabi';

interface CollectionConfig {
  title: string;
  filterFn: (product: Product) => boolean;
}

const collectionConfigs: Record<CollectionType, CollectionConfig> = {
  'trending': {
    title: 'Trending Now',
    filterFn: (product) => product.is_trending
  },
  'new-arrivals': {
    title: 'New Arrivals',
    filterFn: (product) => product.is_new_arrival
  },
  'discount': {
    title: 'Special Discounts',
    filterFn: (product) => Boolean(product.discountPrice && product.discountPrice > 0)
  },
  'saree': {
    title: 'Saree Collection',
    filterFn: (product) => product.product_type === 'saree'
  },
  'panjabi': {
    title: 'Panjabi Collection',
    filterFn: (product) => product.product_type === 'panjabi'
  }
};

export const ProductCollectionPage = () => {
  const { collection } = useParams<{ collection: CollectionType }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await fetcher('/products/');
        
        if (!collection || !collectionConfigs[collection]) {
          throw new Error('Invalid collection type');
        }

        const { filterFn } = collectionConfigs[collection];
        const filteredProducts = allProducts.filter(filterFn);
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [collection]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const config = collection ? collectionConfigs[collection] : null;
  if (!config) {
    return <ErrorMessage message="Invalid collection type" />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{config.title}</h1>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
