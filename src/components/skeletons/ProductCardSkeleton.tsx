export const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-dark-surface"></div>
    <div className="mt-4">
      <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 dark:bg-dark-surface rounded w-1/2"></div>
    </div>
  </div>
);
