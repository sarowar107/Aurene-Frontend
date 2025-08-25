import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ChevronLeft, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProduct } from '../hooks/useApi';
import { Product } from '../lib/types';
import { ProductDetailSkeleton } from '../components/skeletons/ProductDetailSkeleton';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="mt-4 inline-block text-brand-primary hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-8">
        <Link to="/" className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to products
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div layoutId={`product-image-${product.id}`} className="rounded-xl overflow-hidden">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>
        <div>
          <h1 className="text-4xl font-serif font-bold">{product.name}</h1>
          <div className="mt-2 flex items-baseline gap-3">
            {product.discountPrice ? (
              <>
                <p className="text-3xl font-serif text-red-500">৳{product.discountPrice}</p>
                <del className="text-2xl font-serif text-gray-400">৳{product.price}</del>
              </>
            ) : (
              <p className="text-3xl font-serif text-brand-primary">৳{product.price}</p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Details</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-10 w-full bg-brand-primary text-white py-3 px-8 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-brand-primary/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
