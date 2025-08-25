import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <h2 className="mt-4 text-2xl font-bold text-red-800 dark:text-red-300">Oops! Something went wrong.</h2>
      <p className="mt-2 text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};
