import { useEffect, useState } from 'react';
import { Product } from '../lib/types';
import { ProductCard } from './ProductCard';
import { fetcher } from '../lib/api';
import { FilterButton } from './ui/FilterButton';

interface ProductSection {
  title: string;
  products: Product[];
}

export const ProductSections = () => {
  const [sections, setSections] = useState<ProductSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, 'all' | 'men' | 'women'>>({});

  useEffect(() => {
        const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const products = await fetcher('/products/');
        console.log('Raw products:', products);
        
        if (!Array.isArray(products)) {
          throw new Error('Expected array of products from API');
        }
        
        // Filter out products without required fields
        const validProducts = products.filter((p: Product) => {
          const isValid = p.name && p.price && p.image_url;
          if (!isValid) {
            console.log('Invalid product:', p);
          }
          return isValid;
        });
        
        console.log('Valid products:', validProducts);
        
        // Create sections based on product criteria
        const trendingProducts = validProducts.filter((p: Product) => p.is_trending);
        const newArrivals = validProducts.filter((p: Product) => p.is_new_arrival);
        const discountProducts = validProducts.filter((p: Product) => p.discountPrice !== null && p.discountPrice > 0);
        const sareeProducts = validProducts.filter((p: Product) => p.product_type === 'saree');
        const panjabiProducts = validProducts.filter((p: Product) => p.product_type === 'panjabi');        const productSections: ProductSection[] = [
          { title: 'Trending Now', products: trendingProducts },
          { title: 'New Arrivals', products: newArrivals },
          { title: 'On Discount', products: discountProducts },
          { title: 'Saree Collection', products: sareeProducts },
          { title: 'Panjabi Collection', products: panjabiProducts }
        ].filter(section => section.products.length > 0);

        setSections(productSections);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleFilterChange = (sectionTitle: string, filter: 'all' | 'men' | 'women') => {
    setActiveFilters(prev => ({ ...prev, [sectionTitle]: filter }));
  };

  const getFilteredProducts = (products: Product[], section: ProductSection) => {
    // Only apply filtering for collection sections
    if (!section.title.includes('Collection')) {
      return products;
    }

    const filter = activeFilters[section.title] || 'all';
    switch (filter) {
      case 'men':
        return products.filter(p => p.product_type === 'panjabi');
      case 'women':
        return products.filter(p => p.product_type === 'saree');
      default:
        return products;
    }
  };

  return (
    <div className="py-8 space-y-12">
      {sections.map((section) => (
        <section key={section.title} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
            {section.title.includes('Collection') && (
              <div className="flex gap-2">
                <FilterButton 
                  active={!activeFilters[section.title] || activeFilters[section.title] === 'all'} 
                  onClick={() => handleFilterChange(section.title, 'all')}
                >
                  All
                </FilterButton>
                <FilterButton 
                  active={activeFilters[section.title] === 'men'} 
                  onClick={() => handleFilterChange(section.title, 'men')}
                >
                  Men
                </FilterButton>
                <FilterButton 
                  active={activeFilters[section.title] === 'women'} 
                  onClick={() => handleFilterChange(section.title, 'women')}
                >
                  Women
                </FilterButton>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredProducts(section.products, section).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
