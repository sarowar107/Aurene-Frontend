export const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
    <div className="mb-8 h-6 w-48 bg-gray-200 dark:bg-dark-surface rounded"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="rounded-xl bg-gray-200 dark:bg-dark-surface aspect-square"></div>
      <div>
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-dark-surface rounded"></div>
        <div className="mt-4 h-10 w-1/3 bg-gray-200 dark:bg-dark-surface rounded"></div>
        <div className="mt-8 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded w-5/6"></div>
        </div>
        <div className="mt-10 h-14 w-full bg-gray-200 dark:bg-dark-surface rounded-full"></div>
      </div>
    </div>
  </div>
);
