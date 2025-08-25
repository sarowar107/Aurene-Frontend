import { ProductSections } from '../components/ProductSections';

export const HomePage = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white">Effortless Style, Redefined</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">Discover our curated collection of timeless pieces and modern essentials.</p>
      </div>
      <ProductSections />
    </main>
  );
};
