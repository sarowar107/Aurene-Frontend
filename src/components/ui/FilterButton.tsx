import React from 'react';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ children, className = '', active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          py-2 
          px-4 
          border 
          rounded-md 
          shadow-sm 
          text-sm 
          font-medium 
          transition-colors
          ${active 
            ? 'border-brand-primary bg-brand-primary text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterButton.displayName = 'FilterButton';
