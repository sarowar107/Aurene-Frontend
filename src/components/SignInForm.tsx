import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useUIStore } from '../store/uiStore';



const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm: React.FC = () => {
  const { login } = useAuth();
  const { openAuthModal } = useUIStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error handling is done in useAuth hook
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Welcome Back</h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Sign in to continue to Aurene.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <Input id="email" label="Email address" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        
        <Input id="password" label="Password" type="password" {...register('password')} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <Button type="submit" isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button onClick={() => openAuthModal('signup')} className="font-medium text-brand-primary hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
};
