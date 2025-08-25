import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useUIStore } from '../store/uiStore';



const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const SignUpForm: React.FC = () => {
  const { signup } = useAuth();
  const { openAuthModal } = useUIStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      await signup('', data.email, data.password);
      setIsSuccess(true);
      setTimeout(() => openAuthModal('login'), 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="text-center p-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl animate-fadeIn">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-3xl font-bold">Registration Successful!</h2>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Redirecting you to the login page...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Create an Account</h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Join Aurene for a seamless shopping experience.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        
        <Input id="email" label="Email address" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        
        <Input id="password" label="Password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <Input id="confirmPassword" label="Confirm Password" type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}

        <Button type="submit" isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <button onClick={() => openAuthModal('login')} className="font-medium text-brand-primary hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
};
