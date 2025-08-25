import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-dark-surface">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm p-3 rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-dark-bg scale-0 group-hover:scale-100 transition-all duration-300"
          aria-label="Add to cart"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-gray-300">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.product_type}</p>
        </div>
        <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
          {product.discountPrice && product.discountPrice > 0 ? (
            <>
              <span className="text-red-500">৳{product.discountPrice}</span>
              <del className="ml-2 text-gray-400">৳{product.price}</del>
            </>
          ) : (
            <span>৳{product.price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
