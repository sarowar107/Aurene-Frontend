import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-brand-primary/50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
